import { cloneDeep, flattenDeep } from "lodash"
import { Component, CSSProperties } from "react"
import ReactModal from "react-modal"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { runInThisContext } from "vm"
import { CONDITION_PANEL_VIEW, CONST_PNLV } from "./CONST"
import { allSquishChange, rgbToAnotherRgb } from "./Lib"
import { websiteToMenusItems, gene_main, websiteToRouter, BallButton } from "./Libx"
import { ActionFuncParameter, CustomPicture, KeyValue, TextObj, WebsiteStructure__ } from "./Model"

interface DropDownSquishState { value: string, active: boolean, prvsInherent?: string }

interface DropDownSquishProps { lght: number, choices: string[], initValue?: string, onChange_?: (str: string) => any }
export class DropDownSquish extends Component<DropDownSquishProps, DropDownSquishState> {
    constructor(props: any) {
        super(props)
        this.state = { active: false, value: "", prvsInherent: undefined }
    }
    componentDidMount() { if (typeof this.props.initValue === "string") { this.setState({ prvsInherent: this.props.initValue, value: this.props.initValue! }) } else { this.setState({ prvsInherent: this.props.initValue }) } }
    affectValue(value: string) { this.setState({ value: value.length > this.props.lght ? (value.substring(0, this.props.lght) + "...") : value }) }
    componentDidUpdate() {
        if (this.props.initValue !== this.state.prvsInherent && typeof this.props.initValue === "string") {
            { this.setState({ prvsInherent: this.props.initValue, }); this.affectValue(this.props.initValue) }
        }
    }
    handleActive(active: boolean) { this.setState({ active }) }
    handleValue(value: string) { this.affectValue(value) }
    render() {
        const { choices, onChange_ } = this.props
        return <form className="dropDownSquish">
            <input
                className="chosen-value chosen-value1"
                type="text" value={this.state.value}
                onChange={((e) => { this.handleValue(e.target.value); })}
                placeholder="Type to filter"
                onClick={(() => { this.handleActive(!this.state.active) })} />
            <ul className={`value-list value-list1 ${this.state.active ? " open" : ""}`}>
                {choices.map((li) => {
                    return <li
                        onClick={((e) => {
                            this.handleValue(e.currentTarget.textContent!)
                            this.handleActive(!this.state.active);
                            if (onChange_ !== undefined) { onChange_(li) }
                        })} className={`valueFilter1${this.state.active ? "" : " closed"}`}>
                        {li}
                    </li>
                })}
            </ul>
        </form>
    }
}

export interface ButtonLinkPropsExpose { link?: string; href?: string; text: string; onClick?: Function; }
export class Glass_ extends Component<ButtonLinkPropsExpose, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { text, href, link, onClick } = this.props;
        return <div className="glassEffect" onClick={() => {
            if (onClick === undefined) { }
            else { onClick() }
        }}>
            <div className="container">
                {link !== undefined
                    ? <Link to={link!} href={href}>{
                        <div className="btn effect01"><span>{text}</span></div>
                    }</Link>
                    : <a href={href} className="btn effect01"><span>{text}</span></a>}
            </div>
        </div>
    }
}

interface SuperMenuingProps { struct: WebsiteStructure__, startUrl: string[] }

export class SuperMenuing_ extends Component<SuperMenuingProps, any> {
    render() {
        const menus = websiteToMenusItems(this.props.struct, this.props.startUrl);
        return <div className="Wrapper_menu">
            <nav className="menuFireworks"><ol>{gene_main(menus)}</ol></nav>
        </div>
    }
}

interface LetterAnimationProps { text: string, fontSize?: number, css?: CSSProperties }
export class LetterAnimation_ extends Component<LetterAnimationProps, any> {
    render() {
        const { text, fontSize } = this.props;
        const style = { fontSize: `${fontSize === undefined ? 20 : fontSize}vw` }
        return <div id="ui" className="LetterAnimationUI">
            {Array.from(Array(40).keys()).map(() => { return <div className="text" style={style}>{text}</div> })}
        </div>
    }
}

