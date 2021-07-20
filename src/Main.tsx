import { Component } from "react";
import { initToValidate, pathLoBuild, deepPathString, setPathKeyInVal, onValidateJip } from "./Util/Lib";
import { FormPushJip, CustomPicture, JIPSetting, ActionFunc, ExtraFormJip, JipAssets } from "./Util/Model";
import { Glass_ } from "./Util/Package";
import { process } from "uniqid";
import { Obj_Jip } from "./Type";


interface JsonFormInspectState {
    toValidate: FormPushJip[], inputKeys: string,
    initVal: FormPushJip[], valuePathChange: string | null, // NOT USE

}

export interface JsonFormInspectProps {
    obj_: any, setting: JIPSetting
    onValidate: (obj_: any) => any, onUpdate: (obj: any) => any
    isWithAccessory: boolean, // ????
    IMG_ASST: CustomPicture, IMG_INTERN: JipAssets
}

// 1- SOLUTION MAKE RECURSION on ARRAY => JFI oR JIP
// 2 change for images ... 


export class JsonFormInspect extends Component<JsonFormInspectProps, JsonFormInspectState>{
    constructor(props: any) {
        super(props); this.onAction = this.onAction.bind(this);
        this.state = { inputKeys: "futureKeyName", toValidate: [], initVal: [], valuePathChange: null }

    }
    reboot() { this.setState({ toValidate: initToValidate(this.props.obj_) }) }
    rebootAllValidate() {
        this.setState({
            toValidate: this.state.toValidate.map((el) => {
                return el.path === "" || (typeof el.value === "object" && Array.isArray(el.value))
                    ? { ...el, isUpToDate: true } : { ...el, isUpToDate: false }
            })
        })
    }
    onAction(id: string, action: ActionFunc, extra?: ExtraFormJip) {
        const { toValidate } = this.state;
        console.log(this.state.toValidate)

        console.log(`ON_ACTION => id =${id} &&  action ${action}`)
        if (action === "getJipReplica") { return this.props; }
        if (action = "getObjByPath") { return toValidate.find(x => x.path === id) }
        const objFind = toValidate.find((x) => { return x.id === id })!;
        const { path } = objFind;
        if (action === "getObj") { return objFind }
        if (action === "addValidate") {
            const initKeys = extra!.inputKeys!;
            const initPath = pathLoBuild(path, "Object", { sub: extra!.inputKeys!, i: 0 });
            if (toValidate.some(x => { return x.key === initKeys, x.path === initPath })) { }
            else { this.setState({ toValidate: [...toValidate, { id: process(), isUpToDate: true, path: initPath, key: initKeys, value: extra!.valueAdd! }] }) }
        }
        if (action === "deleteValidate") {
            this.setState({ toValidate: toValidate.filter(x => { return x.id !== id }) })
        }
        if (action === "onValidate") {
            const newValue = extra?.pushValue?.newValue!; const newKey = extra?.pushValue?.newKey!;
            const validateValue = setPathKeyInVal(toValidate, { id, value: newValue, key: newKey, })
            this.setState({ toValidate: validateValue })
            if (this.props.onValidate !== undefined) { this.props.onValidate(onValidateJip(validateValue)) }
        }
    }
    componentDidMount() { this.setState({ toValidate: initToValidate(this.props.obj_), initVal: initToValidate(this.props.obj_) }) }

    render() {

        if (this.state.toValidate.length === 0) { return <></> } else {
            const { inputKeys, toValidate } = this.state;
            const { setting, obj_, IMG_INTERN, IMG_ASST } = this.props;
            const extra: ExtraFormJip = { inputKeys, IMG_INTERN, IMG_ASST }
            const idRoot = this.state.toValidate.find(y => y.path === "")!.id;
            return typeof obj_ === "object"
                && (Object.keys(obj_).length !== 0)
                ? <div>
                    <Glass_ text="♻️" onClick={() => { this.reboot() }} />
                    <div style={{ display: "flex" }}>
                        <img src={extra.IMG_INTERN!.JsonForm.key} style={{ width: 40 }} />
                        Nouveaux Clefs : <input
                            style={{ width: 200, height: 40, border: "3px orange solid" }}
                            value={this.state.inputKeys}
                            onChange={(e) => { this.setState({ inputKeys: e.currentTarget.value }) }}
                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="jsonInspector">
                            {Array.isArray(obj_) ? <></>
                                //<Array_Jip {...{ toValidate, deep: 0, path: "", onAction: this.onAction, extra, setting }} />
                                : <Obj_Jip  {...{
                                    id: idRoot, path: "", setting, toValidate, extra,
                                    onAction: this.onAction, isItemArray: false, deep: 0,
                                }} />
                            }
                        </div>
                    </div>
                    <Glass_ text="🚨 Valider 🚨" onClick={() => { this.rebootAllValidate() }} />
                </div>
                : <></>
        }
    }
}