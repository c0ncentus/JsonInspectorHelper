import { PANEL_CHOICE } from "./CONST";

export interface JipType {
    assetImg: string, http: string, https: string, img: string, blob: string, color: string,
    array: string, object: string,
    number: string,
    boolean: string,
    word: string, date: string,
    undefined: string, null: string
}
export type Letter = ("A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z");

type TextObjItem = { court: string[], moyen: string[], long: string[] }
export interface TextObj {
    Tag: TextObjItem;
    Button: TextObjItem;
    Menu: TextObjItem;
    Mot: TextObjItem;
    Titre: TextObjItem;
    Phrase: TextObjItem;
    Descriptif: TextObjItem;
    Paragraphe: TextObjItem;
    Article: TextObjItem;
}
export type ChoiceCPV = KeyValue;

export type WordTypePanel = typeof PANEL_CHOICE.word.type[number];
export type WordWidthPanel = typeof PANEL_CHOICE.word.width[number];
export type KeyTypePanel = typeof PANEL_CHOICE.key.type[number];
export type KeyPrimPanel = typeof PANEL_CHOICE.key.prim[number];
export type KeyStringPanel = typeof PANEL_CHOICE.key.string[number];
export type KeyNumberPanel = typeof PANEL_CHOICE.key.number[number];
export type KeyBooleanPanel = typeof PANEL_CHOICE.key.boolean[number];
export type KeyArrayPanel = typeof PANEL_CHOICE.key.array[number];
export type KeyObjectPanel = typeof PANEL_CHOICE.key.object[number];
export type AsstImgTypePanel = typeof PANEL_CHOICE.assetImg.type[number];
export type AsstImgFormatPanel = typeof PANEL_CHOICE.assetImg.format[number];


export type SupprtJip = typeof SUPPORTED_JIP[number];

export type AllTypeSupport = {
    word: TypeProps; color: TypeProps; img: TypeProps; number: TypeProps; array: TypeProps;
    object: TypeProps; boolean: TypeProps; undefined: TypeProps, null: TypeProps, http: TypeProps
    , https: TypeProps, assetImg: TypeProps
}


export interface JsonForm { key: string, value: string }
export interface ExtraImg {
    multi: string, inputHttp: string, AscString: string, DescString: string, AscNum: string,
    DescNum: string, logoHttp: string, logoHttps: string
}

export type KeyValue = { [key: string]: any; };

export type JsonTypePref = "string" | "img" | "color" | "number" | "boolean" | "object"

export interface JipAssets { JsonForm: JsonForm, Type: JipType, Extra: ExtraImg }

interface ImgItem {
    Square: string[],
    Phone: string[],
    Bac: string[],
    Small?: string[],
    Other?: string[]
}

export interface CustomPicture { Png: ImgItem; Jpg: ImgItem; Svg?: any, }

export interface BehaviorParent { menu?: JSX.Element; }

export class WebsiteStructure {
    function_?: (...arg: string[]) => JSX.Element;
    cpnt: JSX.Element; title: string;
    cpntBehavior?: BehaviorParent;
    items?: WebsiteStructure[]; customParam?: string[]
    constructor(obj: any) {
        this.customParam = obj.customParam; this.cpntBehavior = obj.cpntBehavior;
        this.cpnt = obj.cpnt; this.title = obj.title; this.items = obj.items;
        this.function_ = obj.function;
    }
};
export class WebsiteStructure__ {
    function_?: (...arg: string[]) => JSX.Element; cpnt: JSX.Element; title: string; cpntBehavior?: BehaviorParent; items?: WebsiteStructure__[]; customParam?: string[]
    constructor(obj: any) {
        this.customParam = obj.customParam; this.cpnt = obj.cpnt; this.title = obj.title; this.items = obj.items; this.cpntBehavior = obj.cpntBehavior; this.function_ = obj.function;
    }
};

type RouterItem = { name: string; path: string[]; component: JSX.Element; customParam?: string[]; function_?: (...arg: string[]) => JSX.Element; };
export type router = RouterItem[];


export interface MenuItem { title: string; cpntBehavior?: JSX.Element; specialLink?: string }

export interface Menuing { title: string; specialLink: string; items: MenuItem[]; }

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
    IMG_ASST?: CustomPicture,
    IMG_INTERN?: JipAssets,
    TextTemplate?: TextObj
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