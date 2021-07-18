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
