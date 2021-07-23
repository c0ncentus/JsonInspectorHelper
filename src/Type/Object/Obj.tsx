import { set, get, cloneDeep } from "lodash";
import { Component } from "react";
import { process } from "uniqid";
import { inHlForm } from "..";
import { colorDeep, INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import { parentTo, allChildrenKeysByPath, pathLoBuild, returnType, returnImgByType } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { FormGetObjectJip, FormGetAddButt, FormGetPairKey, typeOfToJIType, FormPushJip } from "../../Util/Model";
import { DropButton, Glass_ } from "../../Util/Package";
import { RenderInputByType_Jip } from "../RenderAll";



export class Obj_Jip extends Component<FormGetObjectJip, { formPushs: FormPushJip[], mainPath: string }>{
    constructor(props: any) {
        super(props);
        const { path } = this.props; this.onAdding = this.onAdding.bind(this);
        this.state = { formPushs: [], mainPath: path }
    }
    buildNewPath() {return `${this.state.mainPath === "" ? "" : this.state.mainPath + "."}${this.props.extra!.inputKeys!}`}
    onAdding(value: any, newId: string) {
        if (this.state.formPushs.some(x => { return x.key === this.props.extra!.inputKeys, x.path === this.buildNewPath() })) { }
        else { this.setState({ formPushs: [...this.state.formPushs, { id: newId, isUpToDate: true, key: this.props.extra!.inputKeys!, value, path: this.buildNewPath() }] }) }
    }
    onDelete(id: string) {
        const res = this.state.formPushs.filter(x => { return x.id !== id })
        this.setState({ formPushs: res })
    }
    componentDidMount() {
        const { path, onAction } = this.props;
        this.setState({ formPushs: allChildrenKeysByPath(path, (onAction("", "getValS") as FormPushJip[]).map((el => { return el.path }))).map((el => { return onAction(el, "getObjByPath") as FormPushJip })) })
    }
    render() {
        const { deep, setting, extra, path, id, onAction, isItemArray, handleValue, inherentValue } = this.props;
        const onId = isItemArray === false || path === ""
            ? id
            : onAction(parentTo(path), "getObjByPath").id;
        const form = cloneDeep(this.state.formPushs);
        console.log(form)
        return <div className="Obj" style={{ display: "flex", marginLeft: 5 }}>
            <input type="checkbox" className="displayHide__input" />
            <div className="displayHide__content" style={{ border: `${colorDeep[deep]} 5px solid`, margin: deep * 10 }}>
                {form.map((keysObj, i) => {
                    
                    return <div key={i} style={{ display: "flex" }}>
                        <PairKeyValue_Jip  {...{
                            setting, onAction, extra, isWithAccessory: true,
                            id: keysObj.id!, initKey: keysObj.key, initValue: keysObj.value,
                            isItemArray, newPath: keysObj.path, deep: deep + 1, idParent: id!
                        }} />
                        <Glass_ text="✊" onClick={() => {/* onAction("", "setPanel")*/ }} />
                        <Glass_ text="➖" onClick={() => {
                            onAction(keysObj.id!, "deleteValidate");
                            this.onDelete(keysObj.id!)
                        }} />

                    </div>
                })}
                <AddButtons_Jip {...{
                    onAdding: this.onAdding, onAction, extra, isItemArray, inherentValue, deep, setting,
                    handleValue, id: isItemArray === false ? id! : onId!, isAutoFill: setting.autoFillDangerous,
                }} />
            </div >
        </div>
    }
}

class AddButtons_Jip extends Component<FormGetAddButt, any>{
    mainOperation(value: any) {
        const { onAction, id, extra, isItemArray, handleValue, onAdding } = this.props;
        const obj = onAction(id!, "getObj") as FormPushJip; const newId = process();
        const path = isItemArray === false ? obj?.path : `${obj?.path}[${isItemArray}"]`

        if (handleValue !== undefined) { handleValue!(false, extra!.inputKeys!, obj!.value, path, true, value,) }

        onAdding(value, newId); onAction(id!, "addValidate", { add: { value, id: newId, key: extra!.inputKeys!, path: path } })
    }
    render() {
        return <div style={{ display: "flex" }} className="ButtonsAdd">
            <Glass_ text="➕ Txt" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.word) }} />
            <Glass_ text="➕ Obj" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.object) }} />
            <Glass_ text="➕ Tab" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.array) }} />
        </div >
    }
}


class PairKeyValue_Jip extends Component<FormGetPairKey, { key: string, value: any, shielVal: boolean, isLoaded: boolean }>{
    constructor(props: any) { super(props); this.state = { key: "", value: "", shielVal: false, isLoaded: false }; this.handleValue = this.handleValue.bind(this); }
    componentDidMount() {
        const { initKey, initValue } = this.props;
        this.setState({ key: initKey, value: initValue, isLoaded: true });
    }
    handleValue(isKeys: boolean, key?: string, value?: any, pathItem?: string, isAddOnArray?: boolean, valueAdd?: any) {
        let realValue = value;
        if (isAddOnArray === undefined || isAddOnArray === false) {
            if (typeof pathItem === "string") { this.setState({ value: set(this.state.value, pathItem, value) }); }
            else { isKeys ? this.setState({ key: key! }) : this.setState({ value: realValue }) }
        } else {
            if (typeof pathItem === "string") {
                let temp = get(value, pathItem)
                temp = temp === undefined ? {} : temp;
                temp[key!] = valueAdd
                this.setState({ value: set(this.state.value, pathItem, temp) })
            }
        }
    }

    removekey(key: string) {
        // let temp = get((onAction(id!,"getObj") as FormPushJip))?.value, buildIIALastArray(this.props.isItemArray)!)
        // delete temp[key];
        // inHlForm(this.props.handleValue!, temp, this.props.isItemArray)
    }

    validForm() {
        this.setState({ shielVal: true }); const pushValue = { newKey: this.state.key, newValue: this.state.value };
        this.props.onAction(this.props.id!, "onValidate", { pushValue }); setTimeout(() => { this.setState({ shielVal: false }) }, 6000)
    }
    render() {
        const { id, onAction, setting, extra, deep, isItemArray, } = this.props;
        const newObj = onAction(id!, "getObj");
        const typeProps = returnType(this.state.value);
        if (newObj !== undefined && isItemArray === false && newObj!.isUpToDate === false && this.state.shielVal === false) { this.validForm() }

        return this.state.isLoaded && newObj !== undefined
            ? <div style={{ display: "flex" }} className="minus">
                <RenderInputByType_Jip {...{
                    deep, extra, id, onAction, setting, inherentValue: this.state.key,
                    type: typeOfToJIType["word"], handleValue: this.handleValue, isItemArray: false, isKeys: true
                }} />
                <RenderInputByType_Jip {...{
                    deep, extra, id, onAction, setting, type: typeProps!,
                    inherentValue: this.state.value, handleValue: this.handleValue, isItemArray, isKeys: false
                }} />
                <DropButton
                    imgMain={returnImgByType(typeProps!, extra!.IMG_INTERN!.Type)}
                    jsx_Picture={
                        toTypeByType(typeProps!.main,
                            this.state.value, ((value: any) => { this.setState({ value }) }),
                            extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type)} />
                {convertsButton(((value: any) => { this.setState({ value }) }), extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type, extra!.IMG_INTERN!.Extra.multi!)}
            </div>
            : <></>
    }
}