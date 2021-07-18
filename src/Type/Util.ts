import { get } from "lodash";
import { buildIIA, lastKeyByType } from "../Util/Lib";
import { Handle, ItemArray, TPS_ColorMode } from "../Util/Model";

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


export function inHlForm(handleValue: Handle, value?: any, isItemArray?: ItemArray, key?: string, isKey: boolean = false) {
    const isPath = Array.isArray(isItemArray);
    handleValue((isPath === false || isKey === false) ? false : true,
        key, value, isPath ? buildIIA(isItemArray!) : undefined)
}

export function initValues(inherentValue: any, isItemArray?: ItemArray, isKey: boolean = false) {
    return Array.isArray(isItemArray) === false || Array.isArray(inherentValue) === false
        ? inherentValue
        : isKey
            ? lastKeyByType("Object", buildIIA(isItemArray!))
            : get(inherentValue, buildIIA(isItemArray!))
}