interface HeaderPageProps {
    struct: WebsiteStructure__;
    img: string;
    startUrl?: string[];
    title: string;
    summerizeImg?: string;
    summerize: { text: string, hrefId: string }[]
}
export class HeaderPage_ extends Component<HeaderPageProps, any> {
    render() {
        const { img, struct, startUrl, title } = this.props;
        const url = startUrl === undefined ? ["Menus"] : startUrl;
        return <div className="headerPage">
            <div style={{ height: "100vh", opacity: 0.9, backgroundSize: "cover", backgroundImage: `url(${img})`, position: "relative" }}>
                <div style={{ marginBottom: "30vh", opacity: 1, position: "absolute", top: 0, width: "100%", zIndex: 100 }}>
                    <SuperMenuing_ struct={struct} startUrl={url} />
                </div>
                <div style={{ height: "50vh" }}>
                    <LetterAnimation_ text={title} />
                    <p style={{
                        top: "40vh",
                        left: "50vw",
                        position: "absolute",
                        fontSize: "20vw",
                        lineHeight: "20vw",
                        opacity: 0.7,
                        color: "crimson",
                        fontFamily: "Cinzel",
                        transform: "translate(-50%, -50%)",
                        mixBlendMode: "screen"
                    }}></p>
                </div>
                <div style={{ backgroundColor: "white", height: "60vh", width: "100%", opacity: 0.2, position: "absolute", top: "50vh", left: "0vh" }} />
                <div style={{ position: "absolute", bottom: -78, zIndex: 1000, width: "100%" }}>
                    {/* <ul style={{ display: "flex", width: "100%" }} className="listPart">
                        {summerize.map((el, i) => {
                            return <li style={{ width: `${100 / summerize.length}%`, height: 160, display: "flex" }}>
                                <a href={`#${el.hrefId}`} style={{ textAlign: "center", width: "100%", position: "relative" }}>
                                    <div className="centerChild buttonWrapper" id={`Button${i}`}>
                                        <p className="pButton" style={{marginBottom:0}}>{el.text}</p>
                                        <img src={summerizeImg} style={{ backgroundSize: "cover", width: "100%" }} />
                                    </div>
                                </a>
                            </li>
                        })}
                    </ul> */}
                </div>
            </div>
        </div >
    }
}

export class MegaRouter_ extends Component<{ struct: WebsiteStructure__ }, any>{
    render() {
        const dataRouter = websiteToRouter(this.props.struct);
        return <BrowserRouter>
            <Switch>
                {dataRouter.map((oneRouter, index) => {
                    const { component, name, path, customParam, function_ } = oneRouter;
                    if (function_ !== undefined && typeof customParam !== "undefined") { }
                    let result; let newPath = `/${path.join("/")}`;
                    Array.isArray(customParam) && typeof function_ === "function"
                        ? result = <Route
                            key={`router_${name}_${index}`}
                            exact path={`${newPath}/:${customParam.join("/:")}`}
                            render={(props) => {
                                return function_(...customParam.map((el) => { return props.match.params[el] }))
                            }}
                        />
                        : result = <Route key={`router_${name}_${index}`} exact path={newPath}>{component}</Route>
                    return result;
                })
                }
            </Switch>
        </BrowserRouter >
    }
}

interface OpenAndCloseState {
    isClose: boolean
    src: string,
    isPassed: boolean
}
type DirectionOpenAndClose = "left" | "right" | "up" | "bottom"
interface OpenAndCloseProps {
    refDir: DirectionOpenAndClose,
    refStart: DirectionOpenAndClose
    posWhenOpen: { left?: number, right?: number, top?: number, bottom?: number }
    img: {
        right: string,
        left: string,
        up: string,
        bottom: string,
    },
    cssCustom?: CSSProperties
}

