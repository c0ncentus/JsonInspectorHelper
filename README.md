# Definition
JIP = JsonInspectorHelper

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
        IMG_INTERN={imgJip}
        IMG_ASST={themeRed}
        TextTemplate= {textIndu}
        obj_={ArgtoJson(this.state.obj)}
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

//                  => const imgJip: JipAssets; for Asset you must respect this scheme
export interface JipAssets { JsonForm: JsonForm, Type: JipType, Extra: ExtraImg }

//                              next to key input and next to value input
export interface JsonForm { key: string, value: string }

//                              all type supported link to a picture
export interface JipType {
    assetImg: string, http: string, https: string, img: string, blob: string, color: string,
    array: string, object: string,
    number: string, boolean: string, word: string, date: string,
    undefined: string, null: string
}
//                              for taping on bubble or other
export interface ExtraImg {
    multi: string, // changing type with init default value 
    inputHttp: string, logoHttps: string, logoHttp: string // on inputHttp
    AscString: string, DescString: string, AscNum: string, DescNum: string,  // not support yet on array of string or Number
}

//                  => obj const themeRed:CustomPicture={...} THE most important custom features in JIP
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


//                    => const textIndu: TextObj
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
//                    => obj_ is a JSON Object or value; do not support yet TSX
    const obj= {specific:"Custom"}

//                    => onValidate when taping "VALIDER" do something ...

```

# Drawbacks:

## Depends on github community
- translate on english 
- tanslate on german - italian- spanish - japan - chinese - latin (because of fun)

## Priority Lvl 1
- |UI, WISIG| Valid always is show for Array input always => Expected : when Array input is the same ; dont't show the button
- |UI, WISIG| there is no notification about if it's changes correctly.=> Expected trigger notification about update, add, remove - notification about verificaation if changes is apply.
- |BUG, UI| On Array when content is filled and you will change; you cannot on UI, => expected : you can (no changes the props because the props is not "re-hydrated")
- |BUG, QUALITY| lot of legacy code and too complex code (algo) => Expected Only the code is usefull is here and maybe Unit Test (none)

- |FEATURE| Duplicate object, Array thanks to key input or in a array (objWay or ArrayWay)

- |UI, BUG| fix margin on bubbles ...

- |FEATURE|  ability to moove to text=>JIP or JIP=>text


ENDING V1

## Priority Lvl 2
- Setting
- more advanced seeting on bubble on what kind of type/subType is authorized or not
- ability to copy the json
- support TSX Class Component and maybe Components
ENDING V2

## Priority Lvl 3
- load JSON on the project
- possibility to not have ImgAssets and TextIndustrialized
- rework all "// 1" params because if not the same value will affect the component and maybe some effect will not work att all or not needed



- Update a lot of content
    => SVG (photo,bac, square)
    => GIF (photo,bac, square) 
    => OTHER_IMG
    - fa icon => SVG only [10px ; 200px ]
    - Mask (photo,bac, square) => PNG only
    - SeparatorLine (longSmall) => PNG or SVG only
    - BorderCorner (square) => PNG or SVG only
    - Close (square) => PNG or SVG only
    - Add (square) => PNG or SVG only
    
    => audio files (~[ 1s ; 10s ] ; ~[ 40s ; 1min10s ] ; ~[ 2min40s ; 3min 40 ] ; ~[ 15min ; 22min ])
    

ENDING V3

## Proirity Lvl 4
-  adding more detail on ui if JPG or PNG or SVG and if format "Square", "Phone" or "Bac" ; same with  word(key) and word(value)
- adding content for sorting array of string and array of number && adding some settings


ENDING V4

## PRIORITY LVL 5

- manage Localstorage (or maybe with extern lib)
- adding some support for custom audio with http ressources 
- adding all images support via http or internly with redux or other system 