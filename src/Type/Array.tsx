import { min, max } from "lodash";
import { type } from "os";
import { Component } from "react";
import { SketchPicker } from "react-color";
import { render } from "react-dom";
import { INIT_VALUES_BY_TYPE } from "../CONST";
import { initValues, inHlForm, regex_Img_http, regex_https, regex_BaseUrlHttp, regex_Assets, regex_Rgb, regex_Hex, regex_Hsl, rgbToHex, strToRgb, rgbToHsl, hslToHex, strToHsl, hslToRgb, hexToRGB, hexToHsl } from "../Lib";
import { TPS_ColorMode, FormGetJip } from "../Model";
import { DropDownSquish } from "../Package";



interface Value_JipState {
    value: any, firstChange?: string,
    colorMode?: TPS_ColorMode | null,
    isHttps?: boolean | null;
    imgFormat?: "Phone" | "Bac" | "Square" | null,
    imgType?: "Jpg" | "Png" | "Svg" | null,
    imgOtherType?: null | string,
    iImg?: number | null,
    isImgRdm?: boolean,
    baseUrl?: string | null,
}



export class Word_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) { super(props); this.state = { value: "", firstChange: "" } }
    componentDidMount() {
        const { inherentValue, isItemArray, isKeys } = this.props;
        this.setState({ value: initValues(inherentValue, isItemArray, isKeys) });
    }
    form() {
        const { permission, isKeys, handleValue, isItemArray } = this.props;
        return ((isKeys && permission.key) || (permission.value && isKeys === false))
            ? <p>{this.state.value}</p>
            : <input
                style={{ ...cssStyleInput, margin: 5, width: 50 }}
                onChange={(e) => {
                    const value = e.currentTarget.value; this.setState({ value });
                    inHlForm(handleValue, isKeys ? undefined : this.state.value, isItemArray,
                        isKeys ? this.state.value : undefined, isKeys)
                }}
                value={this.state.value}
            />
    }
    render() {
        const { isKeys, isItemArray, initValue } = this.props;
        if (this.state.firstChange !== initValue) { this.setState({ firstChange: initValue, value: initValue }) }
        return typeof isItemArray === "number"
            ? this.form()
            : <div style={{ position: "relative", marginTop: 20, marginRight: isKeys === false ? 10 : 0 }}>
                {isKeys
                    ? <div style={{ display: "flex" }}>
                        <img style={{ height: 20, width: 20 }} src={JsonForm.key} />
                        <p>Clef</p>
                    </div>
                    : <div style={{ display: "flex" }}>
                        <img style={{ height: 20, width: 20 }} src={JsonForm.value} />
                        <p>Valeur</p>
                    </div>}

                {this.form()}
            </div>
    }
}

export class ImgHttpOrS extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) { super(props); this.state = { value: "", } }
    componentDidMount() {
        const { inherentValue, isItemArray, extra } = this.props;
        const initValue = initValues(inherentValue, isItemArray);

        const realValue = regex_Img_http.test(initValue)
            ? initValue
            : INIT_VALUES_BY_TYPE.https

        const isHttps = regex_https.test(realValue);
        const baseUrl = realValue.match(regex_BaseUrlHttp)![0]!.replace(regex_Img_http, "");
        this.setState({ value: realValue.replace(baseUrl, "").replace(regex_Img_http, ""), baseUrl, isHttps })
    }
    builtHttp() {
        return `http${this.state.isHttps ? "s" : ""}://${this.state.baseUrl}${this.state.value}`;
    }
    render() {
        const { handleValue, } = this.props;
        return <div className="Http_s" style={{ position: "relative", width: 375, height: 200 }}>
            <InputHttp {...{ color: "", isS: this.state.isHttps!, words: { desc: this.state.value!, title: this.state.baseUrl! } }} />
        </div>
    }
}


