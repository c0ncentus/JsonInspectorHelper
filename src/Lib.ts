export const rgx_dot = /\./gm
export const rgx_crochePath = /\[\w+\]/gm

export const regexColor = /^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)$/gmi;
export const regex_Hex = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gmi;
export const regex_Rgb = /^rgb\(([0-255])\,\s*([0-255])\,\s*([0-255])\)$/gm;
export const regex_Hsl = /^hsl\(\d{1,3}\s*\,\s*\d{1,3}\%\s*\,\s*\d{1,3}\%\)$/gm
export const regex_Img = /((http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg)|(\.?[/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg))/gm
export const regex_Img_http = /^http(s?)\:\/\//gm
export const regex_https = /^https/gm

export const regex_Assets = /^\/static\/media\/.+/gm;

export const regex_Number = /^\d+$/;
export const regex_Boolean = /^(true|false)$/;
export const regex_Date = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm
export const regex_BaseUrlHttp = /^.+?[^\/:](?=[?\/]|$)/gmi