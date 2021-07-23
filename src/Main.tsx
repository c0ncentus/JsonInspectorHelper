import { Component } from "react";
import {returnType, getLastArrayByPath,  parentTo, parentArrayTo, lastKeyByType, arrayByNum } from "./Util/Lib";
import {  CustomPicture, JIPSetting, ActionFunc, ExtraFormJip, JipAssets } from "./Util/Model";
import { DropDownSquish, Glass_ } from "./Util/Package";
import { RenderInputByType_Jip } from "./Type/RenderAll";
import { cloneDeep, get, has, set } from "lodash";
import { saveAs } from "file-saver";

const STORE_KEY_LOCAL = "__JFI__";
const isJson = (str: string) => { return /\{/gm.test(str) && /\}/gm.test(str) && /\:/gm.test(str) }

interface JsonFormInspectState { objUpdate: any, inputKeys: string, valuePathChange: string | null, isUpToDate: boolean }

export interface JsonFormInspectProps {
    obj_: any, setting: JIPSetting,
    onValidate: (obj_: any) => any, onUpdate: (obj: any) => any
    isWithAccessory: boolean,
    IMG_ASST: CustomPicture, IMG_INTERN: JipAssets
}


export class JsonFormInspect extends Component<JsonFormInspectProps, JsonFormInspectState>{
    constructor(props: any) {
        super(props); this.onAction = this.onAction.bind(this);
        this.state = { inputKeys: "futureKeyName", objUpdate: {}, valuePathChange: null, isUpToDate: true }

    }
    reboot() { this.setState({ objUpdate: this.props.obj_ }) }
    onAction(path: string, action: ActionFunc, extra?: ExtraFormJip): any {
        const objUpdate = cloneDeep(this.state.objUpdate);
        if (action === "onValidate") { return objUpdate }
        this.setState({ objUpdate: null })
        const isArray = typeof getLastArrayByPath(path) === "string";
        let addValue: any = undefined; let updateValue: any = undefined; let deleteValue: any = undefined;
        if (extra !== undefined && extra.addValue !== undefined) { addValue = extra.addValue }
        if (extra !== undefined && extra.updateValue !== undefined) { addValue = extra.updateValue }
        if (extra !== undefined && extra.deleteValue !== undefined) { deleteValue = extra.deleteValue }

        //  ________________________________________
        //          initialization END
        if (action === "getJip") { return this.props; }
        if (action === "getStateObj") { return this.state.objUpdate; }
        if (action === "getObjByPath") { return path === "" ? this.onAction("", "getStateObj") : get(this.state.objUpdate, path) }

        if (action === "addValue") {
            const { newKey, newValue } = addValue!;
            const isObject = typeof newKey === "string"
            if (isArray) {
                const parentPath = parentArrayTo(path); let parentArray = get(objUpdate, parentPath);
                parentArray.push(newValue);
                this.setState({ objUpdate: set(objUpdate, parentPath, parentArray) });
            }
            else {
                if (isObject) {
                    const parentPath = parentTo(path); let parentObj = get(objUpdate, parentPath);
                    parentObj[newKey!] = newValue;
                    this.setState({ objUpdate: set(objUpdate, parentPath, parentObj) });
                }
                else { this.setState({ objUpdate: has(objUpdate, path) ? "" : set(objUpdate, path, newValue) }) }
            }
        }

        if (action === "deleteValue") {
            const { supprKey, supprValue, supprI, isSuprAllSameValue } = deleteValue!;

            const isObject = typeof supprKey === "string"
            if (isArray) {
                const parentPath = parentArrayTo(path); let parentArray: any[] = get(objUpdate, parentPath);
                if (isSuprAllSameValue) { parentArray = parentArray.filter(x => x !== supprValue); }
                else { parentArray.splice(supprI !== undefined ? supprI : parentArray.findIndex(x => x === supprValue), 1) }
                this.setState({ objUpdate: set(objUpdate, parentPath, parentArray) });
            }
            else {
                if (isObject) {
                    const parentPath = parentTo(path); let parentObj = get(objUpdate, parentPath);
                    delete parentObj[supprKey];
                    this.setState({ objUpdate: set(objUpdate, parentPath, parentObj) });
                }
            }
        }

        if (action === "updateValue") {
            const { newKey, newValue, iUpdate } = updateValue!;
            const isObject = typeof newKey === "string"
            if (isArray) {
                const parentPath = parentArrayTo(path); let parentArray = get(objUpdate, parentPath);
                parentArray[iUpdate] = newValue;
                this.setState({ objUpdate: set(objUpdate, parentPath, parentArray) });
            }
            else {
                if (isObject) {
                    //rename
                    const parentPath = parentTo(path); let parentObj = get(objUpdate, parentPath);
                    const ancientKey = lastKeyByType("Object", path)!;
                    parentObj[newKey!] = newValue === undefined ? get(objUpdate, path) : newValue;
                    delete parentObj[ancientKey!];
                    this.setState({ objUpdate: set(objUpdate, path, parentObj) });
                }
                else { this.setState({ objUpdate: has(objUpdate, path) ? "" : set(objUpdate, path, newValue) }) }
            }
        }
    }

