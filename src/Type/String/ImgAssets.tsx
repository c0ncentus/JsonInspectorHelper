import { Component } from "react";
import { Value_JipState } from "..";
import { regex_Assets } from "../../Util/Lib";
import { FormGetJip } from "../../Util/Model";



export const AssetImgObj= {
    __src__:"",
    __Type__:"Png",
    __Format__:"Square",
    __isRdm__:true,
    __i__:3,
}

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
        if (extra === undefined || extra.IMG_ASST === undefined) { return <></> }
        else {
            const { Png, Jpg, Svg } = extra!.IMG_ASST;
            let Cpnt = <></>;
            const displayI = extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && (this.state.iImg !== null || this.state.isImgRdm === true)
            if (typeof this.props.src === "string") {
                Cpnt = <img src={src} style={{ border: "2px red dotted", width: 100, height: 100 }} />
            }
            return <div className="AssetImg" style={{ marginLeft: 20 }}>
                {Cpnt}
            </div>
        }
    }
}



let collectionMax = {
    Png: { Square: Object.keys(Png.Square).length, Bac: Object.keys(Png.Bac).length, Phone: Object.keys(Png.Phone).length },
    Jpg: { Square: Object.keys(Jpg.Square).length, Bac: Object.keys(Jpg.Bac).length, Phone: Object.keys(Jpg.Phone).length },
    Svg: { Square: 0, Bac: 0, Phone: 0 }
}