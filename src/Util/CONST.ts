import { arrayByKey, arrayByNum } from "./Lib";
import { CustomPicture, KeyValue, TextObj } from "./Model";

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
export const CONDITION_PANEL_VIEW = (customPic: CustomPicture, txtI:TextObj) => {
    return {
        word: {
            type: PAL_CNR.word.type, choice__: [
                { Tag: PAL_CNR.word.width, choice__: [txtI.Tag.court, txtI.Tag.moyen, txtI.Tag.long] },
                { Button: PAL_CNR.word.width, choice__: [txtI.Button.court, txtI.Button.moyen, txtI.Button.long] },
                { Menu: PAL_CNR.word.width, choice__: [txtI.Menu.court, txtI.Menu.moyen, txtI.Menu.long] },
                { Mot: PAL_CNR.word.width, choice__: [txtI.Mot.court, txtI.Mot.moyen, txtI.Mot.long] },
                { Titre: PAL_CNR.word.width, choice__: [txtI.Titre.court, txtI.Titre.moyen, txtI.Titre.long] },
                { Phrase: PAL_CNR.word.width, choice__: [txtI.Phrase.court, txtI.Phrase.moyen, txtI.Phrase.long] },
                { Descriptif: PAL_CNR.word.width, choice__: [txtI.Descriptif.court, txtI.Descriptif.moyen, txtI.Descriptif.long] },
                { Paragraphe: PAL_CNR.word.width, choice__: [txtI.Paragraphe.court, txtI.Paragraphe.moyen, txtI.Paragraphe.long] },
                { Article: PAL_CNR.word.width, choice__: [txtI.Article.court, txtI.Article.moyen, txtI.Article.long] },

            ],
        } as KeyValue,
        assetImg: BUILD_PANEL_VIEW_IMG(customPic) as KeyValue,
        key: {
            type: PAL_CNR.key.type,
            next__: {
                Primitif: PAL_CNR.key.prim,
                Object: PAL_CNR.key.object,
                Tableau: PAL_CNR.key.array,
                choice__: [
                    { Mot: { next__: PAL_CNR.key.string }, Nombre: PAL_CNR.key.number, Boolean: PAL_CNR.key.boolean },
                    ["WIP"],
                    ["WIP"]
                ],

            }
        } as KeyValue,
    }
}

export const BUILD_PANEL_VIEW_IMG = (customImg: CustomPicture) => {
    const { Jpg, Png } = customImg;
    return {
        type: PAL_CNR.assetImg.type, choice__: [
            {
                format: PAL_CNR.assetImg.format, choice__: [
                    arrayByKey(Jpg.Square), arrayByKey(Jpg.Phone), arrayByKey(Jpg.Bac)
                ]
            },
            {
                format: PAL_CNR.assetImg.format, choice__: [
                    arrayByKey(Png.Square), arrayByKey(Png.Phone), arrayByKey(Png.Bac)
                ]
            },

            { format: PAL_CNR.assetImg.format, choice__: ["0", "0", "0"] }
        ]
    }
}

export const keyTemplate = {
    Single: { string: PAL_CNR.key.string, number: PAL_CNR.key.number, boolean: PAL_CNR.key.boolean },
    Complex: PAL_CNR.key.object,
    ItemOf: PAL_CNR.key.array
}

export const creteriaImgAsst = [
    { key: "__src__", isRequired: false },
    { key: "__Type__", isRequired: true },
    { key: "__Format__", isRequired: false },
    { key: "__isRdm__", isRequired: false },
    { key: "__i__", isRequired: false },
]

export const creteriaComponentTrsf = [
    { key: "CpntName__", isRequired: true },
    { key: "props", isRequired: false },
]


export const creteriaComponent = [
    { key: "$$type$$", isRequired: true },
    { key: "props", isRequired: false },
]