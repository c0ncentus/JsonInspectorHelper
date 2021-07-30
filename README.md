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
        setting={JsonInspectSettings.training}
        IMG_ASST={this.props.IMG_ASST}
        obj_={ArgtoJson(this.state.obj)}
        isWithAccessory={true}
        onUpdate={(obj) => { this.handleObj(obj) }}
        onValidate={() => { }}
/>



// What is needed


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