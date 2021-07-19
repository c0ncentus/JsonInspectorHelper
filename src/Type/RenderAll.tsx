import { CSSProperties, Component } from "react";
import { Word_Jip, AssetImg_Jip, ImgHttpOrS, Number_Jip, Obj_Jip, Array_Jip } from ".";
import { buildIIA, returnImgByType } from "../Util/Lib";
import { FormGetRenderInputByType, FormGetJip, typeOfToJIType } from "../Util/Model";
import { Boolean_Jip } from "./Boolean";
import { Color_Jip } from "./String/Color";
import { get } from "lodash"
const cssImgOnlyRender: CSSProperties = { width: 100, height: 100, border: "red 7px ridge" }
export class RenderInputByType_Jip extends Component<FormGetRenderInputByType, any>{
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
                                        : typeOfToJIType.null === type ? <img style={cssImgOnlyRender} src={returnImgByType(null, extra!.IMG_INTERN!.Type)} />
                                            : typeOfToJIType.undefined === type ? <img style={cssImgOnlyRender} src={returnImgByType(undefined, extra!.IMG_INTERN!.Type)} />
                                                : <></>
    }
}