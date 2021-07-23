import { Component } from "react";
import { Value_JipState } from "..";
import { FormGetJip } from "../../Util/Model";
import { upFormVal } from "../Util";

export class Number_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: 0 }
    }

    componentDidMount() {
        const { inherentValue } = this.props;
        const realValue = (inherentValue);
        this.setState({ value: realValue });
    }
    form() {
        const { isItemArray, path, onAction } = this.props
        return <input onChange={(e) => {
            const val = e.currentTarget.value;
            const value = parseInt((typeof val !== "string" || /^\d+$/gsi.test(val) === false) ? "0" : val, 10);
            this.setState({ value });
            upFormVal(onAction, path, value, isItemArray)
        }}
            type="range" min={0} max={100} step={1} value={`${this.state.value}`} style={{ width: 50 }} />
    }
    render() {
        const { permission, isItemArray, extra } = this.props
        return typeof isItemArray === "number"
            ? this.form()
            : <div style={{ marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, display: "flex" }}>
                    <img style={{ height: 20, width: 20 }} src={extra?.IMG_INTERN!.JsonForm.value} />
                    <p>Val</p>
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