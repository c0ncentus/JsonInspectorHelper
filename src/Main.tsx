import { get } from "http";
import { compact, set } from "lodash";
import { Component, CSSProperties } from "react";
import { colorDeep, INIT_VALUES_BY_TYPE } from "./Util/CONST";
import { initToValidate, pathLoBuild, deepPathString, setPathKeyInVal, onValidateJip, buildIIALastArray, swap, buildIIA, newIIA, returnType, returnImgByType, parentTo, detectObjsPath, allChildrenKeysByPath, lastKeyByType, inHlForm } from "./Util/Lib";
import { toTypeByType, convertsButton } from "./Util/Libx";
import { FormPushJip, TPS_ColorMode, TypePanel, MainTypeProps, CustomPicture, JIPSetting, ActionFunc, ExtraFormJip, Array_JipProps, FormGetObjectJip, FormGetAddButt, FormGetPairKey, typeOfToJIType, FormGetRenderInputByType, FormGetJip } from "./Util/Model";
import { Glass_, RadientNum, DropButton } from "./Util/Package";



interface JsonFormInspectState {
    toValidate: FormPushJip[], initVal: FormPushJip[]
    inputKeys: string, colorMode: TPS_ColorMode | null,
    choiceTypePanel: TypePanel | null, subStrChoice: "mot" | "titre" | "descriptif" | "Paragraphe" | null,
    subArrChoice: MainTypeProps | null, subSubChoice: string | null
    typeArray: MainTypeProps | null, valuePathChange: string | null,
    obj_scheme: any
    // imgInfo: null | { format?: "Jpg" | "Png", shape?: "Bac" | "Phone" | "Square" }, imgStandBy: string | null,
}

interface JsonFormInspectProps {
    obj_: any,
    onValidate: (obj_: any) => any,
    onUpdate: (obj: any) => any
    isWithAccessory: boolean, IMG_ASST: CustomPicture, setting: JIPSetting
}

// 1- SOLUTION MAKE RECURSION on ARRAY => JFI oR JIP
// 2 change for images ... 


export class JsonFormInspect extends Component<JsonFormInspectProps, JsonFormInspectState>{
    constructor(props: any) {
        super(props)
        this.state = {
            inputKeys: "futureKeyName", colorMode: null, toValidate: [], initVal: [], // keyTemplate
            valuePathChange: null, choiceTypePanel: null, typeArray: null,
            subStrChoice: null, subArrChoice: null, subSubChoice: null,
            obj_scheme: {},
        }
        this.onAction = this.onAction.bind(this);
    }
    reboot() { this.setState({ toValidate: initToValidate(this.props.obj_) }) }
    rebootAllValidate() {
        this.setState({
            toValidate: this.state.toValidate.map((el) => {
                return el.path === "" || (typeof el.value === "object" && Array.isArray(el.value))
                    ? { ...el, isUpToDate: true }
                    : { ...el, isUpToDate: false }
            })
        })
    }
    onAction(id: string, action: ActionFunc, extra?: ExtraFormJip) {
        if (action === "getJipReplica") { return this.props; }
        const { toValidate } = this.state;
        const objFind = toValidate.find((x) => { return x.id === id })!;
        const { isUpToDate, key, path, value } = objFind;
        if (action === "getObj") { return objFind }
        if (action === "addValidate") {
            const initKeys = extra!.inputKeys!;
            const initPath = pathLoBuild(path, "Object", { sub: extra!.inputKeys!, i: 0 });
            if (toValidate.some(x => { return x.key === initKeys, x.path === initPath })) { }
            else { this.setState({ toValidate: [...toValidate, { id: process(), isUpToDate: true, path: initPath, key: initKeys, value: extra!.valueAdd! }] }) }
        }
        if (action === "deleteValidate") {
            const delVals = path === "" ? [objFind.id]
                : typeof value === "object" && Array.isArray(value)
                    ? toValidate
                        .filter(x => { return deepPathString(x.path, false) >= deepPathString(path, false) })
                        // OBJ ISSUE A FIXER
                        // .map((el) => { return { id: el.id, path: el.path } })
                        // .filter(x => { return detectedPath(rgx_dot.test(path) ? [path] : path.split("."), rgx_dot.test(x.path) ? [x.path] : x.path.split(".")) })
                        .map((el) => { return el.id })
                    : [id];
            this.setState({ toValidate: toValidate.filter(x => { return delVals.includes(x.id) === false }), })

        }
        if (action === "getValidate") { return isUpToDate }
        if (action === "onValidate") {
            const newValue = extra?.pushValue?.newValue!;
            const newKey = extra?.pushValue?.newKey!;
            const validateValue = setPathKeyInVal(toValidate, { id, value: newValue, key: newKey, })
            this.setState({ toValidate: validateValue })
            if (this.props.onValidate !== undefined) { this.props.onValidate(onValidateJip(validateValue)) }
        }
    }
    componentDidMount() { this.setState({ toValidate: initToValidate(this.props.obj_), initVal: initToValidate(this.props.obj_) }) }

