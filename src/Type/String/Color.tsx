import { Component } from "react";
import { SketchPicker } from "react-color";
import { inHlForm, Value_JipState } from "..";
import { INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import {  regex_Rgb, regex_Hex, regex_Hsl, rgbToHex, strToRgb, rgbToHsl, hslToHex, strToHsl, hslToRgb, hexToRGB, hexToHsl } from "../../Util/Lib";
import { FormGetJip, TPS_ColorMode } from "../../Util/Model";
import { DropDownSquish } from "../../Util/Package";

export class Color_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", colorMode: null }
    }
    componentDidMount() {
        const { inherentValue } = this.props;
        const realValue = inherentValue;
        const colorMode = regex_Rgb.test(realValue) ? "Rgb" : regex_Hex.test(realValue) ? "Hex" : regex_Hsl.test(realValue) ? "Hsl" : "None"
        if (colorMode === "None") { this.setState({ value: INIT_VALUES_BY_TYPE.color, colorMode: "Rgb" }) }
        else { this.setState({ value: realValue, colorMode }) }

    }
    render() {
        const { handleValue, extra, isItemArray } = this.props;

        return <div >{/*className="SmalPick"*/}
            <SketchPicker color={this.state.value} onChange={(e: any) => {
                const hsl = e.hsl;
                const rgb = e.rgb;
                const value = this.state.value;
                let colorValueSend: string = "";
                if (/^#/gm.test(value) || extra!.colorMode! === "Hex") { colorValueSend = e.hex }
                if (/rgb/gm.test(value) || extra!.colorMode! === "Rgb") { colorValueSend = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }
                if (/hsl/gm.test(value) === true || extra!.colorMode! === "Hsl") { colorValueSend = `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)` }
                this.setState({ value: colorValueSend });
                inHlForm(handleValue, colorValueSend, isItemArray)
            }} />
            <DropDownSquish choices={["Rgb", "Hsl", "Hex"]} onChange_={(color: string) => {
                if (this.state.colorMode === color) { }
                else {
                    let value = this.state.value;
                    if (color === "Hex" && this.state.colorMode === "Rgb") { value = rgbToHex(...strToRgb(value)) }
                    if (color === "Hsl" && this.state.colorMode === "Rgb") { value = rgbToHsl(...strToRgb(value)) }

                    if (color === "Hex" && this.state.colorMode === "Hsl") { value = hslToHex(...strToHsl(value)) }
                    if (color === "Rgb" && this.state.colorMode === "Hsl") { value = hslToRgb(...strToHsl(value)) }

                    if (color === "Rgb" && this.state.colorMode === "Hex") { value = hexToRGB(value) }
                    if (color === "Hsl" && this.state.colorMode === "Hex") { value = hexToHsl(value) }
                    this.setState({ value, colorMode: color as TPS_ColorMode })
                }
            }} />
        </div>
    }
}


