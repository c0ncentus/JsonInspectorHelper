import { get } from "lodash";
import { buildIIA, lastKeyByType } from "../Util/Lib";
import { ActionFuncParameter, ItemArray, TPS_ColorMode } from "../Util/Model";

export interface Value_JipState {
    value: any, firstChange?: string,
    colorMode?: TPS_ColorMode | null,
    isHttps?: boolean | null;
    imgFormat?: "Phone" | "Bac" | "Square" | null,
    imgType?: "Jpg" | "Png" | "Svg" | null,
    imgOtherType?: null | string,
    iImg?: number | null,
    isImgRdm?: boolean,
    baseUrl?: string | null,
}

export function initValues(inherentValue: any, isItemArray?: ItemArray, isKey: boolean = false) {
    return Array.isArray(isItemArray) === false || Array.isArray(inherentValue) === false
        ? inherentValue
        : isKey
            ? lastKeyByType("Object", buildIIA(isItemArray!))
            : get(inherentValue, buildIIA(isItemArray!))
}

export function upFormVal(onAction: ActionFuncParameter, path: string, value: any, isItemArray?: ItemArray, isKeys: boolean = false) {
    onAction(
        path,
        "updateValue",
        {
            updateValue: {
                iUpdate: isItemArray === false ? undefined : isItemArray,
                newKey: isKeys ? value : undefined,
                newValue: isKeys ? undefined : value
            },
            onArrVal: /]$/gm.test(path)
        }
    )
}


export function detectSpecialObj(obj: any, cr: { key: string, isRequired: boolean }[]): boolean {
    if (typeof obj !== "object" && Array.isArray(obj) === false) { return false }
    const keys = Object.keys(obj);
    return cr.every(x => { return x.isRequired === true ? keys.includes(x.key) : true })
}


export const AssetImgObj = {
    __src__: "",
    __Type__: "Png",
    __Format__: "Square",
    __isRdm__: true,
    __i__: 3,
}