import { Component } from "react";
import { Link } from "react-router-dom";
import { regex_Img, regexColor, regex_Img_http, regex_https, regex_Assets, regex_Boolean, regex_Number, ptF, returnImgByType } from "./Lib";
import { typeOfToJIType, MainTypeProps, SubSubTypeProps, SubTypeProps, SupprtJip, TypeProps, JipType, WebsiteStructure__, router, Menuing, MenuItem } from "./Model";
import { DropButton } from "./Package";
import { INIT_VALUES_BY_TYPE } from "./CONST";



export class BallButton extends Component<{ imgMain: string }, any>{ render() { return <section className="BallButton_Cpnt"><figure className="ball bubble" style={{ background: `url(${this.props.imgMain})` }} /></section> } }
export function convertsButton(func: (value: any) => any, assetsImgInit: string, imgType: JipType, multi: string) {
    return <DropButton
        imgMain={multi}
        jsx_Picture={
            [
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.boolean) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.number) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.word) }}><BallButton imgMain={returnImgByType(typeOfToJIType.word, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.img) }}><BallButton imgMain={returnImgByType(typeOfToJIType.img, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.object) }}><BallButton imgMain={returnImgByType(typeOfToJIType.object, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.array) }}><BallButton imgMain={returnImgByType(typeOfToJIType.array, imgType)} /></div>,
                <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.https) }}><BallButton imgMain={returnImgByType(typeOfToJIType.https, imgType)} /></div>,
                <div onClick={() => { func(INIT_VALUES_BY_TYPE.http) }}><BallButton imgMain={returnImgByType(typeOfToJIType.http, imgType)} /></div>,
                <div onClick={() => { func(assetsImgInit) }}><BallButton imgMain={returnImgByType(typeOfToJIType.assetImg, imgType)} /></div>,
            ]
        } />
}

export function toTypeByType(type: MainTypeProps, value: any, func: (value: any) => any, assetsImgInit: string, imgType: JipType) {
    return {
        Array: [
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
        ],
        Object: [
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
        ],
        Number: [
            <div onClick={() => { func(value.toString()) }}><BallButton imgMain={returnImgByType(typeOfToJIType.word, imgType)} /></div>,
            value >= 0 ? <div onClick={() => { func(value === 0 ? false : true) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean, imgType)} /></div> : <></>,

            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
        ],
        String: [
            regex_Boolean.test(value) ? <div onClick={() => { func("false" === value ? false : true) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean, imgType)} /></div> : <></>,
            regex_Number.test(value) ? < div onClick={() => { func(parseInt(value, 10)) }} > <BallButton imgMain={returnImgByType(typeOfToJIType.number, imgType)} /></div > : <></>,
            regex_Img.test(value) ? <div onClick={() => { func(INIT_VALUES_BY_TYPE.img) }}><BallButton imgMain={returnImgByType(typeOfToJIType.img, imgType)} /></div> : <></>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
            <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>,
            regex_Img_http.test(value)
                ? regex_https.test(value)
                    ? <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.https, imgType)} /></div>
                    : <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.http, imgType)} /></div>
                : regex_Assets ?
                    <div onClick={() => { func(value) }}><BallButton imgMain={returnImgByType(typeOfToJIType.assetImg, imgType)} /></div>
                    : <></>,

        ],
        null: [
            <div onClick={() => { func("null") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word, imgType)} /></div>,
            <div onClick={() => { func(false) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean, imgType)} /></div>,
            <div onClick={() => { func(0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number, imgType)} /></div>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
        ],
        undefined: [
            <div onClick={() => { func("undefined") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word, imgType)} /></div>,
            <div onClick={() => { func(false) }}><BallButton imgMain={returnImgByType(typeOfToJIType.boolean, imgType)} /></div>,
            <div onClick={() => { func(0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
        ],
        Boolean: [
            <div onClick={() => { func(value ? "true" : "false") }}><BallButton imgMain={returnImgByType(typeOfToJIType.word, imgType)} /></div>,
            <div onClick={() => { func(value ? 1 : 0) }}><BallButton imgMain={returnImgByType(typeOfToJIType.number, imgType)} /></div>,
            <div onClick={() => { func(undefined) }}><BallButton imgMain={returnImgByType(typeOfToJIType.undefined, imgType)} /></div>,
            <div onClick={() => { func(null) }}><BallButton imgMain={returnImgByType(typeOfToJIType.null, imgType)} /></div>,
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


export function strButTo(value: string, imgType: JipType) {
    let possibilities: SupprtJip = regexColor.test(value) ? "color"
        : regex_Img.test(value) ? "img"
            : regex_Boolean.test(value) ? "boolean"
                : regex_Number.test(value) ? "number" : "word";
    return <BallButton imgMain={returnImgByType(typeOfToJIType[possibilities], imgType)} />
}

export function numButTo(value: number, imgType: JipType) {
    return [
        <BallButton imgMain={imgType.word} />,
        value === 0 || value === 1 ? <BallButton imgMain={imgType.boolean} /> : undefined
    ]
}

export const boolButTo = (imgType: JipType) => {
    return [
        <BallButton imgMain={imgType.word} />,
        <BallButton imgMain={imgType.number} />
    ]
}

export function convertButByType(type: TypeProps | null, value: any, imgType: JipType): any {
    return type === null ?
        <></> : type.subSub === "Word" ? strButTo(value, imgType)
            : (type.sub === "Color" || type.sub === "Date" || type.sub === "Img") ? strButTo("Word", imgType)
                : type.main === "Number" ? numButTo(value, imgType)
                    : type.main === "Boolean" ? boolButTo : <></>
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