export class AssetImg_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", imgFormat: null, imgType: null, iImg: null, isImgRdm: false }
    }
    componentDidMount() {
        const { inherentValue, isItemArray, extra } = this.props;

        const realValue = initValues(inherentValue, isItemArray, false);

        this.setState({
            value: regex_Assets.test(realValue) ? realValue : extra?.Img_ASSET?.Jpg.Bac[0],
            iImg: null, imgFormat: null, imgOtherType: null, imgType: null, isImgRdm: false,
        })

    }
    render() {
        const { extra, handleValue } = this.props;
        if (extra === undefined || extra.Img_ASSET === undefined) { return <></> }
        else {
            const { Png, Jpg, Svg } = extra!.Img_ASSET;
            let Cpnt = <></>;
            const displayI = extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && (this.state.iImg !== null || this.state.isImgRdm === true)
            if (displayI) {
                let max = {
                    Png: { Square: Object.keys(Png.Square).length, Bac: Object.keys(Png.Bac).length, Phone: Object.keys(Png.Phone).length },
                    Jpg: { Square: Object.keys(Jpg.Square).length, Bac: Object.keys(Jpg.Bac).length, Phone: Object.keys(Jpg.Phone).length },
                    Svg: { Square: 0, Bac: 0, Phone: 0 }
                }[this.state.imgType!][this.state.imgFormat!];
                const rdm = Math.trunc(Math.random() * max)
                const iPic = this.state.isImgRdm ? rdm : this.state.iImg! < max ? this.state.iImg! : 0
                const src = extra.Img_ASSET[this.state.imgType!][this.state.imgFormat!][iPic];
                Cpnt = <img src={src} style={{ border: "2px red dotted", width: 100, height: 100 }} />
            }

            return <div className="AssetImg" style={{ marginLeft: 20 }}>
                <div style={{ position: "relative" }}><p style={{ position: "absolute", top: 0, left: -34, zIndex: -1 }}>Est Random</p><input type="checkbox" onChange={(e) => {
                    const check = e.currentTarget.checked;
                    this.setState({ isImgRdm: e.currentTarget.checked })
                    if (check === false) { this.setState({ iImg: null }) }
                }} checked={this.state.isImgRdm!} /></div>
                {Cpnt}
                <DropDownSquish choices={["Jpg", "Png", /*"Svg"*/]} onChange_={(type: string) => { this.setState({ imgType: type as "Jpg" | "Png" | "Svg" }) }} />
                <DropDownSquish choices={["Bac", "Phone", "Square"]} onChange_={(type: string) => { this.setState({ imgFormat: type as "Bac" | "Phone" | "Square" }) }} />
                {extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && this.state.isImgRdm !== true ? <DropDownSquish choices={Array.from(new Array(4)).map((e, i) => { if (e) { }; return i.toString() })} onChange_={(iStr: string) => { this.setState({ iImg: parseInt(iStr, 10) }) }} /> : <></>}

            </div>
        }
    }
}


export class Color_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", colorMode: null }
    }
    componentDidMount() {
        const { inherentValue, isItemArray } = this.props;
        const realValue = initValues(inherentValue, isItemArray, false);
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

export class Number_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: 0 }
    }

    componentDidMount() {
        const { inherentValue, isItemArray } = this.props;
        const realValue = initValues(inherentValue, isItemArray, false);
        this.setState({ value: realValue });
    }
    form() {
        const { handleValue, isItemArray } = this.props
        return <input onChange={(e) => {
            const val = e.currentTarget.value;
            const value = parseInt((typeof val !== "string" || /^\d+$/gsi.test(val) === false) ? "0" : val, 10);
            this.setState({ value });
            inHlForm(handleValue, value, isItemArray)
        }}
            type="range" min={0} max={100} step={1} value={`${this.state.value}`} style={{ width: 50 }} />
    }
    render() {
        const { permission, isItemArray } = this.props
        return typeof isItemArray === "number"
            ? this.form()
            : <div style={{ marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, width: "100%" }}>
                    <img style={{ height: 20, width: 20 }} src={JsonForm.value} />
                    <p>Valeur</p>
                </div>
                {permission.value === false
                    ? <div style={{ display: "grid" }}>
                        {this.form()}
                        <p>{this.state.value}</p>
                    </div>
                    : <p>{this.state.value}</p>
                }
            </div>
    }
}

export class Boolean_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: false }
    }
    componentDidMount() {
        const { inherentValue, isItemArray, initValue } = this.props;
        const realValue = initValues(inherentValue, isItemArray, false);

        this.setState({ value: realValue })
    }
    form() {
        const { handleValue, isItemArray } = this.props
        return <input style={{ width: 40, height: 40 }} type="checkbox" checked={this.state.value}
            onChange={(e) => {
                const value = e.currentTarget.checked;
                this.setState({ value });
                inHlForm(handleValue, value, isItemArray)
            }}
        />
    }
    render() {
        const { isItemArray } = this.props
        return typeof isItemArray === "number" ? this.form()
            : <div style={{ position: "relative", marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, width: "100%" }}>
                    <img style={{ height: 20, width: 20 }} src={JsonForm.value} />
                    <p>Valeur</p>
                </div>
                {this.form()}
            </div>
    }
}