export class OpenAndClose_ extends Component<OpenAndCloseProps, OpenAndCloseState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isClose: true,
            src: "",
            isPassed: false
        }
    }
    componentDidMount() {
        this.setState({ src: this.props.img[this.props.refStart] })
    }
    handleVisibility(isClose: boolean, direction: DirectionOpenAndClose, isPassed: boolean) {
        this.setState({
            isClose,
            src: this.props.img[direction],
            isPassed
        })
    }
    cssMerde = {
        right: {
            top: "50%",
            right: 0,
            left: "unset"
        },
        up: {
            top: 0,
            left: "50%"
        },
        left: {
            top: "50%",
            left: 0
        },
        bottom: {
            left: "50%",
            bottom: 0
        }
    }
    render() {
        const { cssCustom } = this.props
        const refDir = this.props.refDir;
        const isHoriz = (refDir === "left" || refDir === "right");
        return <div className="OpenMenu_Cpnt" style={{ position: "fixed", zIndex: 100000, width: this.state.isClose ? 0 : "100%", height: this.state.isClose ? 0 : "100%" }}>
            <div className="a" style={{ overflowY: "scroll", width: isHoriz ? "50%" : "100%", height: isHoriz ? "100%" : "100%", zIndex: 200000, visibility: this.state.isClose ? "collapse" : "visible", background: "#333", ...cssCustom }}>
                {this.props.children}
            </div>
            <div className="b" onClick={(() => {
                this.handleVisibility(!this.state.isClose,
                    isHoriz
                        ? this.state.isClose
                            ? "left"
                            : "right"
                        : this.state.isClose
                            ? "bottom"
                            : "up",
                    true)
            })}
                style={{
                    position: "fixed",
                    zIndex: 10000000,
                    width: 27,
                    height: 27,
                    ...{
                        right: {
                            top: "50%",
                            right: 0
                        },
                        up: {
                            top: 0,
                            left: "50%"
                        },
                        left: {
                            top: "50%",
                            left: 0
                        },
                        bottom: {
                            left: "50%",
                            bottom: 0
                        }
                    }[refDir]
                }}>
                <img style={{ cursor: "pointer" }} src={this.state.isPassed === false
                    ? this.props.img[this.props.refStart]
                    : this.state.src} />

            </div>
        </div>
    }
}

interface CardSeriesChapterBlogState { }

export interface CardSeriesChapterBlogProps {
    items: {
        id: string
        title: string,
        img: string,
        color: string,
        onClick?: any,
        CpntIfActive?: { left: JSX.Element, right: JSX.Element },
    }[]
}
export class CardSeriesChapterBlog_ extends Component<CardSeriesChapterBlogProps, CardSeriesChapterBlogState> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { items } = this.props;
        return <div className="cardSeriesChapterBlog">
            {items.map((el) => {
                const { color, img, title, onClick, id, CpntIfActive } = el;
                return <div style={{ display: "block" }}>
                    <div style={{ display: "flex" }}>
                        {CpntIfActive === undefined
                            ? <></>
                            : <div>{CpntIfActive.left}</div>}


                        <div className="card" id={id}>
                            <h2>{title}</h2>
                            <i className="fas fa-arrow-right"></i>
                            <div className="pic" style={{ background: `url(${img})` }}></div>
                            <ul>
                                <li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li />
                                <li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li />
                            </ul>
                            <div className="social">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-github"></i>
                            </div>
                            <button style={{ background: color }} onClick={(() => {
                                if (onClick === undefined) {
                                } else {
                                    onClick()
                                }
                            })

                            } />

                        </div>
                        {CpntIfActive === undefined ? <></>
                            : <div>{CpntIfActive.right}</div>}
                    </div>
                </div>
            })
            }
        </div >
    }
}

interface CardSeriesBlogProps {
    title: string,
    type: string,
    desc: string,
    like: number,
    totalComm: number,
    date: { day: number, month: string, year: number }
    tags: string[]
    bg: string

}

export class CardSeriesBlog_ extends Component<CardSeriesBlogProps, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { date, desc, like, title, totalComm, type, tags, bg } = this.props
        return <div style={{ position: "relative", height: 500 }}>
            <div className="cardSeriesBlog blog-card spring-fever" style={{ backgroundImage: `url(${bg})` }}>
                <div className="title-content">
                    <h3><a href="#">{title}</a></h3>
                    <div className="intro"> <a href="#">{type}</a> </div>
                </div>
                <div className="card-info">
                    {desc}
                    <a href="#">Read Article<span className="licon icon-arr icon-black"></span></a>
                </div>
                <div className="utility-info">
                    <ul className="utility-list">
                        <li><span className="licon icon-like"></span><a href="#">{like}</a></li>
                        <li><span className="licon icon-com"></span><a href="#">{totalComm}</a></li>
                        <li><span className="licon icon-dat"></span>{date.day} {date.month[0] + date.month[1] + date.month[2]} {date.year}</li>
                        <li><span className="licon icon-tag"></span>
                            {tags.map((el) => {
                                return <a href="#">{el}</a>
                            })}</li>
                    </ul>
                </div>
                <div className="gradient-overlay"></div>
                <div className="color-overlay"></div>
            </div>
        </div>

    }
}

