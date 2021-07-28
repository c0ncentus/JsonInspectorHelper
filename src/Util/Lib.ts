import { cloneDeep, set, compact, uniq, get, has } from "lodash";
import { ItemArray, TypeProps, JipType, SupprtJip, typeOfToJIType, ActionFunc, ExtraFormJip } from "./Model";

export const regex_lastArray = /^.*\[\d+\]/gm

export const rgx_dot = /\./gm
export const rgx_crochePath = /\[\w+\]/gm

export const regexColor = /^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)$/gmi;
export const regex_Hex = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gmi;
export const regex_Rgb = /^rgb\(([0-255])\,\s*([0-255])\,\s*([0-255])\)$/gm;
export const regex_Hsl = /^hsl\(\d{1,3}\s*\,\s*\d{1,3}\%\s*\,\s*\d{1,3}\%\)$/gm
export const regex_Img = /((http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg)|(\.?[/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg))/gm
export const regex_Img_http = /^http(s?)\:\/\//gm
export const regex_https = /^https/gm

export const regex_Assets = /^\/static\/media\/.+/gm;

export const regex_Number = /^\d+$/;
export const regex_Boolean = /^(true|false)$/;
export const regex_Date = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm
export const regex_BaseUrlHttp = /^.+?[^\/:](?=[?\/]|$)/gmi



export function allSquishChange(choiceSlc: string[], el: string, i: number, isRandom: boolean = false) {
    let newSelec = cloneDeep(choiceSlc);
    if (isRandom === false) {
        const total = newSelec.length;
        if (total - 1 < i) { return [...newSelec, el] }
        else {
            if (i === newSelec.length - 1) { newSelec[i] = el; return newSelec }
            else {
                let buildArr: string[] = []
                if (i === 0) { return [el] }
                else {
                    let count = 0;
                    while (buildArr.length - 1 > i) { buildArr.push(newSelec[count]); count = count + 1 }
                    return buildArr;
                }
            }
        }
    }
    else {
        let buildArr: string[] = [];
        if (i === 0) { return [el] }
        else {
            let count = 0;
            while (buildArr.length  < i) { buildArr.push(newSelec[count]); count = count + 1 }
            buildArr.push(el);
            return compact(buildArr);
        }
    }
}
export function allJipOperation(objUpdate: any, path: string, action: ActionFunc, extra?: ExtraFormJip) {
    // Obj
    if (objUpdate !== null && typeof objUpdate === "object" && Array.isArray(objUpdate) === false && extra!.onArrVal !== true) {
        return operationObj(cloneDeep(objUpdate), path, action, extra)
    }
    // []
    if (Array.isArray(objUpdate) === true || extra!.onArrVal === true) {
        return operationArr(objUpdate, path, action, extra);
    }
    // type primitif
    if (["number", "string", "boolean", "undefined"].includes(typeof objUpdate) || objUpdate === null) {
        return extra === undefined ? undefined : extra.updateValue === undefined ? undefined : extra!.updateValue!.newValue;
    }
}


export function operationObj(objUpdate: any, path: string, action: ActionFunc, extra?: ExtraFormJip) {

    let addValue: any = undefined; let updateValue: any = undefined; let deleteValue: any = undefined;
    if (extra !== undefined && extra.addValue !== undefined) { addValue = extra.addValue }
    if (extra !== undefined && extra.updateValue !== undefined) { updateValue = extra.updateValue }
    if (extra !== undefined && extra.deleteValue !== undefined) { deleteValue = extra.deleteValue }
    let res = undefined;

    if (action === "addValue") {
        const { newKey, newValue } = addValue!;
        const isObject = typeof newKey === "string"
        if (extra!.onArrVal === true) {
            const parentPath = parentArrayTo(path)
            let parentObj: any | any[] = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
            parentObj.push(newValue);
            res = parentPath === "" ? parentObj : set(objUpdate, parentPath, parentObj);
        }
        else {
            const parentPath = parentTo(path);
            let parentObj: any | any[] = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
            if (isObject && (Object.keys(parentObj) as string[]).includes(newKey) === false) {
                parentObj[newKey!] = newValue;
                res = parentPath === "" ? parentObj : set(objUpdate, parentPath, parentObj);
            }
        }
    }

    if (action === "deleteValue") {
        const { supprKey } = deleteValue!;
        const isObject = typeof supprKey === "string"
        const parentPath = parentTo(path);
        let parentObj: any | any[] = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
        let anotherObj: any = {};
        Object.keys(parentObj).forEach((key) => { if (key === supprKey) { } else { anotherObj[key] = cloneDeep(parentObj[key]) } })
        res = parentPath === "" ? anotherObj : set(objUpdate, parentPath, anotherObj);
    }

    if (action === "updateValue") {
        const { newKey, newValue, iUpdate } = updateValue!;
        const isObject = typeof newKey === "string"
        if (extra!.onArrVal! === true) {
            const parentPath = parentArrayTo(path)
            let parentObj: any | any[] = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
            parentObj[iUpdate] = newValue;
            res = parentPath === "" ? parentObj : set(objUpdate, parentPath, parentObj);
        }
        else {
            if (isObject) {
                const parentPath = parentTo(path);
                let parentObj: any | any[] = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
                const ancientKey = lastKeyByType("Object", path)!;
                parentObj[newKey!] = newValue === undefined ? get(objUpdate, path) : newValue;
                let anotherObj: any = {};
                Object.keys(parentObj).forEach((key) => { anotherObj[key === ancientKey ? newKey : key] = cloneDeep(parentObj[key]); })
                res = parentPath === "" ? anotherObj : set(objUpdate, parentPath, anotherObj);
            }
            else { res = has(objUpdate, path) ? set(objUpdate, path, newValue) : "" }
        }
    }
    return res;
}

export function operationArr(objUpdate: any, path: string, action: ActionFunc, extra?: ExtraFormJip) {
    let res = undefined;
    const objOfRes = path === "" ? objUpdate : get(objUpdate, path);
    if (action === "addValue") { res = [...objOfRes, undefined]; }
    if (action === "deleteValue") {
        const { isSuprAllSameValue, supprI, supprKey, suprrValue } = extra!.deleteValue!;
        let arrayObj: any[] = path === "" ? objUpdate : get(objUpdate, path);
        if (isSuprAllSameValue) { arrayObj = arrayObj.filter((x: any) => x !== suprrValue); }
        else { arrayObj.splice(supprI !== undefined ? supprI : arrayObj.findIndex((x: any) => x === suprrValue), 1) }
        res = path === "" ? arrayObj : set(objUpdate, path, arrayObj);
        res = arrayObj;

        console.log(res)
    }
    if (action === "updateValue") {
        let newArray = objOfRes;
        newArray[extra!.updateValue!.iUpdate!] = extra!.updateValue!.newValue;
        res = newArray;
    }
    return path === "" ? res : set(objUpdate, path, res)
}

export const renameKey = (object: any, key: string, newKey: string) => {
    const clonedObj = cloneDeep(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
}

function renameGoodKey(objRef: any, pathParent: string, key: string, newKey: string) {
    let objTemp = cloneDeep(objRef);
    const objParent = pathParent === "" ? objTemp : get(objTemp, pathParent);
    const renamObj = renameKey(objParent, key, newKey);
    return pathParent === ""
        ? renamObj
        : set(objTemp, pathParent + "." + newKey, renamObj)
}

export function newIIA(iia: ItemArray, value: (string | number)) { return typeof iia === "boolean" || typeof iia !== "object" ? [value] : [...iia, value] }

export function buildIIA(isItemArray: ItemArray) {
    return Array.isArray(isItemArray) ? isItemArray.map((el, i) => { return typeof el === "string" ? `${i !== 0 ? "" : "."}${el}` : `[${el}]` }).join("") : ""
}

export function strToRgb(rgb: string): [number, number, number] {
    rgb.replace("rgb(", "").replace(")", "")
    return rgb.split(",").map((e) => { return parseInt(e, 10) }) as [number, number, number]
}

export function strToHsl(hsl: string): [number, number, number] {
    hsl.replace("hsl(", "").replace(")", "").replaceAll("%", "");
    return hsl.split(",").map((e) => { return parseInt(e, 10) }) as [number, number, number]
}

export function rgbToHsl(r: number, g: number, b: number) {
    let rTemp = r / 255;
    let gTemp = g / 255;
    let bTemp = b / 255;

    const max = Math.max(rTemp, gTemp, bTemp), min = Math.min(rTemp, gTemp, bTemp);
    let h: number = 0, s: number, l: number = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case rTemp: h = (gTemp - bTemp) / d + (gTemp < bTemp ? 6 : 0); break;
            case gTemp: h = (bTemp - rTemp) / d + 2; break;
            case bTemp: h = (rTemp - gTemp) / d + 4; break;
        }
        h /= 6;
    }

    return `hsl(${h}, ${s}, ${l})`;
}
function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
export function hslToRgb(h: number, s: number, l: number) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }

export function hexToRGB(hex: string) {
    var aRgbHex = hex.split(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return `rgb(${aRgb.join(",")})`;
}

export function hexToHsl(hex: string) {
    var result = hex.split(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

    let r = parseInt(result![0], 16);
    let g = parseInt(result![1], 16);
    let b = parseInt(result![2], 16);

    r = r / 255; g = g / 255; b = b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);

    return `hsl(${h * 360},${s}%,${l}%)`;
}

export function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export function pathLoBuild(basePath: string, type: "Array" | "MixedObject" | "MixedArray" | "Simple" | "Object", extra: { sub: string, i: number } = { sub: "", i: 0 }) {
    const { i, sub } = extra;
    if (type === "Simple") { return basePath };
    if (type === "Array") { return `${basePath}[${i}]` };
    if (type === "Object") { return basePath === "" ? sub : `${basePath}.${sub}` };
    if (type === "MixedArray") { return `${basePath}[${i}].${sub}` };
    if (type === "MixedObject") { return basePath === "" ? `${sub}[${i}]` : `${basePath}.${sub}[${i}]` };
    return ""
}

export function lastKeyByType(target: "Array" | "Object" | "Primitive", path: string) {
    if (path === "") { return "" };
    return target === "Object" || target === "Primitive"
        ? extractKeyByPath(path, "Object", { type: "Last", levelOnlyKey: 0 })
        : ""
}

export function extractKeyByPath(path: string,
    type: "Array" | "Object" | "Mixed",
    objSub: { type: "Last" | "First" | "PrvsLast" | "RootKey", levelOnlyKey: number } = { type: "Last", levelOnlyKey: 0 },
    arraySub: "" = ""): (string | null) {
    const isSplitObj = rgx_dot.test(path);

    if (type === "Array") { return `${path}` };
    if (type === "Object") {
        if (objSub.type === "RootKey") { return "" }
        if (objSub.type === "First") {
            if (isSplitObj === false) { return path.replaceAll(/\[.*\]/gs, "") }
            else {
                const splitDot = path.split(".");
                let found = false;
                let res = ""
                splitDot.forEach((els) => {
                    if (found === false) {
                        const r: string = els;
                        const verify = r.replace(/\[.*\]/gs, "");
                        if (verify.length !== 0 && /\w+/.test(verify)) { found = true; res = verify }
                    }
                })
                return res
            }
        }
        if (objSub.type === "Last") {
            if (isSplitObj === false) { return path.replaceAll(/\[.*\]/gs, "") }
            else {
                const splitDot = path.split(".").reverse();
                return splitDot[0]
            }
        }
        if (objSub.type === "PrvsLast") {
            if (isSplitObj) {
                const splitDot = path.split("."); splitDot.pop();
                return extractKeyByPath(splitDot.join("."), "Object", { type: "Last", levelOnlyKey: 0 })
            }
            else { return "" }
        }
        return null
    };
    if (type === "Mixed") { return `${path}` };
    return ""
}

export function deepPathString(str: string, withArray: boolean): number {
    const isKeyBeg = /^\w+/.test(str);
    let initStr = (isKeyBeg ? "." : "") + str.replace(/\w+/gm, "").replaceAll("[", "");
    return withArray ? initStr.length : initStr.replaceAll("]", "").length
}

export function detectedPath(pathA: string[], pathB: string[]) {
    if (pathB.length < pathA.length) { return false }
    for (let i = 0; i < pathA.length; i++) {
        if (pathA[i] !== pathB[i]) {
            return false;
        };
    }
    return pathA.length;
}

function remplacePath(pathParent: string[], pathB: string[]) {
    if (pathB.length <= pathParent.length) { return false }
    for (let i = 0; i < pathParent.length - 1; i++) { if (pathParent[i] !== pathB[i]) { return false; }; }
    const pathStrA = pathParent.join(".");
    let pathStrBCut = compact(pathB.map((el, i) => { return i < pathParent.length ? undefined : el })).join(".");
    return pathStrA + "." + pathStrBCut;
}

export function getLastArrayByPath(path: string): string | false { return regex_lastArray.test(path) ? path.match(regex_lastArray)![0] : path }

export function allChildrenKeysByPath(pathRef: string, allPath: string[]): string[] {
    const lvlRef = deepPathString(pathRef, false);
    const newAllPath = allPath.filter(x => lvlRef + 1 === deepPathString(x, false))
    if (allPath.length === 0 && newAllPath.length === 0) { return [] }
    let res: string[] = []
    let tempRes: string[] = [];
    if (pathRef === "") { return newAllPath }
    else {
        tempRes = pathRef.split(".");
        newAllPath.forEach((path) => {
            let tempPath = path.split(".");
            const communPath = detectedPath(tempRes, tempPath);
            if (typeof communPath === "number") {
                res.push(tempPath[communPath]
                    .replace(pathRef, "")
                    .replace(rgx_crochePath, "")
                );
            }
        })
    }
    res = uniq(res).filter(x => x !== "")
    return res;
}

export function parentTo(path: string) {
    if (deepPathString(path, false) < 2 || path === "") { return "" }
    else {
        let split = path.split(".");
        split.pop();
        return split.join(".");
    }
}


//lol.ki[0] => lol.ki
// lol.ju[9].ki =>lol.ju
export function parentArrayTo(path: string) {
    console.log(getLastArrayByPath(path))
    return (getLastArrayByPath(path) as string).replace(/\[\d+\]$/gm, "");
}

export function ptF(arr: string[], withSlash: boolean = true): string { return `${withSlash ? `/` : ""}${arr.join("/")}` }


function isObject(x: any) { return typeof x === "object" && Object.prototype.toString.call(x) === '[object Object]'; };

export function rgbToAnotherRgb(str: string, isUp: boolean, diff: number) {
    let rgb = str.replace("rgb", "").replace("(", "").replace(")", "").replace(" ", "").split(",").map((nbr) => {
        const res = parseInt(nbr, 10)
        if (isUp) {
            const resFinal = res + diff;
            return resFinal > 255 ? 255 : resFinal
        } else {
            return res <= diff ? 0 : res - diff
        }
    });
    return `rgb(${rgb.join(",")})`
}

// export const diff = (obj1: any, obj2: any) => {
//     return reduce(obj1, function (result: KeyValue, value: any, key: any) {
//         if (isPlainObject(value)) {
//             result[key] = diff(value, obj2[key]);
//         } else if (!isEqual(value, obj2[key])) {
//             result[key] = value;
//         }
//         return result;
//     }, {});
// };

export function getObjPath(initialObj: any, obj: any, pathArray: string[], res: { path: string, value: any, /*type?: string,*/ key: string }[]) {
    if (pathArray.length === 0) {
        if (obj === null) { res.push({ path: "", value: null, /*type: "null", */ key: "" }) };
        if (obj === undefined) { res.push({ path: "", value: undefined, /*type: "undefined", */ key: "" }) }
        if (["string", "number", "boolean"].includes(typeof obj)) { res.push({ path: "", value: obj, /*type: typeof obj,*/ key: "" }) }
        if (Array.isArray(obj)) { res.push({ path: "", value: obj, key: "" /* type: "tab"*/ }) }
    }
    let newRes = res;
    const newPath = pathArray.join(".");
    if (typeof obj === "object" && Array.isArray(obj) === false && obj !== null) {
        newRes.push({ path: newPath, value: obj, key: pathArray[pathArray.length - 1] })
        const allKeys = Object.keys(obj);
        if (allKeys.length === 0) { }
        else { allKeys.map((key) => { newRes = [...newRes, ...getObjPath(initialObj, obj[key], [...pathArray, key], res)] }) }
    }
    if (pathArray.length > 0) {
        const key = pathArray[pathArray.length - 1]

        if (obj === null) { res.push({ path: newPath, value: null, /*type: "null",*/ key }) };
        if (obj === undefined) { res.push({ path: newPath, value: undefined, /*type: "undefined",*/ key }) }
        if (["string", "number", "boolean"].includes(typeof obj)) { res.push({ path: newPath, value: get(initialObj, newPath), /*type: typeof obj,*/ key }) }
        if (Array.isArray(obj)) { res.push({ path: newPath, value: get(initialObj, newPath),/* type: "tab",*/ key }) }
    }
    return uniq(compact(newRes));
}

export function returnImgByType(value: TypeProps | null | undefined, img: JipType): string {
    return (value === undefined || (value !== null && value!.main === "undefined")) ? img.undefined : (value === null || value.main === "null") ? img.null :
        value.subSub === "http" ? img.http : value.subSub === "https" ? img.https : value.subSub === "assetImg" ? img.assetImg : value.main === "Array" ? img.array : value.main === "Object" ? img.object : value.subSub === "Word" ? img.word : value.main === "Number" ? img.number : value.sub === "Color" ? img.color : value.sub === "Img" ? img.img : value.main === "Boolean" ? img.boolean : value.sub === "Date" ? img.date : ""
}

export function returnType(value: any): TypeProps | null {
    const isArray: boolean = Array.isArray(value);
    const typeofValue = typeof value;
    let res: SupprtJip = "word";
    if (value === undefined) { res = "undefined" }
    if (value === null) { res = "null" }
    if (["bigint", "function", "symbol"].includes(typeofValue)) { return null }
    if (typeofValue === "string") {
        if (regex_Img.test(value)) { res = "img" }
        if (regex_Img_http.test(value)) { res = regex_https.test(res) ? "https" : "http" }
        if (regex_Assets.test(value)) { res = "assetImg" }
        if (regexColor.test(value)) { res = "color" }
    }
    if (typeofValue === "object" && value !== null) { if (isArray) { res = "array" } else { res = "object" } }
    if (typeofValue === "number") { res = "number" }
    if (typeofValue === "boolean") { res = "boolean" }
    return typeOfToJIType[res];
}

export function swap(input: any, index_A: number, index_B: number) {
    let cloneInput = cloneDeep(input)
    let temp = cloneInput[index_A];

    cloneInput[index_A] = cloneInput[index_B];
    cloneInput[index_B] = temp;
    return cloneInput;
}


export function arrayByNum(num: number) { return Array.from(new Array(num)).map((el, i) => { return i.toString() }) }