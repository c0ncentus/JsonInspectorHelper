import { Component } from "react";
import { Value_JipState } from "..";
import { INIT_VALUES_BY_TYPE } from "../../Util/CONST";
import { regex_Img_http, regex_https, regex_BaseUrlHttp } from "../../Util/Lib";
import { FormGetJip } from "../../Util/Model";

export class ImgHttpOrS extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) { super(props); this.state = { value: "", } }
    componentDidMount() {
        const { inherentValue, } = this.props;
        const initValue = inherentValue;

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
        const { extra } = this.props;
        return <div className="Http_s" style={{ position: "relative", width: 375, height: 200 }}>
            <InputHttp {...{ color: "", img:{
                http:extra!.IMG_INTERN!.Extra.logoHttp,
                https:extra!.IMG_INTERN!.Extra.logoHttps,
                input:extra!.IMG_INTERN!.Extra.inputHttp
            }, isS: this.state.isHttps===true, words: { desc: this.state.value!, title: this.state.baseUrl! } }} />
        </div>
    }
}

class InputHttp extends Component<{ isS: boolean, words: { title: string, desc: string }, img: { input: string, http: string, https: string } }, any>{
    render() {
        const { words, isS, img } = this.props;
        return <div className="InputHttp_Cpnt">
            <img src={img.input} style={{ position: "absolute", top: 0, height: "100%", zIndex: 3 }} />
            <img src={isS ? img.https : img.http} className="emblem" />
            <p className="title">{words.title}</p>
            <p className="desc">{words.desc}</p>
            <div className="emblemColor" style={{ backgroundColor: isS ? "#7CC97D" : "#FB9F9F" }} />
            {/* <div className="TitleColor" style={{ backgroundColor: isS ? "red" : "green" }} /> */}
            <div className="descColor" style={{ backgroundColor: isS ? "#7CC97D" : "#FB9F9F" }} />

        </div>
    }
}