interface CardBlogCategoryProps {
    bg: string
    date: { day: number, month: string }
    title: string,
    desc: string,
    author: string,
    nbrComment: number
}
export class CardBlogCategory_ extends Component<CardBlogCategoryProps, any> {
    render() {
        const { bg, date, desc, title, author, nbrComment } = this.props
        return <div className="cardBlogCategory container mt-5">
            <div className="row">
                <div className="col-12">
                    <article className="blog-card">
                        <div className="blog-card__background">
                            <div className="card__background--wrapper">
                                <div className="card__background--main" style={{ backgroundImage: `url(${bg})` }}>
                                    <div className="card__background--layer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-card__head">
                            <span className="date__box">
                                <span className="date__day">{date.day}</span>
                                <span className="date__month">{date.month}</span>
                            </span>
                        </div>
                        <div className="blog-card__info">
                            <h5>{title}</h5>
                            <p>
                                <a href="#" className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i> {author}</a>
                                <a href="#" className="icon-link"><i className="fa fa-comments-o"></i> {nbrComment}</a>
                            </p>
                            <p>{desc}</p>
                            <a href="#" className="btn btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i>READ MORE</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    }
}

export class RadientNum extends Component<{ txt: string }, any> {
    render() {
        return <div className="RadientNum">
            <h1 className="GradientBorder">{this.props.txt}</h1>
        </div>
    }
}
interface CadreTextRedState { }

interface CadreTextRedProps {
    text: string,
    color?: string,
    size?: string,
    fontSize: string
}
export class CadreTextRed_ extends Component<CadreTextRedProps, CadreTextRedState> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { text, fontSize } = this.props;
        return <a href="#" className="cadreTextRed" style={{ fontSize }}>{text}</a>
    }
}

interface MenuUnderlineState {
    isToggle: boolean
}

interface MenuUnderlineProps {
    menu: {
        color: string;
        link: string;
        text: string;
        items: {
            link: string;
            text: string;
        }[];
    }[]
}
export class MenuUnderline_ extends Component<MenuUnderlineProps, MenuUnderlineState> {
    constructor(props: any) {
        super(props)
        this.state = { isToggle: false }
    }
    handleToggle() {
        this.setState({ isToggle: !this.state.isToggle })
    }
    render() {

        const { menu } = this.props
        return <nav className="MenuUnderline">
            <input id="menu__toggle" type="checkbox" className='menu__toggle' />
            <label htmlFor="menu__toggle" onClick={(() => { this.handleToggle() })} className="menu__toggle-label" style={{ background: this.state.isToggle ? "transparent" : "black", borderRadius: "50%" }}>
                <svg preserveAspectRatio='xMinYMin' viewBox='0 0 24 24'>
                    <path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
                </svg>
                <svg preserveAspectRatio='xMinYMin' viewBox='0 0 24 24' style={{ background: "#e1705d" }}>
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </label>
            <ol className='menu__content'>
                {menu.map((el) => {
                    return <li className="menu-item" style={{ borderColor: el.color }}>
                        <a className="aSulColor" href={el.link}>{el.text}</a>
                        <div className="sulColor" style={{ backgroundColor: el.color }} />
                        {el.items !== undefined && el.items.length !== 0
                            ? <ol className="sub-menu">{el.items.map((item) => {
                                return <li className="menu-item">
                                    <a href={item.link} className="aSulColor">{item.text}</a>
                                    <div className="sulColor" style={{ backgroundColor: el.color }} />
                                </li>
                            })}</ol>
                            : <></>
                        }

                    </li>
                })}
            </ol>
        </nav>
    }
}


interface TabNpmColorProps {
    items: { colorRGB: string, text: string, svg?: JSX.Element, display: JSX.Element }[],
    iActiveDefault?: number
}
interface TabNpmColorState { iActive: number | null, iHover: number | null }
export class TabNpmColor_ extends Component<TabNpmColorProps, TabNpmColorState>{
    constructor(props: any) {
        super(props)
        this.state = {
            iActive: null,
            iHover: null
        }
    }
    componentDidMount() {
        if (this.props.iActiveDefault !== undefined) {
            this.setState({ iActive: this.props.iActiveDefault })
        }
    }
    rgbToRgba(str: string, level: number) {
        const rgb = str.replace("rgb", "").replace("(", "").replace(")", "").replace(" ", "").split(",");
        return `rgba(${rgb.join(",")}, ${level})`

    }

