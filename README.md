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
``` TypeScript
 <JsonFormInspect
        setting={JsonInspectSettings.training}
        IMG_ASST={this.props.IMG_ASST}
        obj_={ArgtoJson(this.state.obj)}
        isWithAccessory={true}
        onUpdate={(obj) => { this.handleObj(obj) }}
        onValidate={() => { }}
/>
```

# Drawbacks:
- Valid always is show for Array input => when Array input is the same ; dont't show the button
- there is no notification about if it's changes correctly. so notification about what it's trigger and if the object is what expect is needed.
- On Array content is fill it will no changes the props bacause the props is not "re-hydrated"
- lot of legacy code and too complex code (algo)
