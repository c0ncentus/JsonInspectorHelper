import { Component, CSSProperties } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

interface DropDownSquishState { value: string, active: boolean }

interface DropDownSquishProps { choices: string[], onChange_?: (str: string) => any }
export class DropDownSquish extends Component<DropDownSquishProps, DropDownSquishState> {
    constructor(props: any) {
        super(props)
        this.state = { active: false, value: "" }
    }
    handleActive(active: boolean) {
        this.setState({ active })
    }

    handleValue(value: string) {
        this.setState({ value })
    }
    render() {
        const { choices, onChange_ } = this.props
        return <form className="dropDownSquish">
            <input
                className="chosen-value chosen-value1"
                type="text"
                value={this.state.value}
                onChange={((e) => {
                    this.handleValue(e.target.value);
                })}
                placeholder="Type to filter"
                onClick={(() => { this.handleActive(!this.state.active) })} />
            <ul className={`value-list value-list1 ${this.state.active ? " open" : ""}`}>
                {choices.map((li) => {
                    return <li
                        onClick={((e) => {
                            this.handleValue(e.currentTarget.textContent!)
                            this.handleActive(!this.state.active);
                            if (onChange_ !== undefined) {
                                onChange_(li)
                            }
                        })}
                        className={`valueFilter1${this.state.active ? "" : " closed"}`}>
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

interface RenderLocalStorageState {
    pseudos: string,
    psw: string,
    choice: DestData
}

export class RenderLocalStorage extends Component<RenderLocalStorageProps, RenderLocalStorageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            choice: "Base de donnée Production",
            pseudos: "",
            psw: ""
        }
    }
    componentDidMount() {
        const pseudos = (this.props.AuthByDefault !== undefined
            && this.props.AuthByDefault!.login !== undefined)
            ? this.props.AuthByDefault!.login
            : ""
        const psw = (this.props.AuthByDefault !== undefined
            && this.props.AuthByDefault!.psw !== undefined)
            ? this.props.AuthByDefault!.psw
            : ""

        this.setState({ pseudos, psw })
    }
    ItemByChoice = (choice: DestData) => {
        const txt = TextByChoice[choice]
        return <li style={{ margin: 50 }}> {
            isBlockRequirement(choice) === true
                ? <div style={{ display: "flex" }}>
                    <p style={{
                        backgroundColor: "pink",
                        fontSize: 30,
                        height: "min-content",
                        width: "max-content"
                    }}>Peux pas Récuperer {txt}</p>
                    {this.state.choice === choice && this.state.choice !== "Local"
                        ? <Glass_ text="Connecter" onClick={async () => {
                            const a = await this.props.allRequest.fetchToken(this.state.pseudos, this.state.psw, (this.props.url as KeyValue)[this.state.choice as ("Base de donnée Local" | "Base de donnée Production")])
                                .then((resp: any) => {
                                    if (this.state.choice === "Base de donnée Production") {

                                        localStorage.setItem(LocalStorageKey.TOKEN_LOCAL, resp.token)
                                    } else {
                                        if (this.state.choice === "Base de donnée Local") {
                                            localStorage.setItem(LocalStorageKey.TOKEN_PROD, resp.token)
                                        }
                                    }
                                });
                            this.props.allRequest.fetchToken(this.state.pseudos, this.state.psw, (this.props.url as KeyValue)[this.state.choice as ("Base de donnée Local" | "Base de donnée Production")])
                                .then((resp: any) => {
                                    resp.json().then((e: { token: string }) => {
                                        if (this.state.choice === "Base de donnée Production") {
                                            localStorage.setItem(LocalStorageKey.TOKEN_PROD, e.token)
                                        } else {
                                            if (this.state.choice === "Base de donnée Local") {
                                                localStorage.setItem(LocalStorageKey.TOKEN_LOCAL, e.token)
                                            }
                                        }
                                    })
                                })
                        }} />
                        : <></>}

                </div>
                : <p style={{
                    fontSize: 30,
                    backgroundColor: "#5ab065",
                    height: "min-content",
                    width: "max-content"
                }}>Peux Récuperer {txt}</p>
        }
        </li>
    }
    render() {
        const { choice } = this.state;
        return <div style={{ display: "block", position: "relative", height: "max-content", width: "max-content" }}>
            <p style={{ fontSize: 40 }}>Connexion aux Bases:</p>
            <div style={{ display: "flex" }}>
                <input
                    style={cssStyleInput}
                    onChange={(e) => { this.setState({ pseudos: e.currentTarget.value }) }}
                    value={this.state.pseudos}
                />
                <input
                    style={cssStyleInput}
                    onChange={(e) => { this.setState({ psw: e.currentTarget.value }) }}
                    value={this.state.psw}
                />

                <select style={{ margin: 50, height: 20 }} value={choice} onChange={(e) => {
                    this.setState({ choice: e.currentTarget.value as DestData })
                }}>
                    {DEST_DATA_PUSH_SUP.map(e => {
                        return <option>{e}</option>
                    })}
                </select>
                {isBlockRequirement("Local") === false
                    ? <Glass_ text="Recharger" onClick={() => {
                        localStorage.removeItem(LocalStorageKey.TOKEN_NAV)
                        downloadTo(this.props.allRequest, "Base de donnée Production", "Local")
                    }} />
                    : <></>}
            </div>
            <ul>
                <li style={{ margin: 50 }}> {
                    isBlockRequirement("Local") === true
                        ? <div style={{ display: "flex" }}>
                            <p style={{ backgroundColor: "pink", fontSize: 30, height: "min-content", width: "max-content" }}>Peux pas Récuperer LocalStorage</p>
                            {(localStorage.getItem(LocalStorageKey.TOKEN_LOCAL) !== ""
                                && localStorage.getItem(LocalStorageKey.TOKEN_LOCAL) !== null
                                && localStorage.getItem(LocalStorageKey.TOKEN_LOCAL) !== undefined
                                && choice === "Base de donnée Local") || (
                                    choice === "Base de donnée Production"
                                    && localStorage.getItem(LocalStorageKey.TOKEN_PROD) !== ""
                                    && localStorage.getItem(LocalStorageKey.TOKEN_PROD) !== null
                                    && localStorage.getItem(LocalStorageKey.TOKEN_PROD) !== undefined)
                                ? this.state.choice === "Local"
                                    ? <Glass_ text="Initialiser" onClick={() => { downloadTo(this.props.allRequest, this.state.choice, "Local") }} />
                                    : <></>
                                : <></>
                            }

                        </div>
                        : <p style={{
                            backgroundColor: "#5ab065", height: "min-content",
                            width: "max-content",
                            fontSize: 30
                        }}>Peux Récuperer LocalStorage</p>
                }
                </li>
                {this.ItemByChoice("Base de donnée Local")}
                {this.ItemByChoice("Base de donnée Production")}
            </ul>
            <div>
                {(this.state.choice === "Base de donnée Production" && isValidTokenDest("Base de donnée Production")
                    || (this.state.choice === "Base de donnée Local" && isValidTokenDest("Base de donnée Local")
                    )) ?
                    <Glass_ text="=> Vers le stockage navigateur" onClick={() => {
                        this.props.allRequest.crud[this.state.choice].get().then((eJson) => {
                            eJson.json().then((data: any[]) => {
                                localStorage.setItem(LocalStorageKey.TOKEN_NAV, JSON.stringify(data))
                            })
                        })

                    }} />
                    : <></>}
            </div>
        </div>
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


interface Value_JipState {
    value: any, firstChange?: string,
    colorMode?: TPS_ColorMode | null,
    isHttps?: boolean | null;
    imgFormat?: "Phone" | "Bac" | "Square" | null,
    imgType?: "Jpg" | "Png" | "Svg" | null,
    imgOtherType?: null | string,
    iImg?: number | null,
    isImgRdm?: boolean,
    baseUrl?: string | null,
}



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


export class AssetImg_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", imgFormat: null, imgType: null, iImg: null, isImgRdm: false }
    }
    componentDidMount() {
        const { inherentValue, isItemArray, extra } = this.props;

        const realValue = initValues(inherentValue, isItemArray, false);

        this.setState({
            value: regex_Assets.test(realValue) ? realValue : extra?.Img_ASSET?.Jpg.Bac[0],
            iImg: null, imgFormat: null, imgOtherType: null, imgType: null, isImgRdm: false,
        })

    }
    render() {
        const { extra, handleValue } = this.props;
        if (extra === undefined || extra.Img_ASSET === undefined) { return <></> }
        else {
            const { Png, Jpg, Svg } = extra!.Img_ASSET;
            let Cpnt = <></>;
            const displayI = extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && (this.state.iImg !== null || this.state.isImgRdm === true)
            if (displayI) {
                let max = {
                    Png: { Square: Object.keys(Png.Square).length, Bac: Object.keys(Png.Bac).length, Phone: Object.keys(Png.Phone).length },
                    Jpg: { Square: Object.keys(Jpg.Square).length, Bac: Object.keys(Jpg.Bac).length, Phone: Object.keys(Jpg.Phone).length },
                    Svg: { Square: 0, Bac: 0, Phone: 0 }
                }[this.state.imgType!][this.state.imgFormat!];
                const rdm = Math.trunc(Math.random() * max)
                const iPic = this.state.isImgRdm ? rdm : this.state.iImg! < max ? this.state.iImg! : 0
                const src = extra.Img_ASSET[this.state.imgType!][this.state.imgFormat!][iPic];
                Cpnt = <img src={src} style={{ border: "2px red dotted", width: 100, height: 100 }} />
            }

            return <div className="AssetImg" style={{ marginLeft: 20 }}>
                <div style={{ position: "relative" }}><p style={{ position: "absolute", top: 0, left: -34, zIndex: -1 }}>Est Random</p><input type="checkbox" onChange={(e) => {
                    const check = e.currentTarget.checked;
                    this.setState({ isImgRdm: e.currentTarget.checked })
                    if (check === false) { this.setState({ iImg: null }) }
                }} checked={this.state.isImgRdm!} /></div>
                {Cpnt}
                <DropDownSquish choices={["Jpg", "Png", /*"Svg"*/]} onChange_={(type: string) => { this.setState({ imgType: type as "Jpg" | "Png" | "Svg" }) }} />
                <DropDownSquish choices={["Bac", "Phone", "Square"]} onChange_={(type: string) => { this.setState({ imgFormat: type as "Bac" | "Phone" | "Square" }) }} />
                {extra !== undefined && this.state.imgType !== null && this.state.imgFormat !== null && this.state.isImgRdm !== true ? <DropDownSquish choices={Array.from(new Array(4)).map((e, i) => { if (e) { }; return i.toString() })} onChange_={(iStr: string) => { this.setState({ iImg: parseInt(iStr, 10) }) }} /> : <></>}

            </div>
        }
    }
}


export class Color_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: "", colorMode: null }
    }
    componentDidMount() {
        const { inherentValue, isItemArray } = this.props;
        const realValue = initValues(inherentValue, isItemArray, false);
        const colorMode = regex_Rgb.test(realValue) ? "Rgb" : regex_Hex.test(realValue) ? "Hex" : regex_Hsl.test(realValue) ? "Hsl" : "None"
        if (colorMode === "None") { this.setState({ value: INIT_VALUES_BY_TYPE.color, colorMode: "Rgb" }) }
        else { this.setState({ value: realValue, colorMode }) }

    }
    render() {
        const { handleValue, extra, isItemArray } = this.props;

        return <div >{/*className="SmalPick"*/}
            <SketchPicker color={this.state.value} onChange={(e: any) => {
                const hsl = e.hsl;
                const rgb = e.rgb;
                const value = this.state.value;
                let colorValueSend: string = "";
                if (/^#/gm.test(value) || extra!.colorMode! === "Hex") { colorValueSend = e.hex }
                if (/rgb/gm.test(value) || extra!.colorMode! === "Rgb") { colorValueSend = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }
                if (/hsl/gm.test(value) === true || extra!.colorMode! === "Hsl") { colorValueSend = `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)` }
                this.setState({ value: colorValueSend });
                inHlForm(handleValue, colorValueSend, isItemArray)
            }} />
            <DropDownSquish choices={["Rgb", "Hsl", "Hex"]} onChange_={(color: string) => {
                if (this.state.colorMode === color) { }
                else {
                    let value = this.state.value;
                    if (color === "Hex" && this.state.colorMode === "Rgb") { value = rgbToHex(...strToRgb(value)) }
                    if (color === "Hsl" && this.state.colorMode === "Rgb") { value = rgbToHsl(...strToRgb(value)) }

                    if (color === "Hex" && this.state.colorMode === "Hsl") { value = hslToHex(...strToHsl(value)) }
                    if (color === "Rgb" && this.state.colorMode === "Hsl") { value = hslToRgb(...strToHsl(value)) }

                    if (color === "Rgb" && this.state.colorMode === "Hex") { value = hexToRGB(value) }
                    if (color === "Hsl" && this.state.colorMode === "Hex") { value = hexToHsl(value) }
                    this.setState({ value, colorMode: color as TPS_ColorMode })
                }
            }} />
        </div>
    }
}

