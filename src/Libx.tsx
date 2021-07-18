import { Component } from "react";
import { get, compact, cloneDeep, uniq, max } from "lodash";
import { Link } from "react-router-dom";
import { FormPushJip, KeyValue, TypeProps, SupprtJip, typeOfToJIType, WebsiteStructure__, router, Menuing, MenuItem, JipType, INIT_VALUES_BY_TYPE, ItemArray, MainTypeProps, SubSubTypeProps, SubTypeProps, Handle, JipAssets } from "../../Util";
import { process } from "uniqid";
import {
    rgx_dot, rgx_crochePath, regex_Img, regexColor, regex_Img_http, regex_https, regex_Assets
} from "./Regex";
let ImgPackage: JipAssets = {
    Extra: { inputhttp: "", logoHttp: "", logoHttps: "", multi: "" },
    JsonForm: { key: "", value: "" },
    Type: {
        array: "", assetImg: "", blob: "", boolean: "", color: "", date: "", http: "", https: "", img: "", null: "",
        number: "", object: "", undefined: "", word: ""
    }
}


export class BallButton extends Component<{ imgMain: string }, any>{ render() { return <section className="BallButton_Cpnt"><figure className="ball bubble" style={{ background: `url(${this.props.imgMain})` }} /></section> } }
export function convertsButton(func: (value: any) => any, assetsImgInit: string) {
    return <DropButton
        imgMain={ImgPackage.Extra.multi}
        jsx_Picture={
            [
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.boolean) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.number) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.word) }}><BallButton imgMain={returnImgByType(typeOfToJIType.word,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.img) }}><BallButton imgMain={returnImgByType(typeOfToJIType.img,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.object) }}><BallButton imgMain={returnImgByType(typeOfToJIType.object,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.array) }}><BallButton imgMain={returnImgByType(typeOfToJIType.array,)} /></div>,
                <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.https) }}><BallButton imgMain={returnImgByType(typeOfToJIType.https,)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.http) }}><BallButton imgMain={returnImgByType(typeOfToJIType.http,)} /></div>,
                <div onClick={() => { func(assetsImgInit) }}><BallButton imgMain={returnImgByType(typeOfToJIType.assetImg,)} /></div>,



            ]
        } />
}

export function toTypeByType(type: MainTypeProps, value: any, func: (value: any) => any, assetsImgInit: string) {
    return {
        Array: [
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
        ],
        Object: [
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
        ],
        Number: [
            <div onClick={() => { func(value.toString()) }}><BallButton imgMain={returnImgByType(typeOfToJIType.word,)} /></div>,
            value >= 0 ? <div onClick={() => { func(value === 0 ? false : true) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean,)} /></div> : <></>,

            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
        ],
        String: [
            regex_Boolean.test(value) ? <div onClick={() => { func("false" === value ? false : true) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean,)} /></div> : <></>,
            regex_Number.test(value) ? < div onClick={() => { func(parseInt(value, 10)) }} > <BallButton imgMain={returnImgByType(typeOfToJIType.number)} /></div > : <></>,
            regex_Img.test(value) ? <div onClick={() => { func(INIT_VALUES_BY_TYPE.img) }}><BallButton imgMain={returnImgByType(typeOfToJIType.img,)} /></div> : <></>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
            <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>,
            regex_Img_http.test(value)
                ? regex_https.test(value)
                    ? <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.https,)} /></div>
                    : <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.http,)} /></div>
                : regex_Assets ?
                    <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.assetImg,)} /></div>
                    : <></>,

        ],
        null: [
            <div onClick={() => { func("null") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word,)} /></div>,
            <div onClick={() => { func(false) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean,)} /></div>,
            <div onClick={() => { func(0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number,)} /></div>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
        ],
        undefined: [
            <div onClick={() => { func("undefined") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word,)} /></div>,
            <div onClick={() => { func(false) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean,)} /></div>,
            <div onClick={() => { func(0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
        ],
        Boolean: [
            <div onClick={() => { func(value ? "true" : "false") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word,)} /></div>,
            <div onClick={() => { func(value ? 1 : 0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number,)} /></div>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined,)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null,)} /></div>,
        ],
    }[type]
}
export function toTypeBySubSubType(type: SubSubTypeProps, func: (value: any) => any, assetsImgInit: string) {
    return {
        assetImg: "",
        https: "",
        http: "",
        Blob: "",
        Pour1: "",
        Pour5: "",
        Pour10: "",
        Pour100: "",
        Uniq: "",
        Linears: "",
        Coniqs: "",
        MixedBg: "",
        Bool: "",
        "Day/Month/Year": "",
        Day: "",
        Month: "",
        Hour: "",
        Year: "",
        "Year/Month/Day": "",
        Other: "",
        Word: ""
    }[type]
}