    render() {
        if (this.state.toValidate.length === 0) { return <></> } else {
            const { colorMode, inputKeys, toValidate } = this.state;
            const { isWithAccessory, setting, obj_ } = this.props;
            const extra: ExtraFormJip = { colorMode, inputKeys, Img_ASSET: this.props.IMG_ASST }
            const idRoot = this.state.toValidate.find(y => y.path === "")!.id;
            return typeof obj_ === "object"
                && (Object.keys(obj_).length !== 0)
                ? <div>
                    <Glass_ text="♻️" onClick={() => { this.reboot() }} />
                    <div style={{ display: "flex" }}>
                        <img src={JsonForm.key} style={{ width: 40 }} />
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




class Array_Jip extends Component<Array_JipProps, { swapItemArr: { iBegin: null | number, iEnd: null | number } }>{
    constructor(props: any) { super(props); this.state = { swapItemArr: { iBegin: null, iEnd: null } }; }

    removeValue(value: any[], i: number) {

        const pathToMod = Array.isArray(this.props.isItemArray)
            ? buildIIALastArray(this.props.isItemArray)!
            : "";
        let temp = value;
        temp.splice(i, 1);
        this.props.handleValue!(false, undefined, temp, pathToMod === "" ? undefined : pathToMod)
    }
    addValue(value: any[]) {
        const pathToMod = Array.isArray(this.props.isItemArray)
            ? buildIIALastArray(this.props.isItemArray)!
            : "";
        let temp = value;
        temp.push(undefined);
        this.props.handleValue!(false, undefined, temp, pathToMod === "" ? undefined : pathToMod)
    }
    render() {
        const { deep, onAction, extra, setting, id, handleValue, toValidate, inherentValue, isItemArray } = this.props;
        const { swapItemArr } = this.state;
        const propsJip = onAction("", "getJipReplica") as JsonFormInspectProps;

        return <div className="Array" style={{ borderStyle: "dotted", borderColor: colorDeep[deep], borderWidth: 3 }}>
            {typeof swapItemArr.iBegin === "number" && typeof swapItemArr.iEnd === "number" && inherentValue !== undefined
                ? <div style={{ position: "fixed", top: 0, right: 0, zIndex: 500 }}>
                    <Glass_ text="↕️" onClick={() => {
                        handleValue!(
                            false, undefined,
                            swap(inherentValue, swapItemArr.iBegin!, swapItemArr.iEnd!),
                            typeof isItemArray === "boolean" ? inherentValue : buildIIA(isItemArray)
                        );
                        this.setState({ swapItemArr: { iBegin: null, iEnd: null } })
                    }} />
                </div>
                : <></>}
            {inherentValue.map((itemValue: any, i: number) => {
                const newIsItemArray = newIIA(isItemArray, i);
                const type = returnType(itemValue);
                return <div>
                    <div style={{ display: "flex" }}>
                        <div className="minus"><Glass_ text="➖" onClick={() => { this.removeValue(inherentValue, i) }} /></div>
                        <div style={{ position: "relative", width: 85, margin: 5, marginRight: 10 }}>
                            <p className="linkInSwapBut">
                                {swapItemArr.iBegin === i
                                    ? "🪂"
                                    : swapItemArr.iEnd === i
                                        ? "🎯"
                                        : "🖱️"}
                            </p>
                            <div style={{ cursor: "pointer", position: "absolute", top: 0, left: 0 }} onClick={() => {
                                if (this.state.swapItemArr.iBegin === null) {
                                    this.setState({ swapItemArr: { iBegin: swapItemArr.iBegin === i ? null : i, iEnd: this.state.swapItemArr.iEnd } })
                                }
                                if (typeof this.state.swapItemArr.iBegin === "number" && this.state.swapItemArr.iEnd === null) {
                                    this.setState({ swapItemArr: { iBegin: swapItemArr.iBegin, iEnd: swapItemArr.iBegin === i ? null : i } })
                                }
                                if (typeof this.state.swapItemArr.iBegin === "number" && typeof this.state.swapItemArr.iEnd === "number") {
                                    this.setState({ swapItemArr: { iBegin: null, iEnd: null } })
                                }
                            }
                            }>
                                <RadientNum txt={i.toString()} />
                            </div>
                        </div>
                        {type === null ? <></>
                            : <JsonFormInspect {...{ ...propsJip, obj_: itemValue, onValidate: ((obj) => { }), onUpdate: (() => { }) }} />}
                        {/* <RenderInputByType_Jip {...{ isKeys: false, isItemArray: newIsItemArray, id, handleValue, onAction, toValidate, type, deep, setting, extra, inherentValue }} />} */}
                        <DropButton imgMain={returnImgByType(type!, ImgPackage.Type)} jsx_Picture={toTypeByType(type!.main, itemValue, ((value: any) => { handleValue!(false, undefined, value, buildIIA(newIsItemArray)) }), extra.Img_ASSET!.Jpg.Bac[0])} />
                        {convertsButton((value: any) => { handleValue!(false, undefined, value, buildIIA(newIsItemArray)) }, extra.Img_ASSET!.Jpg.Bac[0])}
                    </div>
                </div>
            })
            }
            <div style={{ textAlign: "center" }}><Glass_ text="➕ 1ier Item" onClick={() => { this.addValue(inherentValue) }} /></div>
        </div >
    }
}


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
                        imgMain={returnImgByType(typeProps!, ImgPackage.Type)}
                        jsx_Picture={
                            toTypeByType(typeProps!.main,
                                this.state.value, ((value: any) => { this.setState({ value }) }),
                                extra!.Img_ASSET!.Jpg.Bac[0])} />
                    {convertsButton(((value: any) => { this.setState({ value }) }), extra!.Img_ASSET!.Jpg.Bac[0])}
                </div>
            </div>
            : <></>
    }
}

const cssImgOnlyRender: CSSProperties = { width: 100, height: 100, border: "red 7px ridge" }
class RenderInputByType_Jip extends Component<FormGetRenderInputByType, any>{
    render() {
        const { isKeys, type, setting, extra, handleValue, id, isItemArray, onAction,
            toValidate, deep, inherentValue
        } = this.props;

        const valueArr = Array.isArray(isItemArray) ? get(inherentValue, buildIIA([isItemArray[isItemArray.length - 1]])) : inherentValue
        const isReadKey = false;
        // setting.ONLY_READ|| (isKey === true && setting.UPDATE_EXIST.keys === false && setting.UPDATE_NEW.keys === false)
        // || (isKey === true && this.props.setting.UPDATE_EXIST.keys === false && this.ALL_PATH_INIT_OBJECT.includes(path))
        // || (isKey === true && this.props.setting.UPDATE_NEW.keys === false && this.ALL_PATH_INIT_OBJECT.includes(path) === false);
        const isReadValue = false;
        // this.props.setting.ONLY_READ|| (isKey === true && setting.UPDATE_EXIST.value === false && setting.UPDATE_NEW.value === false)
        // || (isKey === true && this.props.setting.UPDATE_EXIST.value === false && this.ALL_PATH_INIT_OBJECT.includes(path))
        // || (isKey === true && this.props.setting.UPDATE_EXIST.value === false && this.ALL_PATH_INIT_OBJECT.includes(path) === false);
        const permission = { isAutoFill: setting.autoFillDangerous, key: isReadKey, value: isReadValue }
        const genData = { extra, permission, isItemArray, isKeys, handleValue, inherentValue } as FormGetJip
        return (type === typeOfToJIType.word) ? <Word_Jip {...genData} />
            : typeOfToJIType.assetImg === type ? <AssetImg_Jip {...genData} />
                : (typeOfToJIType.http === type || typeOfToJIType.https === type) ? <ImgHttpOrS {...genData} />
                    : typeOfToJIType.color === type ? <Color_Jip {...genData} />
                        : typeOfToJIType.number === type ? <Number_Jip {...genData} />
                            : typeOfToJIType.boolean === type ? <Boolean_Jip {...genData} />
                                : typeOfToJIType.array === type ? <Array_Jip {...{
                                    deep, extra, isItemArray, handleValue, id, onAction, setting, toValidate,
                                    inherentValue: valueArr
                                }} />
                                    : typeOfToJIType.object === type ? <Obj_Jip {...{ id, path: toValidate.find(x => x.id === id!)!.path, sub: genData, isItemArray, toValidate, deep, setting, extra, onAction, handleValue }} />
                                        : typeOfToJIType.null === type ? <img style={cssImgOnlyRender} src={returnImgByType(null)} />
                                            : typeOfToJIType.undefined === type ? <img style={cssImgOnlyRender} src={returnImgByType(undefined)} />
                                                : <></>
    }
}

