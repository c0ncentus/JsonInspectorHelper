import { KeyValue } from "./Model";

export const INIT_VALUES_BY_TYPE = {
    word: "",
    color: "rgb(255,255,255)",
    img: "https://i.redd.it/q7jrzsv9ri521.png",
    https: "https://i.redd.it/q7jrzsv9ri521.png",
    http: "http://jyamg.chezsuz.com/wp-content/uploads/2013/11/JYAMG-brentrup-mandoline-011.jpg",
    number: 0,
    array: [],
    object: {},
    boolean: false,
    undefined: undefined,
    null: null,
}

export const colorDeep = ["#32be32", "#3281be", "#8b32be", "#be3232", "#e6e600", "#e69600"];
export const PANEL_VIEW_KEY = "choice"

export const PANEL_CHOICE = {
    word: {
        type: ["Mot", "Titre", "Phrase", "Descriptif", "Paragraphe", "Article"] as const,
        width: ["court", "moyen", "long"] as const
    },
    assetImg: { format: ["Square", "Phone", "Bac"] as const, type: ["Jpg", "Png", "Svg"] as const },
    key: {
        type: ["Single", "Complex", "ItemOf"] as const,
        prim: ["string", "number", "boolean"] as const,
        string: ["title", "desc", "subTitle", "item", "color", "colorRgb", "colorHex", "colorHex", "bg", "bgColor"] as const,
        number: [],
        boolean: [],
        object: [],
        array: []
    }
}

export const PAL_CNR = {
    word: {
        type: ["Tag", "Button", "Menu", "Mot", "Titre", "Phrase", "Descriptif", "Paragraphe", "Article"],
        width: ["court", "moyen", "long"]
    },
    assetImg: { format: ["Square", "Phone", "Bac"], type: ["Jpg", "Png", "Svg"] },
    key: {
        type: ["Single", "Complex", "ItemOf"],
        prim: ["string", "number", "boolean"],
        string: ["title", "desc", "subTitle", "item", "color", "colorRgb", "colorHex", "colorHex", "bg", "bgColor"],
        number: ["prct"],
        boolean: ["is"],
        object: ["title-desc-subTitle"],
        array: ["WIP"]
    }
}
export const CONST_PNLV = {
    next: "next__",
    choice: "choice__",
    custom: "______CUSTOM______"
}
export const CONDITION_PANEL_VIEW = {
    word: {
        type: PAL_CNR.word.type, next__: {
            longueur: PAL_CNR.word.width, next__: CONST_PNLV.custom
        },
    } as KeyValue,
    assetImg: {
        type: PAL_CNR.assetImg.type, next__: {
            format: PAL_CNR.assetImg.format, next__: CONST_PNLV.custom
        }
    } as KeyValue,
    key: {
        type: PAL_CNR.key.type,
        next__: {
            Primitif: PAL_CNR.key.prim,
            Object: PAL_CNR.key.object,
            Tableau: PAL_CNR.key.array,
            choice__: [
                { Mot: PAL_CNR.key.string, Nombre: PAL_CNR.key.number, Boolean: PAL_CNR.key.boolean },
                CONST_PNLV.custom,
                CONST_PNLV.custom
            ],

        }
    } as KeyValue,
}

const key = {
    Single:{
        string:{}, number:{}, boolean:{}
    },
    Complex:{},
    itemOfArray:{}
}