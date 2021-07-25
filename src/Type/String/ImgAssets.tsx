import { Component } from "react";
import { Value_JipState } from "..";
import { arrayByNum, regex_Assets } from "../../Util/Lib";
import { FormGetJip } from "../../Util/Model";
import { DropDownSquish } from "../../Util/Package";

export class AssetImg_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", imgFormat: null, imgType: null, iImg: null, isImgRdm: false }
    }
    componentDidMount() {
        const { inherentValue, isItemArray, extra } = this.props;

        const realValue = inherentValue;

        this.setState({
            value: regex_Assets.test(realValue) ? realValue : extra?.IMG_ASST?.Jpg.Bac[0],
            iImg: null, imgFormat: null, imgOtherType: null, imgType: null, isImgRdm: false,
        })

    }
    render() {
        // TODO handleValue
        const { extra } = this.props;
        let max = 0
        if (extra === undefined || extra.IMG_ASST === undefined) { return <></> }
        else {
            const { Png, Jpg, Svg } = extra!.IMG_ASST;
            let Cpnt = <></>;
            const displayI = extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && (this.state.iImg !== null || this.state.isImgRdm === true)
            if (this.state.imgFormat !== null && this.state.imgType !== null && this.state.isImgRdm !== true) {
                let collectionMax = {
                    Png: { Square: Object.keys(Png.Square).length, Bac: Object.keys(Png.Bac).length, Phone: Object.keys(Png.Phone).length },
                    Jpg: { Square: Object.keys(Jpg.Square).length, Bac: Object.keys(Jpg.Bac).length, Phone: Object.keys(Jpg.Phone).length },
                    Svg: { Square: 0, Bac: 0, Phone: 0 }
                }
                max = collectionMax[this.state.imgType!][this.state.imgFormat!];
            }
            if (displayI) {
                const rdm = Math.trunc(Math.random() * max)
                const iPic = this.state.isImgRdm ? rdm : this.state.iImg! < max ? this.state.iImg! : 0
                const src = extra.IMG_ASST[this.state.imgType!][this.state.imgFormat!][iPic];
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
                {extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && this.state.isImgRdm !== true
                    ? <DropDownSquish choices={arrayByNum(max)} onChange_={(iStr: string) => { this.setState({ iImg: parseInt(iStr, 10) }) }} />
                    : <></>}

            </div>
        }
    }
}