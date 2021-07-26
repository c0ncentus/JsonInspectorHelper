import { isEqual } from "lodash";
import { Component } from "react";
import { JsonFormInspect, JsonFormInspectProps } from "../../Main";
import { colorDeep } from "../../Util/CONST";
import { returnImgByType, returnType, swap, } from "../../Util/Lib";
import { toTypeByType, convertsButton } from "../../Util/Libx";
import { Array_JipProps } from "../../Util/Model";
import { Glass_, RadientNum, DropButton } from "../../Util/Package";


// t+2
// .....        ======> prvs is t+1

// t+1
// ["undefined"]  ====>  prvs is t

// current
// [undefined]


interface Swap { iBegin: null | number, iEnd: null | number }
interface Array_JipState {
    swapItemArr: Swap,
    iUpdating: number | null,
    arrNow: any[] | null,
}

export class Array_Jip extends Component<Array_JipProps, Array_JipState> {
    constructor(props: any) {
        super(props);
        this.state = {
            swapItemArr: { iBegin: null, iEnd: null },
            iUpdating: null,
            arrNow: null,
        };
    }
    updateStateArr() {
        const { inherentValue } = this.props;
        if (this.state.arrNow !== null && this.state.arrNow.length !== 0 && this.state.arrNow.length === inherentValue.length) {
            this.setState({
                iUpdating: (inherentValue as any[])
                    .map((elA, iA) => { return isEqual(elA, (this.state.arrNow as any[])[iA]) })
                    .findIndex(x => x === false)
            })
        }
        else { this.setState({ iUpdating: null }) }


        if (this.state.arrNow === null) { this.setState({ arrNow: inherentValue }) }
        else { this.setState({ arrNow: inherentValue }) }
    }
    render() {
        const { deep, onAction, extra, inherentValue, path } = this.props;
        const { swapItemArr, arrNow } = this.state;
        const propsJip = onAction("", "getJip") as JsonFormInspectProps;

        if (arrNow !== inherentValue) { this.updateStateArr() }
        return <div className="Array" style={{ borderStyle: "dotted", borderColor: colorDeep[deep], borderWidth: 3 }}>
            {typeof swapItemArr.iBegin === "number" && typeof swapItemArr.iEnd === "number" && inherentValue !== undefined
                ? <div style={{ position: "fixed", top: 0, right: 0, zIndex: 500 }}>
                    <Glass_ text="↕️" onClick={() => {
                        onAction(path, "updateValue", { onArrVal: false, updateValue: { newValue: swap(inherentValue, this.state.swapItemArr.iBegin!, this.state.swapItemArr.iEnd!) } })
                        this.setState({ swapItemArr: { iBegin: null, iEnd: null } })
                    }} />
                </div>
                : <></>}
            {inherentValue.map((itemValue: any, i: number) => {
                const type = returnType(itemValue)!;
                return <div>
                    <div style={{ display: "flex" }}>
                        <div className="minus">
                            <Glass_ text="➖" onClick={() => { onAction(path, "deleteValue", { onArrVal: true, deleteValue: { supprI: i } }) }} /></div>
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
                            ...propsJip, inherentValue: itemValue, obj_: itemValue, onValidate: ((obj) => {
                                onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: obj }, onArrVal: true })
                            }), onUpdate: (() => { }), isWithAccessory: false, isItemArray: i, isMain: false,
                            isUpdatingSecondary_Jip: i === this.state.iUpdating ? true : false
                        }} />
                        <DropButton
                            imgMain={returnImgByType(type!, extra?.IMG_INTERN!.Type)}
                            jsx_Picture={toTypeByType(
                                type!.main,
                                itemValue,
                                ((value: any) => { this.setState({}); onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: value }, onArrVal: true }) }),
                                extra.IMG_ASST!.Jpg.Bac[0], extra?.IMG_INTERN!.Type)} />
                        {convertsButton((value: any) => { onAction(path, "updateValue", { updateValue: { iUpdate: i, newValue: value }, onArrVal: true }) }, extra.IMG_ASST!.Jpg.Bac[0], extra?.IMG_INTERN!.Type, extra?.IMG_INTERN!.Extra.multi)}
                    </div>
                </div>
            })
            }
            <div style={{ textAlign: "center" }}><Glass_ text="➕ 1ier Item" onClick={() => {
                onAction(path, "addValue", { onArrVal: true })
            }} /></div>
        </div >
    }
}