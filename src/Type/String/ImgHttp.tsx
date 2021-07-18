import { Component } from "react";
import { Value_JipState, initValues } from "..";
import { INIT_VALUES_BY_TYPE, ImgPackage } from "../../Util/CONST";
import { regex_Img_http, regex_https, regex_BaseUrlHttp } from "../../Util/Lib";
import { FormGetJip } from "../../Util/Model";

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

class InputHttp extends Component<{ isS: boolean, color: string, words: { title: string, desc: string } }, any>{
    render() {
        const { color, words, isS } = this.props;
        return <div className="InputHttp_Cpnt">
            <img src={ImgPackage.Extra.inputhttp} style={{ position: "absolute", top: 0, height: "100%", zIndex: 3 }} />
            <img src={isS ? ImgPackage.Extra.logoHttps : ImgPackage.Extra.logoHttp} className="emblem" />
            <p className="title">{words.title}</p>
            <p className="desc">{words.desc}</p>
            <div className="emblemColor" style={{ backgroundColor: isS ? "#7CC97D" : "#FB9F9F" }} />
            {/* <div className="TitleColor" style={{ backgroundColor: isS ? "red" : "green" }} /> */}
            <div className="descColor" style={{ backgroundColor: isS ? "#7CC97D" : "#FB9F9F" }} />

        </div>
    }
}