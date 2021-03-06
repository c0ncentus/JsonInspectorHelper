import { INIT_VALUES_BY_TYPE } from "../../Util/CONST";
const allPrim = {
    str: "A monkey with a stick",
    num: 3,
    null: null,
    undefined: undefined,
    bool: true
}
export const objJipDemo = {
    basicStr: "wwwwwoooooosh", basicBool: true, basicNum: 3, basicNull: null, bascUndefined: undefined,
    basicArr: [], basicObj: { str: "A monkey with a stick" },
    allPrimitive: allPrim,
    allObj: {
        o0: {}, t0: [null],
        // o0D: { data: "" },
        //  T0D: ["Prems","Deus"],
        // o1: { gg: {} }, T1: [["Tab 1"], "Tab 2"],
        // o1D, t1D
        // o2o1: { gg: { gg: {} } }, o2t1: { gg }, t2o1: { gg: {} }, t2t1: [["Tab 1"], "Tab 2"],
    },
    allVerification: {
        //Prim
        ...allPrim,

        colorRgb: "rgb(255,255,90)",
        colorHsl: "hsl(100,20%,20%)",
        colorHexMaj: "#FFFFFF",
        colorHexMin: "#ffffff",
        https: INIT_VALUES_BY_TYPE.https,
        http: INIT_VALUES_BY_TYPE.http,
        obj: {},
        objTab: { aTab: [] },
    }
}