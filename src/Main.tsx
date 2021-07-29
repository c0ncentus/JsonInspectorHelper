import { Component } from "react";
import { returnType, arrayByNum, allJipOperation, parentTo } from "./Util/Lib";
import { CustomPicture, JIPSetting, ActionFunc, ExtraFormJip, JipAssets, ItemArray, TextObj, ActionFuncParameter } from "./Util/Model";
import { DropDownSquish, Glass_ } from "./Util/Package";
import { RenderInputByType_Jip } from "./Type/RenderAll";
import { cloneDeep, get, isEqual } from "lodash";
import { saveAs } from "file-saver";

const STORE_KEY_LOCAL = "__JFI__";
const isJson = (str: string) => { return /\{/gm.test(str) && /\}/gm.test(str) && /\:/gm.test(str) }

interface JsonFormInspectState {
    isUpToDate: boolean,
    objUpdate: any, objSave: any,
    inputKeys: string, valuePathChange: string | null, isLoad: boolean
}

export interface JsonFormInspectProps {
    obj_: any, setting: JIPSetting,
    onValidate: (obj_: any) => any, onUpdate: (obj: any) => any
    isWithAccessory: boolean, isItemArray: ItemArray,
    IMG_ASST: CustomPicture, IMG_INTERN: JipAssets, TextTemplate: TextObj, isMain: boolean,
    inherentValue?: any, isUpdatingSecondary_Jip: boolean,
    // pathSecondary?: string, onActionForSecondary?: ActionFuncParameter
}


export class JsonFormInspect extends Component<JsonFormInspectProps, JsonFormInspectState>{
    constructor(props: any) {
        super(props); this.onAction = this.onAction.bind(this);
        this.state = {
            inputKeys: "futureKeyName", objUpdate: {}, objSave: {}, valuePathChange: null,
            isLoad: false, isUpToDate: false,
        }
    }
    reboot() { this.setState({ objUpdate: this.props.obj_ }) }
    onAction(path: string, action: ActionFunc, extra?: ExtraFormJip): any {
        const objUpdate = cloneDeep(this.state.objUpdate);
        if (action === "onValidate") {this.props.onValidate(objUpdate)}
        if (action === "getJip") { return this.props; }
        if (action === "getStateObj") { return objUpdate; }
        if (action === "addValue" || action === "deleteValue" || action === "updateValue") {
            if (this.props.isMain !== false && extra!.onArrVal === true) { this.setState({ isUpToDate: false }) }
            const reObjOnDel = (action === "deleteValue");
            if (reObjOnDel === true) {
                this.setState({ objUpdate: null });
                setTimeout(() => { this.setState({ objUpdate: allJipOperation(cloneDeep(objUpdate), path, action, extra) }) }, 500)
            }
            else { this.setState({ objUpdate: allJipOperation(cloneDeep(objUpdate), path, action, extra) }) }
        }
        if (action === "getObjByPath") { return path === "" ? this.onAction("", "getStateObj") : get(objUpdate, path) }
    }
    componentDidMount() { this.setState({ objUpdate: this.props.obj_, objSave: this.props.obj_, isLoad: true }) }

    getMaxLocalStorage() { let count = 0; while (typeof localStorage.getItem(STORE_KEY_LOCAL + count) === "string") { count = count + 1; }; return count; }
    downloadTemplateSave() {
        const jsonDownload = arrayByNum(this.getMaxLocalStorage()).map((el) => {
            const lclSt = localStorage.getItem(STORE_KEY_LOCAL + el) === null || localStorage.getItem(STORE_KEY_LOCAL + el) === undefined ? "" : localStorage.getItem(STORE_KEY_LOCAL + el)!;
            return isJson(lclSt) ? lclSt : JSON.stringify({ "$__jsonDd__$": lclSt });
        })
        saveAs(jsonDownload.join(","), "JsonFormInspect_Template_.json")
    }
    uploadTemplateSave() { }
    render() {
        const { inputKeys, objUpdate, isLoad } = this.state;
        if (isLoad === false) { return <></> }
        else {
            if (this.props.isMain === false
                && this.props.isUpdatingSecondary_Jip === true
                && this.state.isUpToDate === false) {
                this.setState({ objUpdate: this.props.inherentValue, isUpToDate: true })
            }
            const { setting, IMG_INTERN, IMG_ASST, isItemArray, TextTemplate } = this.props;
            const maxLocalStorage = this.getMaxLocalStorage();
            const extra: ExtraFormJip = { inputKeys, IMG_INTERN, IMG_ASST, TextTemplate }
            return <div>
                {this.props.isWithAccessory === true ?
                    <>
                        <div style={{ display: "flex" }}>
                            <p>Configuration: </p>
                            <Glass_ text="♻️ Reboot" onClick={() => { this.reboot() }} />
                            {Object.keys(this.state.objSave) !== undefined && Object.keys(this.state.objSave).length !== 0 && isEqual(this.state.objUpdate, this.state.objSave) === false
                                ? <Glass_ text="⏪ Défaire" onClick={() => {
                                    this.setState({ objUpdate: null })
                                    setTimeout(() => {
                                        this.setState({ objUpdate: this.state.objSave })
                                    }, 500);

                                }} />
                                : <></>}
                            <Glass_ text="💾 Save" onClick={() => {
                                this.setState({ objSave: objUpdate })
                            }} />
                        </div>
                        <div style={{ display: "flex" }}>
                            <p>Stockage navigateur: </p>
                            <DropDownSquish lght={8} onChange_={((choice) => {
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
                                value={inputKeys}
                                onChange={(e) => { this.setState({ inputKeys: e.currentTarget.value }) }}
                            />
                        </div>
                    </>
                    : <></>
                }
                <div className="jsonInspector">
                    <RenderInputByType_Jip {...{
                        extra, setting, handleValue: undefined, deep: 0, isItemArray, isKeys: false, onAction: this.onAction,
                        inherentValue: objUpdate, type: returnType(objUpdate)!, path: ""
                    }} />
                </div>

                <div className="JIP_Valid">
                    <Glass_ text="🚨 Valider 🚨" onClick={() => { this.onAction("", "onValidate") }} />
                </div>
            </div>
        }
    }
}


