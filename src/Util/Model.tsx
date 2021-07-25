
export interface JipType {
    assetImg: string,
    http: string,
    https: string,
    array: string,
    object: string,
    date: string,
    number: string,
    blob: string,
    boolean: string,
    color: string,
    word: string,
    undefined: string,
    img: string,
    null: string
}
export interface JsonForm { key: string, value: string }
export interface ExtraImg {
    multi: string,
    inputHttp: string,
    AscString: string,
    DescString: string,
    AscNum: string,
    DescNum: string,
    logoHttp: string,
    logoHttps: string
}

export type KeyValue = { [key: string]: any; };

export type JsonTypePref = "string" | "img" | "color" | "number" | "boolean" | "object"

export interface JipAssets {
    JsonForm: JsonForm,
    Type: JipType,
    Extra: ExtraImg
}

interface ImgItem {
    Square: string[],
    Phone: string[],
    Bac: string[],
    Small?: string[],
    Other?: string[]
}

export interface CustomPicture {
    Png: ImgItem
    Jpg: ImgItem
    Svg?: any,
}

export interface BehaviorParent {
    menu?: JSX.Element;
}
export class WebsiteStructure {
    function_?: (...arg: string[]) => JSX.Element;
    cpnt: JSX.Element;
    title: string;
    cpntBehavior?: BehaviorParent;
    items?: WebsiteStructure[];
    customParam?: string[]
    constructor(obj: any) {
        this.customParam = obj.customParam;
        this.cpnt = obj.cpnt;
        this.title = obj.title;
        this.items = obj.items;
        this.cpntBehavior = obj.cpntBehavior;
        this.function_ = obj.function;
    }
};
export class WebsiteStructure__ {
    function_?: (...arg: string[]) => JSX.Element;
    cpnt: JSX.Element;
    title: string;
    cpntBehavior?: BehaviorParent;
    items?: WebsiteStructure__[];
    customParam?: string[]
    constructor(obj: any) {
        this.customParam = obj.customParam;
        this.cpnt = obj.cpnt;
        this.title = obj.title;
        this.items = obj.items;
        this.cpntBehavior = obj.cpntBehavior;
        this.function_ = obj.function;
    }
};
type RouterItem = {
    name: string;
    path: string[];
    component: JSX.Element;
    customParam?: string[];
    function_?: (...arg: string[]) => JSX.Element;
};
export type router = RouterItem[];


export interface MenuItem {
    title: string;
    cpntBehavior?: JSX.Element;
    specialLink?: string
}

export interface Menuing {
    title: string;
    specialLink: string;
    items: MenuItem[];
}

export type ActionFunc = "getJip" | "getStateObj"
    | "addValue" | "deleteValue" | "updateValue"
    | "getObjByPath" | "onValidate"
    | "setPanel" | "getValS";
export type ActionFuncParameter = (path: string, action: ActionFunc, extra?: ExtraFormJip) => any;
export interface ExtraFormJip {
    inputKeys?: string,
    colorMode?: TPS_ColorMode | null,
    onArrVal?: boolean
    addValue?: { newKey?: string, newValue?: string, },
    updateValue?: { newKey?: string, newValue?: any, iUpdate?: number }
    deleteValue?: { supprKey?: string, suprrValue?: any, supprI?: number, isSuprAllSameValue?: boolean }
    IMG_ASST?: CustomPicture
    IMG_INTERN?: JipAssets
}
export interface FormGetJip {
    inherentValue: any, onAction: ActionFuncParameter,
    permission: { value: boolean, key: boolean, isAutoFill: boolean }, path: string,
    extra?: ExtraFormJip, isItemArray?: ItemArray, isKeys: boolean, initValue?: any,
}


interface BaseGetComplex {
    isItemArray: ItemArray,
    onAction: ActionFuncParameter,
    deep: number,
    extra: ExtraFormJip,
    inherentValue?: any
    setting: JIPSetting,
    path: string
}

export type ItemArray = number | false
export interface FormGetRenderInputByType extends BaseGetComplex {
    isKeys: boolean,
    type: TypeProps,
}
export interface Array_JipProps extends BaseGetComplex { }
export interface FormGetPairKey extends BaseGetComplex {
    initKey: string,
    initValue: any,
    isWithAccessory: boolean,
}
export interface FormGetObjectJip extends BaseGetComplex { path: string }
export interface FormGetAddButt extends BaseGetComplex { }

export interface JIPSetting {
    autoFillDangerous: boolean
    NEW: boolean;
    ONLY_READ: boolean;
    UPDATE_EXIST: { keys: boolean; value: boolean; };
    UPDATE_NEW: { keys: boolean; value: boolean; }
}

export interface GlobalJIPSetting { start: { css: JIPSetting }, training: JIPSetting }

export type TypePanel = "Tableau" | null;
export type SubtitleTypePanel = "mot" | "titre" | "descriptif" | "Paragraphe" | null;
export interface TypeProps {
    main: MainTypeProps,
    sub?: SubTypeProps,
    subSub?: SubSubTypeProps
}

export type MainTypeProps = "Object" | "Array" | "String" | "Number" | "Boolean" | "undefined" | "null";

export type SubTypeProps = TPS | TPN;
export type SubSubTypeProps = TPS_Complex | TPN_Complex

export type TPS = "Color" | "Img" | "Other" | "Date";
export type TPN = "PourX" | "Other" | "Date"

export type TPN_Complex = TPN_Prct | "Bool" | TPN_Date
export type TPN_Prct = "Pour1" | "Pour5" | "Pour10" | "Pour100";
export type TPN_Date = "Year/Month/Day" | "Day/Month/Year";

export type TPS_Complex = TPS_Color | TPS_Date | "Word" | TPS_Img;
export type TPS_ColorMode = "Rgb" | "Hex" | "Hsl";
export type TPS_Color = "Uniq" | "Linears" | "Coniqs" | "MixedBg";
export type TPS_Date = "Year" | "Month" | "Day" | "Hour" | "Other";
export type TPS_Img = "Blob" | "http" | "https" | "assetImg";

export const SUPPORTED_JIP = [
    "img", "http", "https", "assetImg", "number", "array", "object", "boolean", "color", "word",
    "undefined", "null"
] as const;

export type SupprtJip = typeof SUPPORTED_JIP[number];

export type AllTypeSupport = {
    word: TypeProps; color: TypeProps; img: TypeProps; number: TypeProps; array: TypeProps;
    object: TypeProps; boolean: TypeProps; undefined: TypeProps, null: TypeProps, http: TypeProps
    , https: TypeProps, assetImg: TypeProps
}

export const typeOfToJIType: AllTypeSupport = {
    assetImg: { main: "String", sub: "Img", subSub: "assetImg" },
    http: { main: "String", sub: "Img", subSub: "http" },
    https: { main: "String", sub: "Img", subSub: "https" },
    word: { main: "String", sub: "Other", subSub: "Word" },
    img: { main: "String", sub: "Img", },
    number: { main: "Number", },
    array: { main: "Array", },
    object: { main: "Object", },
    boolean: { main: "Boolean", },
    color: { main: "String", sub: "Color" },
    undefined: { main: "undefined" },
    null: { main: "null" },
}