import { Component, CSSProperties } from "react";
import { Value_JipState } from "..";
import { JsonForm } from "../../Util/CONST";
import { initValues, inHlForm } from "../Util";
import { FormGetJip } from "../../Util/Model";
// subStrChoice: "mot" | "titre" | "descriptif" | "Paragraphe" | null,
const cssStyleInput: CSSProperties = { width: 200, height: 35, margin: 30, border: "black solid 2px" };

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