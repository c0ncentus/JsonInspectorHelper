// import { JsonFormInspect } from "../Main"
import { JsonFormInspect } from "../Main"
import { demoTextIndu } from "./Assets/Text"
import { IMG_ASST, IMG_INTERN } from "./ImportImage"
import { objJipDemo } from "./Settings/ObjDemo"
import { permission } from "./Settings/Permissions"
export const demoJip = <JsonFormInspect {...{
    isWithAccessory: true, isItemArray: false, isMain: true, isUpdatingSecondary_Jip: true,    onUpdate: (() => { }), // not available
    setting: permission.BasicCrud,
    obj_: objJipDemo.allPrimitive,
    onValidate: ((obj) => { console.log(obj) }),
    IMG_ASST, IMG_INTERN, TextTemplate: demoTextIndu,
}}
/>