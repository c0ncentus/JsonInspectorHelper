# For What ?

Techno : ReactJs v17
Modify :

- Keys
- Values like 
    - colors (rgb, hex, hsl) support
    - string
    - image Assets on Png, Jpg (not svg) with different format and also http(s)
    - Numbers (not already /100; /5; /10)
    - Boolean
    - Array (nested)
    - Object (nested)
    - not already Audio content ...

(Create / delete / update) depends on permission you assign.

# Get stated
``` Javascript
 <JsonFormInspect
        //  1
        isWithAccessory= {true} isItemArray= {false} isMain= {true} isUpdatingSecondary_Jip= {true} onUpdate= {(() => { })} 
        // 2 
        setting={BasicCrud}
        IMG_ASST={this.props.IMG_ASST}
        obj_={ArgtoJson(this.state.obj)}
        isWithAccessory={true}
        onUpdate={(obj) => { this.handleObj(obj) }}
        onValidate={() => { }}
/>



// What is needed
// Copy past 1 (params no very "usefull" but required)
// All 2 is custom params
//                  =>you must copy this Setting 
const BasicCrud = {
        autoFillDangerous: false,
        NEW: true,
        ONLY_READ: false,
        UPDATE_EXIST: { keys: true, value: true },
        UPDATE_NEW: { keys: true, value: true }
    };

//                  => for Asset you must respect this scheme
export interface JipAssets { JsonForm: JsonForm, Type: JipType, Extra: ExtraImg }

//next to key input and next to value input
export interface JsonForm { key: string, value: string }

// all type supported link to a picture
export interface JipType {
    assetImg: string, http: string, https: string, img: string, blob: string, color: string,
    array: string, object: string,
    number: string, boolean: string, word: string, date: string,
    undefined: string, null: string
}

export interface CustomPicture { 
    Png: ImgItem; 
    Jpg: ImgItem; 
    Svg?: any,  // SVG is not supported Yet
}
interface ImgItem {
    Square: string[],
    Phone: string[],
    Bac: string[],
    Small?: string[],
    Other?: string[]
}


export interface JsonForm { key: string, value: string }
export interface ExtraImg {
    multi: string, inputHttp: string, AscString: string, DescString: string, AscNum: string,
    DescNum: string, logoHttp: string, logoHttps: string
}

```

# Drawbacks:

## Priority Lvl 1
- Valid always is show for Array input always => Expected : when Array input is the same ; dont't show the button
- there is no notification about if it's changes correctly.=> Expected trigger notification about update, add, remove - notification about verificaation if changes is apply.
- On Array when content is filled and you will change; you cannot on UI, => expected : you can (no changes the props because the props is not "re-hydrated")
- lot of legacy code and too complex code (algo) => Expected Only the code is usefull is here and maybe Unit Test (none)


## Priority Lvl 2
- Setting
- more advanced seeting on bubble on what kind of type/subType is authorized or not
- ability to copy the json
- ability to moove to text=>JIP or JIP=>text

## Priority Lvl 3
- load JSON on the project
- possibility to not have ImgAssets and TextIndustrialized
- rework all "// 1" params because if not the same value will affect the component and maybe some effect will not work att all or not needed
- support SVG
-  adding more detail on ui if JPG or PNG or SVG and if format "Square", "Phone" or "Bac" ; same with  word(key) and word(value)