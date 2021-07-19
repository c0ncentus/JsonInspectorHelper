import { Component } from "react";
import { Value_JipState } from ".";
import { initValues, inHlForm } from "./Util";
import { FormGetJip } from "../Util/Model";

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
        const { isItemArray, extra } = this.props
        return typeof isItemArray === "number" ? this.form()
            : <div style={{ position: "relative", marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, width: "100%" }}>
                    <img style={{ height: 20, width: 20 }} src={extra!.IMG_INTERN?.JsonForm.value} />
                    <p>Valeur</p>
                </div>
                {this.form()}
            </div>
    }
}