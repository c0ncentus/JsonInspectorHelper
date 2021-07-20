import { set, get } from "lodash";
import { Component } from "react";
import { inHlForm } from "..";
import { colorDeep, INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import { parentTo, allChildrenKeysByPath, pathLoBuild, returnType, returnImgByType } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { FormGetObjectJip, FormGetAddButt, FormGetPairKey, typeOfToJIType, FormPushJip } from "../../Util/Model";
import { DropButton, Glass_ } from "../../Util/Package";
import { RenderInputByType_Jip } from "../RenderAll";

export class Obj_Jip extends Component<FormGetObjectJip, any>{
    render() {
        const { deep, setting, toValidate, extra, path, id, onAction, isItemArray, handleValue, inherentValue } = this.props;
        const currontObj = onAction(id!,"getObj") as FormPushJip ;
        
        const onId = isItemArray === false ? path === "" ? id : onAction(parentTo(path), "getObjByPath").id : id;
        let valueArray = "";
        console.log(allChildrenKeysByPath(path, toValidate.map((el) => { return el.path })))
        if (isItemArray !== false) { valueArray = get(currontObj?.value, currontObj?.value); }
        return <div className="Obj" style={{ display: "flex", marginLeft: 5 }}>
            <input type="checkbox" className="displayHide__input" />
            <div className="displayHide__content" style={{ border: `${colorDeep[deep]} 5px solid`, margin: deep * 10 }}>
                {/* {isItemArray === false && detectObjsPath(toValidate).includes(path) === true */}
                {allChildrenKeysByPath(path, toValidate.map((el) => { return el.path }))
                    .map((keysObjModified: string) => {
                       
                        const newPath = pathLoBuild(path, "Object", { sub: keysObjModified, i: 0 });
                        const newObj =  onAction(parentTo(newPath), "getObjByPath");
                        return <div style={{ display: "flex" }}>
                            <PairKeyValue_Jip {...{
                                setting, onAction, toValidate, extra, isWithAccessory: true,
                                id: newObj.id!, initKey: newObj.key, initValue: newObj.value,
                                isItemArray, newPath, deep: deep + 1, idParent: id!
                            }} />
                            <div className="minus" style={{ marginLeft: 2, display: "flex" }}>
                                <Glass_ text="✊" onClick={() => {/* onAction("", "setPanel")*/ }} />
                                <Glass_ text="➖" onClick={() => { onAction(newObj!.id!, "deleteValidate") }} />
                            </div>
                        </div>
                    })
                }
                <AddButtons_Jip {...{
                    onAction, extra, isItemArray, inherentValue, deep, setting, toValidate,
                    handleValue, id: isItemArray === false ? id! : onId!, isAutoFill: setting.autoFillDangerous,
                }} />
            </div >
        </div>
    }
}

class AddButtons_Jip extends Component<FormGetAddButt, any>{
    mainOperation(value: any) {
        const { onAction, id, extra, isItemArray, handleValue, toValidate, } = this.props;
        const obj = onAction(id!,"getObj") as FormPushJip;
        handleValue!(false, extra!.inputKeys!, obj!.value, isItemArray === false ? obj?.path : `${obj?.path}[${isItemArray}"]`, true, value);
    }
    render() {
        const { onAction, id, extra, isItemArray, handleValue } = this.props;
        return isItemArray === false
            ? <div style={{ display: "flex" }}>
                <Glass_ text="➕ Txt" onClick={() => { onAction(id!, "addValidate", { inputKeys: extra?.inputKeys!, valueAdd: INIT_VALUES_BY_TYPE.word }) }} />
                <Glass_ text="➕ Obj" onClick={() => { onAction(id!, "addValidate", { inputKeys: extra?.inputKeys!, valueAdd: INIT_VALUES_BY_TYPE.object }) }} />
                <Glass_ text="➕ Tab" onClick={() => { onAction(id!, "addValidate", { inputKeys: extra?.inputKeys!, valueAdd: INIT_VALUES_BY_TYPE.array }) }} />
            </div>
            : handleValue !== undefined
                ? <div style={{ display: "flex" }}>
                    <Glass_ text="➕ Txt" onClick={() => { this.mainOperation("") }} />
                    <Glass_ text="➕ Obj" onClick={() => { this.mainOperation({}) }} />
                    <Glass_ text="➕ Tab" onClick={() => { this.mainOperation([]) }} />
                </div>
                : <></>
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
        this.setState({ shielVal: true })
        const pushValue = { newKey: this.state.key, newValue: this.state.value };
        this.props.onAction(this.props.id!, "onValidate", { pushValue });
        setTimeout(() => { this.setState({ shielVal: false }) }, 6000)
    }
    render() {
        const { toValidate, newPath, id, onAction, setting, extra, deep, isItemArray } = this.props;
        const newPathObj = onAction(newPath, "getObjByPath" )
        const realId = isItemArray === false ? newPathObj!.id : id
        const typeProps = returnType(this.state.value);
        if (isItemArray === false && newPathObj!.isUpToDate === false && this.state.shielVal === false) { this.validForm() }

        return this.state.isLoaded
            ? <div style={{ display: "flex" }}>
                <RenderInputByType_Jip {...{
                    deep, extra, id: realId, onAction, setting, toValidate, inherentValue: this.state.key,
                    type: typeOfToJIType["word"], handleValue: this.handleValue, isItemArray: false, isKeys: true
                }} />
                <RenderInputByType_Jip {...{
                    deep, extra, id: realId, onAction, setting, toValidate, type: typeProps!,
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