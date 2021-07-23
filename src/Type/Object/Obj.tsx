import { Component } from "react";
import { colorDeep, INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import { pathLoBuild, returnType, returnImgByType } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { FormGetObjectJip, FormGetAddButt, FormGetPairKey, typeOfToJIType } from "../../Util/Model";
import { DropButton, Glass_ } from "../../Util/Package";
import { RenderInputByType_Jip } from "../RenderAll";
import { upFormVal } from "../Util";



export class Obj_Jip extends Component<FormGetObjectJip, any>{
    render() {
        const { deep, setting, extra, path, onAction, isItemArray, inherentValue } = this.props;
        const currentObj = onAction(path, "getObjByPath");
        return <div className="Obj" style={{ display: "flex", marginLeft: 5 }}>
            <input type="checkbox" className="displayHide__input" />
            <div className="displayHide__content" style={{ border: `${colorDeep[deep]} 5px solid`, margin: deep * 10 }}>
                {Object.keys(currentObj).map((keysObj, i) => {
                    const newPath = pathLoBuild(path, "Object", { sub: keysObj, i: 0 })
                    return <div key={i} style={{ display: "flex" }}>
                        <PairKeyValue_Jip  {...{
                            path: newPath, deep: deep + 1, initKey: keysObj, initValue: currentObj[keysObj],
                            isItemArray: false, setting, onAction, extra, isWithAccessory: true,
                        }} />
                        {/*
                        <Glass_ text="✊" onClick={() => { onAction("", "setPanel") }} />
                        <Glass_ text="➖" onClick={() => { onAction(path, "deleteValue", { deleteValue: { supprKey: path } }); }} />
                        */}
                    </div>
                })}
                {/* <AddButtons_Jip {...{ onAction, extra, isItemArray, inherentValue, deep, setting, isAutoFill: setting.autoFillDangerous, path, }} /> */}
            </div >
        </div>
    }
}

class AddButtons_Jip extends Component<FormGetAddButt, any>{
    mainOperation(value: any) {
        const { onAction, extra, isItemArray, path } = this.props;
        onAction(path, "addValue", { addValue: { newKey: isItemArray === false ? extra!.inputKeys! : undefined, newValue: value } })
    }
    render() {
        return <div style={{ display: "flex" }} className="ButtonsAdd">
            <Glass_ text="➕ Txt" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.word) }} />
            <Glass_ text="➕ Obj" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.object) }} />
            <Glass_ text="➕ Tab" onClick={() => { this.mainOperation(INIT_VALUES_BY_TYPE.array) }} />
        </div >
    }
}


class PairKeyValue_Jip extends Component<FormGetPairKey, any>{
    render() {
        const { onAction, setting, extra, deep, isItemArray, path, initKey, initValue } = this.props;
        const typeProps = returnType(initValue);
        return <div style={{ display: "flex" }} className="minus">
            <RenderInputByType_Jip {...{
                deep, extra, onAction, setting, inherentValue: initKey, path,
                type: typeOfToJIType["word"], isItemArray, isKeys: true
            }} />
            <RenderInputByType_Jip {...{
                deep, extra, onAction, setting, type: typeProps!, path,
                inherentValue: initValue, isItemArray, isKeys: false
            }} />
            {/* <DropButton
                imgMain={returnImgByType(typeProps!, extra!.IMG_INTERN!.Type)}
                jsx_Picture={
                    toTypeByType(typeProps!.main,
                        initValue, ((value: any) => { upFormVal(onAction, path, value, isItemArray) }),
                        extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type)} />
            {convertsButton(((value: any) => { upFormVal(onAction, path, value, isItemArray) }), extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type, extra!.IMG_INTERN!.Extra.multi!)} */}
        </div>
    }
}