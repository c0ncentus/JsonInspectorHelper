// import { JsonFormInspect } from "../Main"
import { JsonFormInspect } from "../Main"
import { demoTextIndu } from "./Assets/Text"
import { IMG_ASST, IMG_INTERN } from "./ImportImage"
import { objJipDemo } from "./Settings/ObjDemo"
import { permission } from "./Settings/Permissions"
export const demoJip = <JsonFormInspect {...{
    IMG_ASST, IMG_INTERN, TextTemplate: demoTextIndu,
    isWithAccessory: true,
    setting: permission.BasicCrud,
    obj_: objJipDemo.allPrimitive,
    onUpdate: (() => { }), // not available
    onValidate: ((obj) => { console.log(obj) }),
    isItemArray: false, isMain: true, isUpdatingSecondary_Jip: true
}}
/>