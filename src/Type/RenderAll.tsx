import { CSSProperties, Component } from "react";
import { Word_Jip, AssetImg_Jip, ImgHttpOrS, Number_Jip, Obj_Jip, Array_Jip, upFormVal } from ".";
import { returnImgByType } from "../Util/Lib";
import { convertsButton, toTypeByType } from "../Util/Libx";
import { FormGetRenderInputByType, FormGetJip, typeOfToJIType } from "../Util/Model";
import { DropButton, Glass_ } from "../Util/Package";
import { Boolean_Jip } from "./Boolean";
import { Color_Jip } from "./String/Color";

const cssImgOnlyRender: CSSProperties = { width: 100, height: 100, border: "red 7px ridge" }
export class RenderInputByType_Jip extends Component<FormGetRenderInputByType, any>{
    render() {
        const { isKeys, type, setting, extra, isItemArray, onAction, deep, inherentValue, path } = this.props;
        const isReadKey = false;
        // setting.ONLY_READ|| (isKey === true && setting.UPDATE_EXIST.keys === false && setting.UPDATE_NEW.keys === false)
        // || (isKey === true && this.props.setting.UPDATE_EXIST.keys === false && this.ALL_PATH_INIT_OBJECT.includes(path))
        // || (isKey === true && this.props.setting.UPDATE_NEW.keys === false && this.ALL_PATH_INIT_OBJECT.includes(path) === false);
        const isReadValue = false;
        // this.props.setting.ONLY_READ|| (isKey === true && setting.UPDATE_EXIST.value === false && setting.UPDATE_NEW.value === false)
        // || (isKey === true && this.props.setting.UPDATE_EXIST.value === false && this.ALL_PATH_INIT_OBJECT.includes(path))
        // || (isKey === true && this.props.setting.UPDATE_EXIST.value === false && this.ALL_PATH_INIT_OBJECT.includes(path) === false);
        const permission = { isAutoFill: setting.autoFillDangerous, key: isReadKey, value: isReadValue }
        const genData = { extra, permission, isItemArray, isKeys, inherentValue, onAction, path } as FormGetJip
        return <div style={{ display: "flex" }}>
            {(type === typeOfToJIType.word) ? <Word_Jip {...genData} />
                : typeOfToJIType.assetImg === type ? <AssetImg_Jip {...genData} />
                    : (typeOfToJIType.http === type || typeOfToJIType.https === type) ? <ImgHttpOrS {...genData} />
                        : typeOfToJIType.color === type ? <Color_Jip {...genData} />
                            : typeOfToJIType.number === type ? <Number_Jip {...genData} />
                                : typeOfToJIType.boolean === type ? <Boolean_Jip {...genData} />
                                    : typeOfToJIType.array === type ? <Array_Jip {...{ deep, extra, isItemArray, onAction, setting, inherentValue, path }} />
                                        : typeOfToJIType.object === type ? <Obj_Jip {...{ path, sub: genData, isItemArray, deep, setting, extra, onAction, inherentValue }} />
                                            : typeOfToJIType.null === type ? <img style={{ ...cssImgOnlyRender, width: 55, height: 55, marginRight: 5 }} src={returnImgByType(null, extra!.IMG_INTERN!.Type)} />
                                                : typeOfToJIType.undefined === type ? <img style={{ ...cssImgOnlyRender, width: 55, height: 55, marginRight: 5 }} src={returnImgByType(undefined, extra!.IMG_INTERN!.Type)} />
                                                    : <></>}
            {isKeys === false && isItemArray === false
                ? <div style={{ display: "flex", marginLeft:-8 }} className="minus">
                    <Glass_ text="✊" onClick={() => { onAction(path, "setPanel") }} />

                    <DropButton
                        imgMain={returnImgByType(type!, extra!.IMG_INTERN!.Type)}
                        jsx_Picture={
                            toTypeByType(type!.main,
                                inherentValue, ((value: any) => { upFormVal(onAction, path, value, isItemArray) }),
                                extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type)
                        } />
                    {convertsButton(((value: any) => { upFormVal(onAction, path, value, isItemArray) }), extra!.IMG_ASST!.Jpg.Bac[0], extra!.IMG_INTERN!.Type, extra!.IMG_INTERN!.Extra.multi!)}

                </div>
                : <></>}


        </div>
    }
}

