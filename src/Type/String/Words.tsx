import { Component, CSSProperties } from "react";
import { upFormVal, Value_JipState } from "..";
import { FormGetJip } from "../../Util/Model";
import { Glass_ } from "../../Util/Package";
// subStrChoice: "mot" | "titre" | "descriptif" | "Paragraphe" | null,
const cssStyleInput: CSSProperties = { width: 200, height: 35, margin: 30, border: "black solid 2px" };

export class Word_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) { super(props); this.state = { value: "", firstChange: "" } }
    componentDidMount() {
        const { inherentValue } = this.props;
        this.setState({ value: inherentValue });
    }
    form() {
        const { permission, isKeys, onAction, isItemArray, path, inherentValue } = this.props;
        return ((isKeys && permission.key) || (permission.value && isKeys === false))
            ? <p>{this.state.value}</p>
            : <div style={{ display: "flex" }} className="minus">
                <input style={{ ...cssStyleInput, margin: 5, width: 50 }}
                    onChange={(e) => { const value = e.currentTarget.value; this.setState({ value }); }}
                    value={this.state.value}
                />
                {this.state.value !== inherentValue
                    ? <Glass_ text="✔️" onClick={() => {upFormVal(onAction, path, this.state.value, isItemArray, isKeys)}} />
                    : <></>}
            </div>
    }
    render() {
        const { isKeys, isItemArray, extra } = this.props;
        return typeof isItemArray === "number"
            ? this.form()
            : <div style={{ position: "relative", marginRight: isKeys === false ? 10 : 0 }}>
                {isKeys
                    ? <div style={{ display: "flex" }}>
                        <img style={{ height: 20, width: 20 }} src={extra!.IMG_INTERN!.JsonForm.key} />
                        <p>Clef</p>
                    </div>
                    : <div style={{ display: "flex" }}>
                        <img style={{ height: 20, width: 20 }} src={extra!.IMG_INTERN!.JsonForm.value} />
                        <p>Val</p>
                    </div>}

                {this.form()}
            </div>
    }
}