export class Number_Jip extends Component<FormGetJip, Value_JipState>{
    constructor(props: any) {
        super(props);
        this.state = { value: 0 }
    }

    componentDidMount() {
        const { inherentValue, isItemArray } = this.props;
        const realValue = initValues(inherentValue, isItemArray, false);
        this.setState({ value: realValue });
    }
    form() {
        const { handleValue, isItemArray } = this.props
        return <input onChange={(e) => {
            const val = e.currentTarget.value;
            const value = parseInt((typeof val !== "string" || /^\d+$/gsi.test(val) === false) ? "0" : val, 10);
            this.setState({ value });
            inHlForm(handleValue, value, isItemArray)
        }}
            type="range" min={0} max={100} step={1} value={`${this.state.value}`} style={{ width: 50 }} />
    }
    render() {
        const { permission, isItemArray } = this.props
        return typeof isItemArray === "number"
            ? this.form()
            : <div style={{ marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, width: "100%" }}>
                    <img style={{ height: 20, width: 20 }} src={JsonForm.value} />
                    <p>Valeur</p>
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
        const { isItemArray } = this.props
        return typeof isItemArray === "number" ? this.form()
            : <div style={{ position: "relative", marginRight: 10 }}>
                <div style={{ position: "relative", height: 40, width: "100%" }}>
                    <img style={{ height: 20, width: 20 }} src={JsonForm.value} />
                    <p>Valeur</p>
                </div>
                {this.form()}
            </div>
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