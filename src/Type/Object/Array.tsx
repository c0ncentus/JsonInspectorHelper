import { Component } from "react";
import { JsonFormInspect, JsonFormInspectProps } from "../../Main";
import { colorDeep } from "../../Util/CONST";
import { buildIIA, newIIA, returnImgByType, returnType, swap, } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { Array_JipProps, FormGetJip } from "../../Util/Model";
import { Glass_, RadientNum, DropButton } from "../../Util/Package";


export class Array_Jip extends Component<Array_JipProps, { swapItemArr: { iBegin: null | number, iEnd: null | number } }>{
    constructor(props: any) { super(props); this.state = { swapItemArr: { iBegin: null, iEnd: null } }; }

    render() {
        const { deep, onAction, extra, setting, inherentValue, isItemArray, path } = this.props;
        const { swapItemArr } = this.state;
        const propsJip = onAction("", "getJip") as JsonFormInspectProps;

        return <div className="Array" style={{ borderStyle: "dotted", borderColor: colorDeep[deep], borderWidth: 3 }}>
            {typeof swapItemArr.iBegin === "number" && typeof swapItemArr.iEnd === "number" && inherentValue !== undefined
                ? <div style={{ position: "fixed", top: 0, right: 0, zIndex: 500 }}>
                    <Glass_ text="↕️" onClick={() => {
                        this.setState({ swapItemArr: { iBegin: null, iEnd: null } })
                    }} />
                </div>
                : <></>}
            {inherentValue.map((itemValue: any, i: number) => {
                const type = returnType(itemValue);
                return <div>
                    <div style={{ display: "flex" }}>
                        <div className="minus">
                            <Glass_ text="➖" onClick={() => { onAction(path, "deleteValue", { onArrVal: true, }) }} /></div>
                        <div style={{ position: "relative", width: 44, margin: 5, marginRight: 10 }}>
                            <p className="linkInSwapBut">
                                {swapItemArr.iBegin === i
                                    ? "🪂"
                                    : swapItemArr.iEnd === i
                                        ? "🎯"
                                        : "🖱️"}
                            </p>
                            <div style={{ cursor: "pointer", position: "absolute", top: 0, left: 0 }} onClick={() => {
                                if (this.state.swapItemArr.iBegin === null) {
                                    this.setState({ swapItemArr: { iBegin: swapItemArr.iBegin === i ? null : i, iEnd: this.state.swapItemArr.iEnd } })
                                }
                                if (typeof this.state.swapItemArr.iBegin === "number" && this.state.swapItemArr.iEnd === null) {
                                    this.setState({ swapItemArr: { iBegin: swapItemArr.iBegin, iEnd: swapItemArr.iBegin === i ? null : i } })
                                }
                                if (typeof this.state.swapItemArr.iBegin === "number" && typeof this.state.swapItemArr.iEnd === "number") {
                                    this.setState({ swapItemArr: { iBegin: null, iEnd: null } })
                                }
                            }
                            }>
                                <RadientNum txt={i.toString()} />
                            </div>
                        </div>
                        <JsonFormInspect {...{
                            ...propsJip, obj_: itemValue, onValidate: ((obj) => {
                                onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: obj }, onArrVal: true })
                            }), onUpdate: (() => { }), isWithAccessory: false, isItemArray: i
                        }} />
                        <DropButton
                            imgMain={returnImgByType(type!, extra?.IMG_INTERN!.Type)}
                            jsx_Picture={toTypeByType(type!.main, itemValue, ((value: any) => { onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: value }, onArrVal: true }) }), extra.IMG_ASST!.Jpg.Bac[0], extra?.IMG_INTERN!.Type)} />
                        {convertsButton((value: any) => { onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: value }, onArrVal: true }) }, extra.IMG_ASST!.Jpg.Bac[0], extra?.IMG_INTERN!.Type, extra?.IMG_INTERN!.Extra.multi)}
                    </div>
                </div>
            })
            }
            <div style={{ textAlign: "center" }}><Glass_ text="➕ 1ier Item" onClick={() => {
                onAction(path, "updateValue", { updateValue: { newValue: [...inherentValue, undefined] }, onArrVal: false }) 
            }} /></div>
        </div >
    }
}