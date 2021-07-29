import { Component } from "react";
import { extremTest_Assets } from "../../Util/Lib";
import { FormGetJip } from "../../Util/Model";

export class AssetImg_Jip extends Component<FormGetJip, { value?: string }>{
    constructor(props: any) {
        super(props);
        this.state = { value: undefined }
    }
    componentDidMount() {
        const { inherentValue, extra } = this.props;
        this.setState({ value: extremTest_Assets(inherentValue) ? inherentValue : extra?.IMG_ASST?.Jpg.Bac[0], })
    }
    componentDidUpdate() {
        const { inherentValue, extra } = this.props;
        if (this.state.value !== inherentValue) { this.setState({ value: extremTest_Assets(inherentValue) ? inherentValue : extra?.IMG_ASST?.Jpg.Bac[0], }) }
    }
    render() {
        return <div className="AssetImg" style={{ marginLeft: 20 }}>
            {typeof this.state.value === "string"
                ? <img src={this.state.value!} style={{ border: "2px red dotted", width: 100, height: 100 }} />
                : <></>}
        </div>
    }
}

