import { compact, set, get } from "lodash";
import { Component } from "react";
import { inHlForm } from "..";
import { colorDeep, INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import { parentTo, buildIIA, detectObjsPath, allChildrenKeysByPath, deepPathString, pathLoBuild, newIIA, lastKeyByType, buildIIALastArray, returnType, returnImgByType } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { FormGetObjectJip, FormGetAddButt, FormGetPairKey, typeOfToJIType } from "../../Util/Model";
import { DropButton, Glass_ } from "../../Util/Package";
import { RenderInputByType_Jip } from "../RenderAll";

export class Obj_Jip extends Component<FormGetObjectJip, any>{
    render() {
        const { deep, setting, toValidate, extra, path, id, onAction, isItemArray, handleValue, inherentValue } = this.props;
        const onId = Array.isArray(isItemArray) ? id : path === "" ? id : toValidate.find(x => x.path === parentTo(path))!.id;
        let valueArray = "";
        if (Array.isArray(isItemArray)) {
            valueArray = get(toValidate.find(x => x.path === this.props.path)?.value, buildIIA(isItemArray));
        }

        return <div className="Obj" style={{ display: "flex", marginLeft: 5 }}>
            <input type="checkbox" className="displayHide__input" />
            <div className="displayHide__content" style={{ border: `${colorDeep[deep]} 5px solid`, margin: deep * 10 }}>
                {Array.isArray(isItemArray) === false && detectObjsPath(toValidate).includes(path) === true
                    ? allChildrenKeysByPath(path, compact(toValidate.map((el) => { return deepPathString(el.path, false) > deep ? el.path : undefined })))
                        .map((keysObjModified: string) => {
                            const newPath = pathLoBuild(path, "Object", { sub: keysObjModified, i: 0 });
                            return <PairKeyValue_Jip {...{
                                setting, onAction, toValidate, extra, isWithAccessory: true,
                                id: toValidate.find((x => x.path === newPath))?.id,
                                isItemArray: false, newPath, deep: deep + 1, idParent: id!
                            }} />
                        })
                    : Array.isArray(isItemArray) === true && typeof valueArray === "object" && Array.isArray(valueArray) === false
                        ? Object.keys(valueArray).map((keysObjModified: string) => {
                            const newPath = pathLoBuild(path, "Object", { sub: keysObjModified, i: 0 });
                            return <PairKeyValue_Jip {...{
                                setting, onAction, toValidate, extra, isWithAccessory: true, id,
                                isItemArray: newIIA(isItemArray, keysObjModified), newPath, deep: deep + 1,
                                idParent: id!, isArrayKey: keysObjModified, inherentValue: (valueArray as any)[keysObjModified]
                            }} />
                        })
                        : <></>
                }
                <AddButtons_Jip {...{
                    onAction, extra, isAutoFill: setting.autoFillDangerous, deep, setting, toValidate,
                    handleValue, id: Array.isArray(isItemArray) ? id : onId!, isItemArray, inherentValue
                }} />
            </div >
        </div>
    }
}

class AddButtons_Jip extends Component<FormGetAddButt, any>{
    mainOperation(value: any) {
        const { onAction, id, extra, isItemArray, handleValue, toValidate } = this.props;
        handleValue!(false, extra!.inputKeys!, toValidate.find(x => x.id === id)?.value, buildIIA(isItemArray), true, value);
    }
    render() {
        const { onAction, id, extra, isItemArray, handleValue } = this.props;
        return Array.isArray(isItemArray) === false
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
        const { toValidate, id, isItemArray, inherentValue } = this.props; // const realId = Array.isArray(isItemArray) ? id : toValidate.find(x => x.path === newPath)!.id
        const realKey = typeof isItemArray === "boolean"
            ? toValidate.find((x => x.id === id))!.key
            : lastKeyByType("Object", buildIIA(isItemArray))!
        const realValue = typeof isItemArray === "boolean"
            ? toValidate.find((x => x.id === id))!.value
            : inherentValue
        this.setState({
            key: realKey,
            value: realValue,
            isLoaded: true
        });
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
        let temp = get(this.props.toValidate.find((x => x.id === this.props.id))?.value, buildIIALastArray(this.props.isItemArray)!)
        delete temp[key];
        inHlForm(this.props.handleValue!, temp, this.props.isItemArray)
    }

    validForm() {
        this.setState({ shielVal: true })
        const pushValue = { newKey: this.state.key, newValue: this.state.value };
        this.props.onAction(this.props.id!, "onValidate", { pushValue });
        setTimeout(() => { this.setState({ shielVal: false }) }, 6000)
    }
    render() {
        const { toValidate, isWithAccessory, newPath, id, onAction, setting, extra, idParent, deep, isItemArray } = this.props;
        const realId = Array.isArray(isItemArray) ? id : toValidate.find(x => x.path === newPath)!.id
        const typeProps = returnType(this.state.value);
        if (Array.isArray(isItemArray) === false && toValidate.find(x => x.path === newPath)!.isUpToDate === false && this.state.shielVal === false) { this.validForm() }
        return this.state.isLoaded
            ? <div style={{ display: "flex" }}>
                <RenderInputByType_Jip {...{
                    deep, extra, id: realId, onAction, setting, toValidate, inherentValue: this.state.key,
                    type: typeOfToJIType["word"], handleValue: this.handleValue, isItemArray: false, isKeys: true
                }}
                />
                <RenderInputByType_Jip {...{
                    deep, extra, id: realId, onAction, setting, toValidate, inherentValue: this.state.value,
                    type: typeProps!, handleValue: this.handleValue, isItemArray, isKeys: false
                }}
                />
                <div className="minus" style={{ marginLeft: 2, display: "flex" }}>
                    {isWithAccessory
                        ? <Glass_ text="✊" onClick={() => {/* onAction("", "setPanel")*/ }} />
                        : <></>}
                    <Glass_ text="➖" onClick={() => {
                        Array.isArray(isItemArray) === false
                            ? onAction(realId!, "deleteValidate")
                            : this.removekey(this.state.key)

                    }} />
                    <DropButton
                        imgMain={returnImgByType(typeProps!, extra!.IMG_INTERN!.Type)}
                        jsx_Picture={
                            toTypeByType(typeProps!.main,
                                this.state.value, ((value: any) => { this.setState({ value }) }),
                                extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type)} />
                    {convertsButton(((value: any) => { this.setState({ value }) }), extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type, extra!.IMG_INTERN!.Extra.multi!)}
                </div>
            </div>
            : <></>
    }
}