export function toTypeBySubType(type: SubTypeProps, func: (value: any) => any, assetsImgInit: string) {
    return {
        Color: "",
        Date: "",
        Img: "",
        Other: "",
        PourX: "",
    }[type]
}


export function strButTo(value: string) {
    let possibilities: SupprtJip = regexColor.test(value) ? "color"
        : regex_Img.test(value) ? "img"
            : regex_Boolean.test(value) ? "boolean"
                : regex_Number.test(value) ? "number" : "word";
    return <BallButton imgMain={returnImgByType(typeOfToJIType[possibilities])} />
}

export function numButTo(value: number) {
    return [
        <BallButton imgMain={ImgPackage.Type.word} />,
        value === 0 || value === 1 ? <BallButton imgMain={ImgPackage.Type.boolean} /> : undefined
    ]
}

export const boolButTo = [
    <BallButton imgMain={ImgPackage.Type.word} />,
    <BallButton imgMain={ImgPackage.Type.number} />
]

export function convertButByType(type: TypeProps | null, value: any): any {
    return type === null ?
        <></> : type.subSub === "Word" ? strButTo(value)
            : (type.sub === "Color" || type.sub === "Date" || type.sub === "Img") ? strButTo("Word")
                : type.main === "Number" ? numButTo(value)
                    : type.main === "Boolean" ? boolButTo : <></>
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
export function buildObjByTriJip(obj: FormPushJip[][]): any {
    let tempObj = {};
    obj.forEach((contain) => {
        contain.forEach((element) => {
            tempObj = set(tempObj, element.path, element.value)
        })
    })
    obj.forEach((contain) => {
        contain.forEach((element) => {
            tempObj = renameGoodKey(tempObj,
                extractKeyByPath(element.path, "Object", { type: "PrvsLast", levelOnlyKey: 0 }, "")!,
                lastKeyByType("Object", element.path)!,
                element.key)
        })
    })
    return tempObj;
}
export function onValidateJip(obj: FormPushJip[]): any {
    return buildObjByTriJip(byLvlDeep(obj));
}
function byLvlDeep(obj: FormPushJip[]): FormPushJip[][] {
    const objPlusDeepLvl = obj.map((elObj) => { return { ...elObj, lvl: deepPathString(elObj.path, true) } });
    const lvlMax = Math.max(...objPlusDeepLvl.map((elObj) => { return elObj.lvl }));
    let res: FormPushJip[][] = [];
    for (let index = 1; index < lvlMax + 1; index++) {
        const element = objPlusDeepLvl.filter(x => { return x.lvl === index }).map((elObj) => { const { lvl, ...rest } = elObj; return rest; });
        res.push(element);
    }
    return res
}

export function initValues(inherentValue: any, isItemArray?: ItemArray, isKey: boolean = false) {
    return Array.isArray(isItemArray) === false || Array.isArray(inherentValue) === false
        ? inherentValue
        : isKey
            ? lastKeyByType("Object", buildIIA(isItemArray!))
            : get(inherentValue, buildIIA(isItemArray!))
}


export function newIIA(iia: ItemArray, value: (string | number)) { return typeof iia === "boolean" || typeof iia !== "object" ? [value] : [...iia, value] }


export function inHlForm(handleValue: Handle, value?: any, isItemArray?: ItemArray, key?: string, isKey: boolean = false) {
    const isPath = Array.isArray(isItemArray);
    handleValue((isPath === false || isKey === false) ? false : true,
        key, value, isPath ? buildIIA(isItemArray!) : undefined)
}




export function buildIIA(isItemArray: ItemArray) {
    return Array.isArray(isItemArray) ? isItemArray.map((el, i) => { return typeof el === "string" ? `${i !== 0 ? "" : "."}${el}` : `[${el}]` }).join("") : ""
}
export function buildIIALastArray(isItemArray: ItemArray) {
    if (Array.isArray(isItemArray) === false) { return }
    else {
        let maxIndex = 0;
        const allIndex = (isItemArray as any[])
            .map(((y, indexA) => {
                return typeof y === "number" ? indexA : undefined
            }))
            .filter((objF => { return objF !== undefined })) as number[];
        maxIndex = max(allIndex)!;
        return (isItemArray as any[])
            .map((el, i) => {
                return i <= maxIndex
                    ? typeof el === "string"
                        ? `${i !== 0 ? ""
                            : "."}${el}`
                        : `[${el}]`
                    : undefined
            })
            .filter(r => { return r !== undefined })
            .join("");
    }
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

export function detectObjsPath(obj: FormPushJip[]): string[] {
    const allPathHaveValue = compact(obj.map((el) => {
        return deepPathString(el.path, false) === 1
            ? undefined
            : el.path
    }))
    const originalPath: string[] = typeof obj.find(x => x.path === "") === "object" ? [""] : []
    if (obj.length === 0 || allPathHaveValue.length === 0 || allPathHaveValue[0] === undefined) { return originalPath }
    const objTemp = [];


    if (allPathHaveValue[0][0] !== "[") { objTemp.push("") }

    allPathHaveValue.forEach((path) => {
        const split = path.split(".");
        //lol.loz
        const deepObj = deepPathString(path, false);
        if (deepObj < 2) { return }
        else {
            let joinSplatter = ""
            for (let i = 0; i < split.length - 1; i++) {
                const res = joinSplatter === "" ? split[i] : joinSplatter + "." + split[i];
                objTemp.push(res);
                joinSplatter = res;
            }
        }
    })
    originalPath.forEach((e) => { objTemp.push(e) })

    return uniq(objTemp)
}

export function pathLoBuild(key: string, type: "Array" | "MixedObject" | "MixedArray" | "Simple" | "Object", extra: { sub: string, i: number } = { sub: "", i: 0 }) {
    const { i, sub } = extra;
    if (type === "Simple") { return key };
    if (type === "Array") { return `${key}[${i}]` };
    if (type === "Object") { return key === "" ? sub : `${key}.${sub}` };
    if (type === "MixedArray") { return `${key}[${i}].${sub}` };
    if (type === "MixedObject") { return key === "" ? `${sub}[${i}]` : `${key}.${sub}[${i}]` };
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
                let found = false; let res = "";
                splitDot.forEach((els) => {
                    if (found === false) {
                        const r: string = els; const verify = r.replace(/\[.*\]/gs, "");
                        if (verify.length !== 0 && /\w+/.test(verify)) { found = true; res = verify }
                    }
                })
                return res
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
function setPathKey(actualKey: FormPushJip, newKey: string): FormPushJip {
    const deep = deepPathString(actualKey.path, false);
    const newPath = deep === 1 ? newKey : [...compact(actualKey.path.split(".").map((el, i) => { return deep - 1 === i ? el : undefined })), actualKey.value].join(".")
    return {
        ...actualKey,
        key: newKey,
        isUpToDate: true,
        path: newPath,
    }
}

export function setPathKeyInVal(obj: FormPushJip[], actual: { id: string, value: any, key: string }): any[] {
    if (obj.length === 0) { return [] }
    const { id, key, value } = actual;
    const originalObj = obj.find(x => x.id === id)!;
    const path = originalObj.path; let objTemp = cloneDeep(obj);

    objTemp[objTemp.findIndex(x => x.id === id)] = { ...setPathKey(originalObj, key), key, value, isUpToDate: true };
    const isSplitMain = rgx_dot.test(path);
    const pathSplit = isSplitMain ? path.split(".") : [path];
    obj
        .map(r => { return { path: r.path, id: r.id } })
        .filter(x => deepPathString(x.path, false) > deepPathString(path, false))
        .filter((xEl) => { return rgx_dot.test(xEl.path) && typeof detectedPath(pathSplit, xEl.path.split(".")) === "number" })
        .forEach((solve) => { objTemp[objTemp.findIndex(y => y.id === solve.id)].path = remplacePath(pathSplit, solve.path.split(".")) as string })
    return objTemp
}
export function allChildrenKeysByPath(pathRef: string, allPath: string[]): string[] {
    if (allPath.length === 0) { return [] }
    let res: string[] = []
    let tempRes: string[] = [];
    if (pathRef === "") {
        allPath.forEach((path) => {
            const isSplitSecond = rgx_dot.test(path);
            const pushData = isSplitSecond ? path.split(".")[0].replace(rgx_crochePath, "") : ""
            res.push(isSplitSecond ? pushData : path);
        })
    }
    else {
        tempRes = pathRef.split(".");
        allPath.forEach((path) => {
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
    return deepPathString(path, false) === 1 || rgx_dot.test(path) === false
        ? ""
        : compact(path
            .split(".")
            .map((el, i, arr) => {
                return arr.length - 1 === i ? undefined : el
            })).join(".")
}


export function ptF(arr: string[], withSlash: boolean = true): string { return `${withSlash ? `/` : ""}${arr.join("/")}` }


function isObject(x: any) {
    return typeof x === "object" && Object.prototype.toString.call(x) === '[object Object]';
};

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

export function getObjPath(obj: any, pathArray: string[][], busArray?: string[]) {
    const tempPathArray: string[][] = pathArray ? pathArray : [];
    if (isObject(obj)) {
        for (const key in obj as KeyValue) {
            if (obj.hasOwnProperty(key)) {
                const tempBusArray: string[] = busArray !== undefined ? busArray : [];
                if (isObject(obj[key])) {
                    if (Object.keys(obj[key]).length === 0 && typeof key === "string") {
                        if (busArray) { tempPathArray.push(tempBusArray.concat([key])) }
                        else { tempPathArray.push([key]); }
                    }
                    else { getObjPath(obj[key], tempPathArray, tempBusArray); }
                } else {
                    if (busArray) { tempPathArray.push(tempBusArray.concat([key])) }
                    else { tempPathArray.push([key]); }
                }
            }
        }
    }
    const res = pathArray.map((arrayStr) => { return arrayStr.join(".") })
    return compact(res);
}

export function pathToValid(obj: any): { isUpToDate: boolean, path: string }[] {
    const res = getObjPath(obj, [[]]);
    let resState = res.map((e) => { return { isUpToDate: true, path: e } });
    res.forEach((keyword) => { if (resState.filter((x) => { return x.path.search(keyword) !== -1 }).length > 1) { resState.splice(resState.findIndex((x) => { return x.path === keyword })) } })
    return resState;
}

export function initToValidate(obj: any): FormPushJip[] {
    let resTemp = pathToValid(obj)
        .map((elPathObj) => {
            return {
                value: get(obj, elPathObj.path),
                id: process(),
                key: lastKeyByType("Object", elPathObj.path)!,
                isUpToDate: true,
                path: elPathObj.path
            }
        })
    if (typeof obj === "object") { if (Array.isArray(obj)) { } else { resTemp.push({ id: process(), isUpToDate: true, key: "", path: "", value: obj }) } }
    return resTemp
}

export function returnImgByType(value: TypeProps | null | undefined, img: JipType = ImgPackage.Type): string {
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

export function websiteToRouter(struct: WebsiteStructure__): router {
    let e: router = [];
    e.push({ name: ptF([struct.title]), path: [struct.title], component: struct.cpnt, customParam: struct.customParam, function_: struct.function_ })
    if (typeof struct.items !== "undefined") {
        for (let i = 0; i < struct.items.length; i++) {
            const o = struct.items[i];
            e.push({ name: o.title, path: [o.title], component: o.cpnt, customParam: o.customParam, function_: o.function_ });
            if (typeof o.items !== "undefined") {
                for (let j = 0; j < o.items.length; j++) {
                    const oo = o.items[j];
                    const t_t_ = [o.title, oo.title];
                    e.push({ name: oo.title, path: t_t_, component: oo.cpnt, customParam: oo.customParam, function_: oo.function_ });
                    if (typeof oo.items !== "undefined") {
                        for (let k = 0; k < oo.items.length; k++) {
                            const ooo = oo.items[k];
                            const t_t_t_ = [o.title, oo.title, ooo.title];
                            e.push({ name: ooo.title, path: t_t_t_, component: ooo.cpnt, customParam: ooo.customParam, function_: ooo.function_ });
                            if (typeof ooo.items !== "undefined") {
                                for (let l = 0; l < ooo.items.length; l++) {
                                    const oooo = ooo.items[l];
                                    const t_t_t_t_ = [o.title, oo.title, ooo.title, oooo.title];
                                    e.push({ name: oooo.title, path: t_t_t_t_, component: oooo.cpnt, customParam: oooo.customParam, function_: oooo.function_ });
                                    if (typeof oooo.items !== "undefined") {
                                        for (let m = 0; k < oooo.items.length; m++) {
                                            const ooooo = oooo.items[m];
                                            const t_t_t_t_t_ = [o.title, oo.title, ooo.title, oooo.title, ooooo.title];
                                            e.push({ name: ooooo.title, path: t_t_t_t_t_, component: ooooo.cpnt, customParam: ooooo.customParam, function_: ooooo.function_ });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return e;
}

export function websiteToMenusItems(struct: WebsiteStructure__, startUrl: string[]) {
    let allItems: Menuing[] = []
    if (typeof struct.items !== "undefined") {
        for (let i = 0; i < struct.items.length; i++) {
            const obj_ = struct.items[i];
            let menuing: Menuing = { title: obj_.title, specialLink: obj_.title === "Acceuil" ? "/" : ptF([...startUrl, obj_.title], false), items: [] }
            if (typeof obj_.items !== "undefined") {
                for (let j = 0; j < obj_.items.length; j++) {
                    const { title, cpntBehavior, } = obj_.items[j]
                    if (typeof cpntBehavior?.menu !== "undefined") {
                        menuing.items.push({ cpntBehavior: cpntBehavior.menu, title, specialLink: undefined })
                    } else {
                        menuing.items.push({ cpntBehavior: undefined, title, specialLink: ptF([...startUrl, obj_.title, title], false) });
                    }
                }
            }
            allItems.push(menuing);
        }
    }
    return allItems;
}

export function gene_main(allMenu: Menuing[]) {
    return allMenu.map((menuing) => {
        return gene_menuItem(menuing);
    })
}

export function gene_menuItem(menuing: Menuing) {
    return <li className="menu-item">
        <Link to={menuing.specialLink}>
            <p className="menu_item_Name">
                {menuing.title}
            </p>
        </Link>
        <ol className="sub-menu">
            {menuing.items.map((menuItem, index) => {
                return gene_subMenuItem(menuItem, index)
            })}
        </ol>
    </li>
}

export function display(jsxElement: JSX.Element, condition: boolean) { return condition ? jsxElement : <></>; }

export function gene_subMenuItem(sub: MenuItem, index: number) {
    return <li className="menu-item" key={`${sub.title}_${index}_${Math.trunc(Math.random() * 100)}`}>
        {(typeof sub.cpntBehavior === "undefined" && typeof sub.specialLink !== "undefined")
            ? <Link to={sub.specialLink}>
                <p className="menu-item_titleNoCmpnt">
                    {sub.title}
                </p>
            </Link>
            : <>
                {sub.cpntBehavior}
                <p className="menu-item_titleCmpnt">
                    {sub.title}
                </p>
            </>
        }

    </li>
}

