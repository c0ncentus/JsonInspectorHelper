import { Component } from "react";

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