import { CustomPicture, JipAssets, KeyValue } from "../Util/Model";

function assign(obj: { [x: string]: any; }, keyPath: string[], value: any) {
    const lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
        const key = keyPath[i];
        if (!(key in obj)) {
            obj[key] = {}
        }
        obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
}

export function importFolder(r: any, isImgArray: boolean = true, isDeep: boolean = false, replace: RegExp[] = []): any[] | KeyValue {
    let images: KeyValue = {};
    let img: any[] = [];
    let res: any;
    if (isImgArray) { return Object(r).keys().map((item: string) => { img.push(r(item)); return img }); }
    else {
        res = Object(r).keys().map((item: string) => {
            let str = item.replace(/\.(png|jpe?g|svg|webp|gif|txt)$/, "")
            replace.forEach((rgx) => { str = str.replace(rgx, ""); })
            str = str.replace('./', '');
            if (/.+\/.+/.test(str) && isDeep) { const splitStr = str.split("/"); assign(images, splitStr, r(item).default) }
            else { images[str] = r(item); }
            return images;
        });
        // have 56 object ????
        return res[0] as KeyValue
    }
}


export const IMG_ASST = importFolder(require.context("./Assets/Custom", true), false, true) as CustomPicture;
export const IMG_INTERN = importFolder(require.context("./Assets/Jip", true), false, true) as JipAssets