    componentDidMount() { this.setState({ objUpdate: this.props.obj_ }) }
    getMaxLocalStorage() { let count = 0; while (typeof localStorage.getItem(STORE_KEY_LOCAL + count) === "string") { count = count + 1; }; return count; }
    downloadTemplateSave() {
        const jsonDownload = arrayByNum(this.getMaxLocalStorage()).map((el) => {
            const lclSt = localStorage.getItem(STORE_KEY_LOCAL + el) === null || localStorage.getItem(STORE_KEY_LOCAL + el) === undefined ? "" : localStorage.getItem(STORE_KEY_LOCAL + el)!;
            return isJson(lclSt) ? lclSt : JSON.stringify({ "$__jsonDd__$": lclSt });
        })
        saveAs(jsonDownload.join(","), "JsonFormInspect_Template_.json")
    }
    uploadTemplateSave() {

    }
    render() {
        const { inputKeys, objUpdate } = this.state;
        const { setting, obj_, IMG_INTERN, IMG_ASST } = this.props;

        const maxLocalStorage = this.getMaxLocalStorage();
        const extra: ExtraFormJip = { inputKeys, IMG_INTERN, IMG_ASST }
        return <div>
            <div style={{ display: "flex" }}>
                <Glass_ text="♻️ Reboot" onClick={() => { this.reboot() }} />

                <DropDownSquish onChange_={((choice) => {
                    const res = localStorage.getItem(STORE_KEY_LOCAL + choice)!
                    this.setState({ objUpdate: isJson(res) ? JSON.parse(res) : res })
                })} choices={arrayByNum(this.getMaxLocalStorage())} />
                <Glass_ text="💾 Save N+1" onClick={() => {
                    localStorage.setItem(
                        STORE_KEY_LOCAL + maxLocalStorage,
                        (typeof objUpdate === "object" && objUpdate !== null && objUpdate !== undefined) ? JSON.stringify(objUpdate) : objUpdate === null ? "null" : objUpdate === undefined ? "undefined" : String(objUpdate)
                    )
                }} />
                <Glass_ text="📤 Upload Json" onClick={() => { this.uploadTemplateSave() }} />
                <Glass_ text="📥 to Files N+1" onClick={() => { this.downloadTemplateSave() }} />


            </div>

            <div style={{ display: "flex" }}>
                <img src={extra.IMG_INTERN!.JsonForm.key} style={{ width: 40 }} />
                Nouveaux Clefs : <input
                    style={{ width: 200, height: 40, border: "3px orange solid" }}
                    value={this.state.inputKeys}
                    onChange={(e) => { this.setState({ inputKeys: e.currentTarget.value }) }}
                />
            </div>
            <div className="jsonInspector">
                <RenderInputByType_Jip {...{
                    extra, setting, handleValue: undefined, deep: 0, isItemArray: false, isKeys: false, onAction: this.onAction,
                    inherentValue: objUpdate, type: returnType(objUpdate)!, path: ""
                }} />
            </div>


            <Glass_ text="🚨 Valider 🚨" onClick={() => { this.onAction("", "onValidate") }} />
        </div>
    }
}