    render() {
        return <div style={{ width: "max-content", height: "max-content" }}>
            <ul className="TabNpmColor" style={{ background: "white" }}>

                {this.props.items === undefined ? <></> : this.props.items.map((element, i) => {
                    const { colorRGB, text } = element;
                    const colorLight = rgbToAnotherRgb(colorRGB, true, 100);
                    const colorDark = rgbToAnotherRgb(colorRGB, false, 100);
                    const css_ = {
                        cssInactif: {
                            color: colorDark,
                            borderColor: colorRGB
                        },
                        cssActif: {
                            color: colorDark,
                            borderColor: colorRGB,
                            backgroundColor: colorLight,
                            fontWeight: 900
                        },
                        cssHover: {
                            backgroundColor: colorLight
                        }
                    }
                    const currentCss = this.state.iActive === i
                        ? this.state.iHover === i
                            ? { ...css_.cssActif, ...css_.cssHover }
                            : css_.cssActif
                        : this.state.iHover === i
                            ? { ...css_.cssInactif, ...css_.cssHover }
                            : css_.cssInactif;
                    return <li
                        onMouseEnter={(() => { this.setState({ iHover: i }) })}
                        onMouseLeave={(() => { this.setState({ iHover: null }) })}
                        onClick={(() => { this.setState({ iActive: this.state.iActive === i ? null : i }) })}
                        style={{
                            ...currentCss, padding: 20, cursor: "pointer",
                            borderBottom: `4px solid ${colorRGB}`
                        }} >

                        <a className="_38ce9a85 linkNpm">
                            <span>{text}</span>
                        </a>
                    </li>
                })}
            </ul>
            <div style={{ height: "max-content", width: "max-content" }}>
                {this.state.iActive === null || this.props.items === undefined || this.props.items[this.state.iActive] === undefined
                    ? <></>
                    : this.props.items[this.state.iActive].display}
            </div>
        </div>
    }
}


interface SelectionatorState {
    choiceSelected: string[]
}

export interface ChoiceSelec {
    label: string;
    choices: string[];
}

