import { Component } from "react";
interface JipType {
    assetImg: string;
    http: string;
    https: string;
    img: string;
    blob: string;
    color: string;
    array: string;
    object: string;
    number: string;
    boolean: string;
    word: string;
    date: string;
    undefined: string;
    null: string;
}
declare type TextObjItem = {
    court: string[];
    moyen: string[];
    long: string[];
};
interface TextObj {
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
interface JsonForm {
    key: string;
    value: string;
}
interface ExtraImg {
    multi: string;
    inputHttp: string;
    AscString: string;
    DescString: string;
    AscNum: string;
    DescNum: string;
    logoHttp: string;
    logoHttps: string;
}
interface JipAssets {
    JsonForm: JsonForm;
    Type: JipType;
    Extra: ExtraImg;
}
interface ImgItem {
    Square: string[];
    Phone: string[];
    Bac: string[];
    Small?: string[];
    Other?: string[];
}
interface CustomPicture {
    Png: ImgItem;
    Jpg: ImgItem;
    Svg?: any;
}
declare type ActionFunc = "getJip" | "getStateObj" | "addValue" | "deleteValue" | "updateValue" | "getObjByPath" | "onValidate" | "setPanel" | "getValS";
interface ExtraFormJip {
    inputKeys?: string;
    colorMode?: TPS_ColorMode | null;
    onArrVal?: boolean;
    addValue?: {
        newKey?: string;
        newValue?: string;
    };
    updateValue?: {
        newKey?: string;
        newValue?: any;
        iUpdate?: number;
    };
    deleteValue?: {
        supprKey?: string;
        suprrValue?: any;
        supprI?: number;
        isSuprAllSameValue?: boolean;
    };
    IMG_ASST?: CustomPicture;
    IMG_INTERN?: JipAssets;
    TextTemplate?: TextObj;
}
declare type ItemArray = number | false;
interface JIPSetting {
    autoFillDangerous: boolean;
    NEW: boolean;
    ONLY_READ: boolean;
    UPDATE_EXIST: {
        keys: boolean;
        value: boolean;
    };
    UPDATE_NEW: {
        keys: boolean;
        value: boolean;
    };
}
declare type TPS_ColorMode = "Rgb" | "Hex" | "Hsl";
interface JsonFormInspectState {
    isUpToDate: boolean;
    objUpdate: any;
    objSave: any;
    inputKeys: string;
    valuePathChange: string | null;
    isLoad: boolean;
}
export interface JsonFormInspectProps {
    obj_: any;
    setting: JIPSetting;
    onValidate: (obj_: any) => any;
    onUpdate: (obj: any) => any;
    isWithAccessory: boolean;
    isItemArray: ItemArray;
    IMG_ASST: CustomPicture;
    IMG_INTERN: JipAssets;
    TextTemplate: TextObj;
    isMain: boolean;
    inherentValue?: any;
    isUpdatingSecondary_Jip: boolean;
}
export declare class JsonFormInspect extends Component<JsonFormInspectProps, JsonFormInspectState> {
    constructor(props: any);
    reboot(): void;
    onAction(path: string, action: ActionFunc, extra?: ExtraFormJip): any;
    componentDidMount(): void;
    getMaxLocalStorage(): number;
    downloadTemplateSave(): void;
    uploadTemplateSave(): void;
    render(): JSX.Element;
}
export {};