interface SelectionatorProps {
    items: ChoiceSelec[]
    onChangeValue?: (choice: string[]) => any
}
export class Selectionator_ extends Component<SelectionatorProps, SelectionatorState> {
    constructor(props: any) {
        super(props);
        this.state = { choiceSelected: [] }
        this.fillState = this.fillState.bind(this);
    }
    fillState(value: string) {
        if (this.state.choiceSelected.includes(value)) {
            if (this.props.onChangeValue === undefined) { }
            else { this.props.onChangeValue(this.state.choiceSelected.filter((x) => x !== value)); }
            this.setState(({ choiceSelected: this.state.choiceSelected.filter((x) => x !== value) }));
        } else {
            let newValue = this.state.choiceSelected.map((el) => { return el })
            newValue.push(value);
            if (this.props.onChangeValue === undefined) { }
            else { this.props.onChangeValue(newValue); }
            this.setState(({ choiceSelected: newValue }))
        }
    }
    render() {
        const { items } = this.props;
        const choices: string[] = flattenDeep(items.map((elLabel) => { return flattenDeep(elLabel.choices.map((elChoice) => { return elChoice })) }))
        return <>
            <div className="selectionator">
                <span className="search">
                    <span className="shadow" />
                    <span className="overlay" />
                    Choisis: {this.state.choiceSelected.length} sur {choices.length}
                </span>

                <div className="menu">
                    <ul className="list">
                        {items.map((elItem, i) => {
                            const { choices, label } = elItem;
                            return <li key={i}>
                                <span className="header">{label}</span>
                                <ul className="optgroup">
                                    {choices.map((elChoice, i) => {
                                        const id = `${i}_${elChoice}`;
                                        return <li key={i}>
                                            <input type="checkbox" id={id} name={id} value={elChoice} onClick={(() => { this.fillState(elChoice) })} />
                                            <label htmlFor={id}>{elChoice}</label>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        })}
                    </ul>
                </div>
                <br />

            </div>
            <input type="submit" value="Submit" />
        </>
    }
}


export class DropButton extends Component<{ imgMain: string, jsx_Picture: JSX.Element[] }, { isActive: boolean }>{
    constructor(props: any) { super(props); this.state = { isActive: false } }
    render() {
        const cssIsActive: CSSProperties = { display: "grid", gridTemplateColumns: "auto auto auto auto" }
        return <div className="DropButton_Cpnt" onMouseLeave={() => { this.setState({ isActive: false }) }} onMouseEnter={() => { this.setState({ isActive: true }) }}>
            <div className="profile-pic" ><BallButton imgMain={this.props.imgMain} /></div>
            <div className="content down" style={this.state.isActive ? cssIsActive : {}} onMouseLeave={() => { this.setState({ isActive: false }) }} onMouseEnter={() => { this.setState({ isActive: true }) }}>{this.props.jsx_Picture}</div>
        </div>
    }
}
interface PanelViewTsxProps {
    arrVal: KeyValue,
    dropDownsVal: KeyValue,
    initAsstImg: { isRandom: boolean }
    initChoices: any[],
    onAction: ActionFuncParameter;
    path: string, iUpdate?: number, onArrVal?: boolean, isKey: boolean
}
interface PanelViewTsxState {
    isRandom: boolean;
    choiceSlc: (string)[],
    isBlockingAt: { block: boolean, at: number }
}


const IS_ONLY_ONE_Next = -5;
export class PanelViewTsx extends Component<PanelViewTsxProps, PanelViewTsxState>{
    constructor(props: any) { super(props); this.state = { choiceSlc: [], isRandom: false, isBlockingAt: { block: false, at: 100 } } }
    nextObject(obj: any, key: string, i?: number, index?: number, haveNext?: boolean) {
        if (this.state.isBlockingAt.at === index! && this.state.isBlockingAt.block === true) { return undefined }
        if (typeof obj === "object" && Array.isArray(obj) === false) {
            const keys = Object.keys(obj);
            if (keys.includes(CONST_PNLV.next)) { return obj[CONST_PNLV.next]; }
            if (keys.includes(CONST_PNLV.choice) && typeof i === "number") { return (obj[CONST_PNLV.choice] as any[])[i!] }
        } else {
            if (haveNext === false) { this.setState({ isBlockingAt: { at: index!, block: true } }); }
            if (Array.isArray(obj) && obj.every((x) => { return typeof x === "string" })) {
                if (this.state.isBlockingAt.block === false) { this.setState({ isBlockingAt: { at: index!, block: true } }); }
                return obj;
            }
        }
    }

    returnSomthing(obj: any, key: string, i: number): string[] | undefined {
        let res = undefined;
        if (typeof obj === "object") {
            if (i === IS_ONLY_ONE_Next) { res = obj[this.ObjKeys(obj)[0]] }
            else { res = obj[this.ObjKeys(obj)[i]] }
        }
        if (obj === CONST_PNLV.custom) { }
        if (Array.isArray(obj) && obj.every(x => typeof x === "string")) { res = obj; }
        return res
    }
    getCustom() {
        const { choiceSlc } = this.state;
        const { arrVal } = this.props;
        let objEl: any = cloneDeep(arrVal)
        for (let i = 0; i < choiceSlc.length; i++) {
            const choiceIsInTheLastArr = Array.isArray(objEl) && objEl.every(x => typeof x === "string") && objEl.filter(y => y === choiceSlc[i]).length === 1
            if (choiceIsInTheLastArr === false && (objEl === null || objEl === undefined || objEl[choiceSlc[i]] === undefined)) { return null }
            else {
                if (choiceIsInTheLastArr === true) { objEl = choiceSlc[i] }
                else { objEl = objEl[choiceSlc[i]] }

            }
        }
        return objEl as any
    }
    choicesAvailable(): string[][] {
        const { dropDownsVal, } = this.props;
        const { choiceSlc } = this.state;

        let res: string[][] = []
        res.push(dropDownsVal[this.ObjKeys(dropDownsVal)[0]])
        if (choiceSlc.length === 0) { return res }
        else {
            let i: number = 0;
            let elementObj: KeyValue | "______CUSTOM______" | any[] = {}
            for (let j = 0; j < choiceSlc.length; j++) {
                if (res.length - 1 < j) { return res }
                i = (res[j] as string[]).findIndex(x => x === choiceSlc[j])
                console.log(elementObj)
                let haveNextOrChoice = false;
                if (typeof elementObj === "object" && Array.isArray(elementObj) === false) { haveNextOrChoice = true }
                else { haveNextOrChoice = false }
                elementObj = this.nextObject(j === 0 ? dropDownsVal : elementObj, choiceSlc[j], i === -1 ? undefined : i, j, haveNextOrChoice);
                if (elementObj === undefined) { return res }
                else {
                    const resPush = this.returnSomthing(elementObj, choiceSlc[j], this.ObjKeys(elementObj).length === 2 ? IS_ONLY_ONE_Next : i)
                    if (resPush !== undefined) { res.push(resPush) }
                }
            }
        }
        if (this.state.isBlockingAt.block === true) {
            let newRes: string[][] = [];
            for (let p = 0; p < this.state.isBlockingAt.at; p++) { newRes.push(res[p]); if (res.length - 1 < p) { return newRes } }
        }
        return res
    }

    ObjKeys(obj: any) { return Object.keys(obj).filter(x => { return x !== CONST_PNLV.choice || x !== CONST_PNLV.next }) }
    render() {
        const { path, onAction, isKey, iUpdate, onArrVal } = this.props;
        const allArray = this.choicesAvailable();
        const CUSTOM = allArray.length === this.state.choiceSlc.length ? this.getCustom() : null;
        return <div>
            <div style={{ display: "flex", position: "relative" }} className="PanelViewTsx_Cpnt">
                <div style={{ position: "absolute", top: -50, left: 200 }}><Glass_ text="Randomize Tout" /></div>
                <div className="grid">
                    {allArray.map((arrEl, i) => {
                        return <div>
                            <DropDownSquish lght={7}
                                initValue={this.state.choiceSlc.length - 1 < i ? undefined : this.state.choiceSlc[i]}
                                choices={arrEl}
                                onChange_={(el) => { this.setState({ choiceSlc: allSquishChange(this.state.choiceSlc, el, i) }) }} />
                            <div className="minify">
                                <Glass_ text={`Random ${i + 1}`} onClick={() => { this.setState({ choiceSlc: allSquishChange(this.state.choiceSlc, arrEl[Math.round(Math.random() * (arrEl.length - 1))], i, true) }) }} />
                            </div>
                        </div>
                    })}
                </div>


            </div>
            <div style={{ position: "absolute", right: 100, top: 0 }}>
                {
                    CUSTOM === null
                        ? <></>
                        : this.props.isKey
                            ? <p className="pRes" style={{ fontSize: 50 }}>{CUSTOM}</p>
                            : /\/static*/gm.test(CUSTOM)
                                ? <img src={CUSTOM} style={{ width: 500, height: 500 }} />
                                : <p className="pRes">{CUSTOM}</p>
                }
                {CUSTOM === null ? <></> : <div style={{ position: "absolute", top: 75, left: "-15vw" }}><Glass_ text="Valider" onClick={() => { if (CUSTOM !== null) { onAction(path, "updateValue", { updateValue: { iUpdate, newValue: isKey ? undefined : CUSTOM, newKey: isKey ? CUSTOM : undefined }, onArrVal: false }) } }} /></div>}
            </div>
        </div>
    }
}
interface BasicModalProps {
    iUpdate?: number, onArrVal?: boolean,
    onAction: ActionFuncParameter, path: string, type: "assetImg" | "key" | "word",
    data: KeyValue, custom: CustomPicture, textIndu: TextObj
}
export class BasicModal extends Component<BasicModalProps, { showModal: boolean }>{
    constructor(props: any) {
        super(props);
        this.state = { showModal: false };
        this.open = this.open.bind(this); this.close = this.close.bind(this);
    }
    open() { this.setState({ showModal: true }); }
    close() { this.setState({ showModal: false }); }

    render() {
        const { onAction, path, type, iUpdate, onArrVal, data, custom, textIndu } = this.props;
        return <div className="BasicModal">
            <Glass_ text="✊" onClick={() => { this.open() }} />
            <Glass_ text="🎲" onClick={() => { this.open() }} />
            <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                <Glass_ onClick={() => { this.close() }} text="Fermer" />
                <PanelViewTsx  {...{
                    isKey: type === "key", initAsstImg: { isRandom: true }, initChoices: [""], onAction, path, onArrVal, iUpdate,
                    dropDownsVal: CONDITION_PANEL_VIEW(custom, textIndu)[type],
                    arrVal: data
                }} />
            </ReactModal>
        </div>
    }
}