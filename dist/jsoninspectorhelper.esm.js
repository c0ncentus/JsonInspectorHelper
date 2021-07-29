import { cloneDeep, get, isEqual, set, has, compact } from 'lodash-es';
import { saveAs } from 'file-saver';
import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var typeOfToJIType = {
  assetImg: {
    main: "String",
    sub: "Img",
    subSub: "assetImg"
  },
  http: {
    main: "String",
    sub: "Img",
    subSub: "http"
  },
  https: {
    main: "String",
    sub: "Img",
    subSub: "https"
  },
  word: {
    main: "String",
    sub: "Other",
    subSub: "Word"
  },
  img: {
    main: "String",
    sub: "Img"
  },
  number: {
    main: "Number"
  },
  array: {
    main: "Array"
  },
  object: {
    main: "Object"
  },
  "boolean": {
    main: "Boolean"
  },
  color: {
    main: "String",
    sub: "Color"
  },
  undefined: {
    main: "undefined"
  },
  "null": {
    main: "null"
  }
};
var regex_lastArray = /^.*\[\d+\]/gm;
var rgx_dot = /\./gm;
var regexColor = /^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)$/gmi;
var regex_Hex = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gmi;
var regex_Rgb = /^rgb\(([0-255])\,\s*([0-255])\,\s*([0-255])\)$/gm;
var regex_Hsl = /^hsl\(\d{1,3}\s*\,\s*\d{1,3}\%\s*\,\s*\d{1,3}\%\)$/gm;
var regex_Img = /((http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg)|(\.?[/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|svg))/gm;
var regex_Img_http = /^http(s?)\:\/\//gm;
var regex_https = /^https/gm;
var regex_Number = /^\d+$/;
var regex_Boolean = /^(true|false)$/;
var regex_BaseUrlHttp = /^.+?[^\/:](?=[?\/]|$)/gmi;

var BallButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(BallButton, _Component);

  function BallButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BallButton.prototype;

  _proto.render = function render() {
    return React.createElement("section", {
      className: "BallButton_Cpnt"
    }, React.createElement("figure", {
      className: "ball bubble",
      style: {
        background: "url(" + this.props.imgMain + ")"
      }
    }));
  };

  return BallButton;
}(Component);

function convertsButton(func, assetsImgInit, imgType, multi) {
  return React.createElement(DropButton, {
    imgMain: multi,
    jsx_Picture: [React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE["boolean"]);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["boolean"], imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.number);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.number, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.word);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.word, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.img);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.img, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE["null"]);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.object);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.object, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.array);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.array, imgType)
    })), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.https);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.https, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.http);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.http, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(assetsImgInit);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.assetImg, imgType)
    }))]
  });
}

function toTypeByType(type, value, func, imgType) {
  return {
    Array: [React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    }))],
    Object: [React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    }))],
    Number: [React.createElement("div", {
      onClick: function onClick() {
        func(value.toString());
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.word, imgType)
    })), value >= 0 ? React.createElement("div", {
      onClick: function onClick() {
        func(value === 0 ? false : true);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["boolean"], imgType)
    })) : React.createElement(React.Fragment, null), React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    }))],
    String: [regex_Boolean.test(value) ? React.createElement("div", {
      onClick: function onClick() {
        func("false" === value ? false : true);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["boolean"], imgType)
    })) : React.createElement(React.Fragment, null), regex_Number.test(value) ? React.createElement("div", {
      onClick: function onClick() {
        func(parseInt(value, 10));
      }
    }, " ", React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.number, imgType)
    })) : React.createElement(React.Fragment, null), regex_Img.test(value) ? React.createElement("div", {
      onClick: function onClick() {
        func(INIT_VALUES_BY_TYPE.img);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.img, imgType)
    })) : React.createElement(React.Fragment, null), React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    })), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), React.createElement(React.Fragment, null), regex_Img_http.test(value) ? regex_https.test(value) ? React.createElement("div", {
      onClick: function onClick() {
        func(value);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.https, imgType)
    })) : React.createElement("div", {
      onClick: function onClick() {
        func(value);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.http, imgType)
    })) : extremTest_Assets(value) ? React.createElement("div", {
      onClick: function onClick() {
        func(value);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.assetImg, imgType)
    })) : React.createElement(React.Fragment, null)],
    "null": [React.createElement("div", {
      onClick: function onClick() {
        func("null");
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.word, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(false);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["boolean"], imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(0);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.number, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    }))],
    undefined: [React.createElement("div", {
      onClick: function onClick() {
        func("undefined");
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.word, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(false);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["boolean"], imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(0);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.number, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    }))],
    Boolean: [React.createElement("div", {
      onClick: function onClick() {
        func(value ? "true" : "false");
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.word, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(value ? 1 : 0);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.number, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(undefined);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType.undefined, imgType)
    })), React.createElement("div", {
      onClick: function onClick() {
        func(null);
      }
    }, React.createElement(BallButton, {
      imgMain: returnImgByType(typeOfToJIType["null"], imgType)
    }))]
  }[type];
}

function extremTest_Assets(str) {
  if (typeof str !== "string") {
    return false;
  }
  var REPLACE = "/static";
  var newStr = str.replaceAll(REPLACE, "");
  return newStr.length + REPLACE.length === str.length;
}

function arrayByKey(obj) {
  return arrayByNum(Object.keys(obj).length);
}

function allSquishChange(choiceSlc, el, i, isRandom) {
  if (isRandom === void 0) {
    isRandom = false;
  }

  var newSelec = cloneDeep(choiceSlc);

  if (isRandom === false) {
    var total = newSelec.length;

    if (total - 1 < i) {
      return [].concat(newSelec, [el]);
    } else {
      if (i === newSelec.length - 1) {
        newSelec[i] = el;
        return newSelec;
      } else {
        var buildArr = [];

        if (i === 0) {
          return [el];
        } else {
          var count = 0;

          while (buildArr.length - 1 > i) {
            buildArr.push(newSelec[count]);
            count = count + 1;
          }

          return buildArr;
        }
      }
    }
  } else {
    var _buildArr = [];

    if (i === 0) {
      return [el];
    } else {
      var _count = 0;

      while (_buildArr.length < i) {
        _buildArr.push(newSelec[_count]);

        _count = _count + 1;
      }

      _buildArr.push(el);

      return compact(_buildArr);
    }
  }
}

function allJipOperation(objUpdate, path, action, extra) {
  if (objUpdate !== null && typeof objUpdate === "object" && Array.isArray(objUpdate) === false && extra.onArrVal !== true) {
    return operationObj(cloneDeep(objUpdate), path, action, extra);
  }

  if (Array.isArray(objUpdate) === true || extra.onArrVal === true) {
    return operationArr(objUpdate, path, action, extra);
  }

  if (["number", "string", "boolean", "undefined"].includes(typeof objUpdate) || objUpdate === null) {
    return extra === undefined ? undefined : extra.updateValue === undefined ? undefined : extra.updateValue.newValue;
  }
}

function operationObj(objUpdate, path, action, extra) {
  var addValue = undefined;
  var updateValue = undefined;
  var deleteValue = undefined;

  if (extra !== undefined && extra.addValue !== undefined) {
    addValue = extra.addValue;
  }

  if (extra !== undefined && extra.updateValue !== undefined) {
    updateValue = extra.updateValue;
  }

  if (extra !== undefined && extra.deleteValue !== undefined) {
    deleteValue = extra.deleteValue;
  }

  var res = undefined;

  if (action === "addValue") {
    var _addValue = addValue,
        newKey = _addValue.newKey,
        newValue = _addValue.newValue;
    var isObject = typeof newKey === "string";

    if (extra.onArrVal === true) {
      var parentPath = parentArrayTo(path);
      var parentObj = parentPath === "" ? objUpdate : get(objUpdate, parentPath);
      parentObj.push(newValue);
      res = parentPath === "" ? parentObj : set(objUpdate, parentPath, parentObj);
    } else {
      var _parentPath = parentTo(path);

      var _parentObj = _parentPath === "" ? objUpdate : get(objUpdate, _parentPath);

      if (isObject && Object.keys(_parentObj).includes(newKey) === false) {
        _parentObj[newKey] = newValue;
        res = _parentPath === "" ? _parentObj : set(objUpdate, _parentPath, _parentObj);
      }
    }
  }

  if (action === "deleteValue") {
    var _deleteValue = deleteValue,
        supprKey = _deleteValue.supprKey;

    var _parentPath2 = parentTo(path);

    var _parentObj2 = _parentPath2 === "" ? objUpdate : get(objUpdate, _parentPath2);

    var anotherObj = {};
    Object.keys(_parentObj2).forEach(function (key) {
      if (key === supprKey) ; else {
        anotherObj[key] = cloneDeep(_parentObj2[key]);
      }
    });
    res = _parentPath2 === "" ? anotherObj : set(objUpdate, _parentPath2, anotherObj);
  }

  if (action === "updateValue") {
    var _updateValue = updateValue,
        _newKey = _updateValue.newKey,
        _newValue = _updateValue.newValue,
        iUpdate = _updateValue.iUpdate;

    var _isObject = typeof _newKey === "string";

    if (extra.onArrVal === true) {
      var _parentPath3 = parentArrayTo(path);

      var _parentObj3 = _parentPath3 === "" ? objUpdate : get(objUpdate, _parentPath3);

      _parentObj3[iUpdate] = _newValue;
      res = _parentPath3 === "" ? _parentObj3 : set(objUpdate, _parentPath3, _parentObj3);
    } else {
      if (_isObject) {
        var _parentPath4 = parentTo(path);

        var _parentObj4 = _parentPath4 === "" ? objUpdate : get(objUpdate, _parentPath4);

        var ancientKey = lastKeyByType("Object", path);
        _parentObj4[_newKey] = _newValue === undefined ? get(objUpdate, path) : _newValue;
        var _anotherObj = {};
        Object.keys(_parentObj4).forEach(function (key) {
          _anotherObj[key === ancientKey ? _newKey : key] = cloneDeep(_parentObj4[key]);
        });
        res = _parentPath4 === "" ? _anotherObj : set(objUpdate, _parentPath4, _anotherObj);
      } else {
        res = has(objUpdate, path) ? set(objUpdate, path, _newValue) : "";
      }
    }
  }

  return res;
}

function operationArr(objUpdate, path, action, extra) {
  var res = undefined;
  var objOfRes = path === "" ? objUpdate : get(objUpdate, path);

  if (action === "addValue") {
    res = [].concat(objOfRes, [undefined]);
  }

  if (action === "deleteValue") {
    var _extra$deleteValue = extra.deleteValue,
        isSuprAllSameValue = _extra$deleteValue.isSuprAllSameValue,
        supprI = _extra$deleteValue.supprI,
        suprrValue = _extra$deleteValue.suprrValue;
    var arrayObj = path === "" ? objUpdate : get(objUpdate, path);

    if (isSuprAllSameValue) {
      arrayObj = arrayObj.filter(function (x) {
        return x !== suprrValue;
      });
    } else {
      arrayObj.splice(supprI !== undefined ? supprI : arrayObj.findIndex(function (x) {
        return x === suprrValue;
      }), 1);
    }

    res = path === "" ? arrayObj : set(objUpdate, path, arrayObj);
    res = arrayObj;
  }

  if (action === "updateValue") {
    var newArray = objOfRes;
    newArray[extra.updateValue.iUpdate] = extra.updateValue.newValue;
    res = newArray;
  }

  return path === "" ? res : set(objUpdate, path, res);
}

function strToRgb(rgb) {
  rgb.replace("rgb(", "").replace(")", "");
  return rgb.split(",").map(function (e) {
    return parseInt(e, 10);
  });
}

function strToHsl(hsl) {
  hsl.replace("hsl(", "").replace(")", "").replaceAll("%", "");
  return hsl.split(",").map(function (e) {
    return parseInt(e, 10);
  });
}

function rgbToHsl(r, g, b) {
  var rTemp = r / 255;
  var gTemp = g / 255;
  var bTemp = b / 255;
  var max = Math.max(rTemp, gTemp, bTemp),
      min = Math.min(rTemp, gTemp, bTemp);
  var h = 0,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rTemp:
        h = (gTemp - bTemp) / d + (gTemp < bTemp ? 6 : 0);
        break;

      case gTemp:
        h = (bTemp - rTemp) / d + 2;
        break;

      case bTemp:
        h = (rTemp - gTemp) / d + 4;
        break;
    }

    h /= 6;
  }

  return "hsl(" + h + ", " + s + ", " + l + ")";
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return "rgb(" + r * 255 + ", " + g * 255 + ", " + b * 255 + ")";
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex) {
  var aRgbHex = hex.split(/.{1,2}/g);
  var aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];
  return "rgb(" + aRgb.join(",") + ")";
}

function hexToHsl(hex) {
  var result = hex.split(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  var r = parseInt(result[0], 16);
  var g = parseInt(result[1], 16);
  var b = parseInt(result[2], 16);
  r = r / 255;
  g = g / 255;
  b = b / 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h = 0,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  return "hsl(" + h * 360 + "," + s + "%," + l + "%)";
}

function hslToHex(h, s, l) {
  l /= 100;
  var a = s * Math.min(l, 1 - l) / 100;

  var f = function f(n) {
    var k = (n + h / 30) % 12;
    var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };

  return "#" + f(0) + f(8) + f(4);
}

function pathLoBuild(basePath, type, extra) {
  if (extra === void 0) {
    extra = {
      sub: "",
      i: 0
    };
  }

  var _extra = extra,
      i = _extra.i,
      sub = _extra.sub;

  if (type === "Simple") {
    return basePath;
  }

  if (type === "Array") {
    return basePath + "[" + i + "]";
  }

  if (type === "Object") {
    return basePath === "" ? sub : basePath + "." + sub;
  }

  if (type === "MixedArray") {
    return basePath + "[" + i + "]." + sub;
  }

  if (type === "MixedObject") {
    return basePath === "" ? sub + "[" + i + "]" : basePath + "." + sub + "[" + i + "]";
  }
  return "";
}

function lastKeyByType(target, path) {
  if (path === "") {
    return "";
  }
  return target === "Object" || target === "Primitive" ? extractKeyByPath(path, "Object", {
    type: "Last",
    levelOnlyKey: 0
  }) : "";
}

function extractKeyByPath(path, type, objSub) {
  if (objSub === void 0) {
    objSub = {
      type: "Last",
      levelOnlyKey: 0
    };
  }

  var isSplitObj = rgx_dot.test(path);

  if (type === "Array") {
    return "" + path;
  }

  if (type === "Object") {
    if (objSub.type === "RootKey") {
      return "";
    }

    if (objSub.type === "First") {
      if (isSplitObj === false) {
        return path.replaceAll(/\[[\s\S]*\]/g, "");
      } else {
        var splitDot = path.split(".");
        var found = false;
        var res = "";
        splitDot.forEach(function (els) {
          if (found === false) {
            var r = els;
            var verify = r.replace(/\[[\s\S]*\]/g, "");

            if (verify.length !== 0 && /\w+/.test(verify)) {
              found = true;
              res = verify;
            }
          }
        });
        return res;
      }
    }

    if (objSub.type === "Last") {
      if (isSplitObj === false) {
        return path.replaceAll(/\[[\s\S]*\]/g, "");
      } else {
        var _splitDot = path.split(".").reverse();

        return _splitDot[0];
      }
    }

    if (objSub.type === "PrvsLast") {
      if (isSplitObj) {
        var _splitDot2 = path.split(".");

        _splitDot2.pop();

        return extractKeyByPath(_splitDot2.join("."), "Object", {
          type: "Last",
          levelOnlyKey: 0
        });
      } else {
        return "";
      }
    }

    return null;
  }

  if (type === "Mixed") {
    return "" + path;
  }
  return "";
}

function deepPathString(str, withArray) {
  var isKeyBeg = /^\w+/.test(str);
  var initStr = (isKeyBeg ? "." : "") + str.replace(/\w+/gm, "").replaceAll("[", "");
  return withArray ? initStr.length : initStr.replaceAll("]", "").length;
}

function getLastArrayByPath(path) {
  return regex_lastArray.test(path) ? path.match(regex_lastArray)[0] : path;
}

function parentTo(path) {
  if (deepPathString(path, false) < 2 || path === "") {
    return "";
  } else {
    var split = path.split(".");
    split.pop();
    return split.join(".");
  }
}

function parentArrayTo(path) {
  return getLastArrayByPath(path).replace(/\[\d+\]$/gm, "");
}

function returnImgByType(value, img) {
  return value === undefined || value !== null && value.main === "undefined" ? img.undefined : value === null || value.main === "null" ? img["null"] : value.subSub === "http" ? img.http : value.subSub === "https" ? img.https : value.subSub === "assetImg" ? img.assetImg : value.main === "Array" ? img.array : value.main === "Object" ? img.object : value.subSub === "Word" ? img.word : value.main === "Number" ? img.number : value.sub === "Color" ? img.color : value.sub === "Img" ? img.img : value.main === "Boolean" ? img["boolean"] : value.sub === "Date" ? img.date : "";
}

function returnType(value) {
  var isArray = Array.isArray(value);
  var typeofValue = typeof value;
  var res = "word";

  if (value === undefined) {
    res = "undefined";
  }

  if (value === null) {
    res = "null";
  }

  if (["bigint", "function", "symbol"].includes(typeofValue)) {
    return null;
  }

  if (typeofValue === "string") {
    if (regex_Img_http.test(value)) {
      res = regex_https.test(res) ? "https" : "http";
    }

    if (extremTest_Assets(value)) {
      res = "assetImg";
    }

    if (regexColor.test(value)) {
      res = "color";
    }
  }

  if (typeofValue === "object" && value !== null) {
    if (isArray) {
      res = "array";
    } else {
      res = "object";

      if (detectSpecialObj(value, creteriaImgAsst)) {
        res = "assetImg";
      }
    }
  }

  if (typeofValue === "number") {
    res = "number";
  }

  if (typeofValue === "boolean") {
    res = "boolean";
  }

  return typeOfToJIType[res];
}

function swap(input, index_A, index_B) {
  var cloneInput = cloneDeep(input);
  var temp = cloneInput[index_A];
  cloneInput[index_A] = cloneInput[index_B];
  cloneInput[index_B] = temp;
  return cloneInput;
}

function arrayByNum(num) {
  return Array.from(new Array(num)).map(function (el, i) {
    return i.toString();
  });
}

function upFormVal(onAction, path, value, isItemArray, isKeys) {
  if (isKeys === void 0) {
    isKeys = false;
  }

  onAction(path, "updateValue", {
    updateValue: {
      iUpdate: isItemArray === false ? undefined : isItemArray,
      newKey: isKeys ? value : undefined,
      newValue: isKeys ? undefined : value
    },
    onArrVal: /]$/gm.test(path)
  });
}

function detectSpecialObj(obj, cr) {
  if (typeof obj !== "object" && Array.isArray(obj) === false) {
    return false;
  }

  var keys = Object.keys(obj);
  return cr.every(function (x) {
    return x.isRequired === true ? keys.includes(x.key) : true;
  });
}

var INIT_VALUES_BY_TYPE = {
  word: "",
  color: "rgb(255,255,255)",
  img: "https://i.redd.it/q7jrzsv9ri521.png",
  https: "https://i.redd.it/q7jrzsv9ri521.png",
  http: "http://jyamg.chezsuz.com/wp-content/uploads/2013/11/JYAMG-brentrup-mandoline-011.jpg",
  number: 0,
  array: [],
  object: {},
  "boolean": false,
  undefined: undefined,
  "null": null
};
var colorDeep = ["#32be32", "#3281be", "#8b32be", "#be3232", "#e6e600", "#e69600"];
var PAL_CNR = {
  word: {
    type: ["Tag", "Button", "Menu", "Mot", "Titre", "Phrase", "Descriptif", "Paragraphe", "Article"],
    width: ["court", "moyen", "long"]
  },
  assetImg: {
    format: ["Square", "Phone", "Bac"],
    type: ["Jpg", "Png", "Svg"]
  },
  key: {
    type: ["Single", "Complex", "ItemOf"],
    prim: ["string", "number", "boolean"],
    string: ["title", "desc", "subTitle", "item", "color", "colorRgb", "colorHex", "colorHex", "bg", "bgColor"],
    number: ["prct"],
    "boolean": ["is"],
    object: ["title-desc-subTitle"],
    array: ["WIP"]
  }
};
var CONST_PNLV = {
  next: "next__",
  choice: "choice__",
  custom: "______CUSTOM______"
};

var CONDITION_PANEL_VIEW = function CONDITION_PANEL_VIEW(customPic, txtI) {
  return {
    word: {
      type: PAL_CNR.word.type,
      choice__: [{
        Tag: PAL_CNR.word.width,
        choice__: [txtI.Tag.court, txtI.Tag.moyen, txtI.Tag["long"]]
      }, {
        Button: PAL_CNR.word.width,
        choice__: [txtI.Button.court, txtI.Button.moyen, txtI.Button["long"]]
      }, {
        Menu: PAL_CNR.word.width,
        choice__: [txtI.Menu.court, txtI.Menu.moyen, txtI.Menu["long"]]
      }, {
        Mot: PAL_CNR.word.width,
        choice__: [txtI.Mot.court, txtI.Mot.moyen, txtI.Mot["long"]]
      }, {
        Titre: PAL_CNR.word.width,
        choice__: [txtI.Titre.court, txtI.Titre.moyen, txtI.Titre["long"]]
      }, {
        Phrase: PAL_CNR.word.width,
        choice__: [txtI.Phrase.court, txtI.Phrase.moyen, txtI.Phrase["long"]]
      }, {
        Descriptif: PAL_CNR.word.width,
        choice__: [txtI.Descriptif.court, txtI.Descriptif.moyen, txtI.Descriptif["long"]]
      }, {
        Paragraphe: PAL_CNR.word.width,
        choice__: [txtI.Paragraphe.court, txtI.Paragraphe.moyen, txtI.Paragraphe["long"]]
      }, {
        Article: PAL_CNR.word.width,
        choice__: [txtI.Article.court, txtI.Article.moyen, txtI.Article["long"]]
      }]
    },
    assetImg: BUILD_PANEL_VIEW_IMG(customPic),
    key: {
      type: PAL_CNR.key.type,
      next__: {
        Primitif: PAL_CNR.key.prim,
        Object: PAL_CNR.key.object,
        Tableau: PAL_CNR.key.array,
        choice__: [{
          Mot: {
            next__: PAL_CNR.key.string
          },
          Nombre: PAL_CNR.key.number,
          Boolean: PAL_CNR.key["boolean"]
        }, ["WIP"], ["WIP"]]
      }
    }
  };
};

var BUILD_PANEL_VIEW_IMG = function BUILD_PANEL_VIEW_IMG(customImg) {
  var Jpg = customImg.Jpg,
      Png = customImg.Png;
  return {
    type: PAL_CNR.assetImg.type,
    choice__: [{
      format: PAL_CNR.assetImg.format,
      choice__: [arrayByKey(Jpg.Square), arrayByKey(Jpg.Phone), arrayByKey(Jpg.Bac)]
    }, {
      format: PAL_CNR.assetImg.format,
      choice__: [arrayByKey(Png.Square), arrayByKey(Png.Phone), arrayByKey(Png.Bac)]
    }, {
      format: PAL_CNR.assetImg.format,
      choice__: ["0", "0", "0"]
    }]
  };
};

var keyTemplate = {
  Single: {
    string: PAL_CNR.key.string,
    number: PAL_CNR.key.number,
    "boolean": PAL_CNR.key["boolean"]
  },
  Complex: PAL_CNR.key.object,
  ItemOf: PAL_CNR.key.array
};
var creteriaImgAsst = [{
  key: "__src__",
  isRequired: false
}, {
  key: "__Type__",
  isRequired: true
}, {
  key: "__Format__",
  isRequired: false
}, {
  key: "__isRdm__",
  isRequired: false
}, {
  key: "__i__",
  isRequired: false
}];
var STORE_KEY_LOCAL = "__JFI__";

var isJson = function isJson(str) {
  return /\{/gm.test(str) && /\}/gm.test(str) && /\:/gm.test(str);
};

var JsonFormInspect = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(JsonFormInspect, _Component2);

  function JsonFormInspect(props) {
    var _this;

    _this = _Component2.call(this, props) || this;
    _this.onAction = _this.onAction.bind(_assertThisInitialized(_this));
    _this.state = {
      inputKeys: "futureKeyName",
      objUpdate: {},
      objSave: {},
      valuePathChange: null,
      isLoad: false,
      isUpToDate: false
    };
    return _this;
  }

  var _proto2 = JsonFormInspect.prototype;

  _proto2.reboot = function reboot() {
    this.setState({
      objUpdate: this.props.obj_
    });
  };

  _proto2.onAction = function onAction(path, action, extra) {
    var _this2 = this;

    var objUpdate = cloneDeep(this.state.objUpdate);

    if (action === "onValidate") {
      this.props.onValidate(objUpdate);
    }

    if (action === "getJip") {
      return this.props;
    }

    if (action === "getStateObj") {
      return objUpdate;
    }

    if (action === "addValue" || action === "deleteValue" || action === "updateValue") {
      if (this.props.isMain !== false && extra.onArrVal === true) {
        this.setState({
          isUpToDate: false
        });
      }

      var reObjOnDel = action === "deleteValue";

      if (reObjOnDel === true) {
        this.setState({
          objUpdate: null
        });
        setTimeout(function () {
          _this2.setState({
            objUpdate: allJipOperation(cloneDeep(objUpdate), path, action, extra)
          });
        }, 500);
      } else {
        this.setState({
          objUpdate: allJipOperation(cloneDeep(objUpdate), path, action, extra)
        });
      }
    }

    if (action === "getObjByPath") {
      return path === "" ? this.onAction("", "getStateObj") : get(objUpdate, path);
    }
  };

  _proto2.componentDidMount = function componentDidMount() {
    this.setState({
      objUpdate: this.props.obj_,
      objSave: this.props.obj_,
      isLoad: true
    });
  };

  _proto2.getMaxLocalStorage = function getMaxLocalStorage() {
    var count = 0;

    while (typeof localStorage.getItem(STORE_KEY_LOCAL + count) === "string") {
      count = count + 1;
    }
    return count;
  };

  _proto2.downloadTemplateSave = function downloadTemplateSave() {
    var jsonDownload = arrayByNum(this.getMaxLocalStorage()).map(function (el) {
      var lclSt = localStorage.getItem(STORE_KEY_LOCAL + el) === null || localStorage.getItem(STORE_KEY_LOCAL + el) === undefined ? "" : localStorage.getItem(STORE_KEY_LOCAL + el);
      return isJson(lclSt) ? lclSt : JSON.stringify({
        "$__jsonDd__$": lclSt
      });
    });
    saveAs(jsonDownload.join(","), "JsonFormInspect_Template_.json");
  };

  _proto2.uploadTemplateSave = function uploadTemplateSave() {};

  _proto2.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        inputKeys = _this$state.inputKeys,
        objUpdate = _this$state.objUpdate,
        isLoad = _this$state.isLoad;

    if (isLoad === false) {
      return React.createElement(React.Fragment, null);
    } else {
      if (this.props.isMain === false && this.props.isUpdatingSecondary_Jip === true && this.state.isUpToDate === false) {
        this.setState({
          objUpdate: this.props.inherentValue,
          isUpToDate: true
        });
      }

      var _this$props = this.props,
          setting = _this$props.setting,
          IMG_INTERN = _this$props.IMG_INTERN,
          IMG_ASST = _this$props.IMG_ASST,
          isItemArray = _this$props.isItemArray,
          TextTemplate = _this$props.TextTemplate;
      var maxLocalStorage = this.getMaxLocalStorage();
      var extra = {
        inputKeys: inputKeys,
        IMG_INTERN: IMG_INTERN,
        IMG_ASST: IMG_ASST,
        TextTemplate: TextTemplate
      };
      return React.createElement("div", null, this.props.isWithAccessory === true ? React.createElement(React.Fragment, null, React.createElement("div", {
        style: {
          display: "flex"
        }
      }, React.createElement("p", null, "Configuration: "), React.createElement(Glass_, {
        text: "\u267B\uFE0F Reboot",
        onClick: function onClick() {
          _this3.reboot();
        }
      }), Object.keys(this.state.objSave) !== undefined && Object.keys(this.state.objSave).length !== 0 && isEqual(this.state.objUpdate, this.state.objSave) === false ? React.createElement(Glass_, {
        text: "\u23EA D\xE9faire",
        onClick: function onClick() {
          _this3.setState({
            objUpdate: null
          });

          setTimeout(function () {
            _this3.setState({
              objUpdate: _this3.state.objSave
            });
          }, 500);
        }
      }) : React.createElement(React.Fragment, null), React.createElement(Glass_, {
        text: "\uD83D\uDCBE Save",
        onClick: function onClick() {
          _this3.setState({
            objSave: objUpdate
          });
        }
      })), React.createElement("div", {
        style: {
          display: "flex"
        }
      }, React.createElement("p", null, "Stockage navigateur: "), React.createElement(DropDownSquish, {
        lght: 8,
        onChange_: function onChange_(choice) {
          var res = localStorage.getItem(STORE_KEY_LOCAL + choice);

          _this3.setState({
            objUpdate: isJson(res) ? JSON.parse(res) : res
          });
        },
        choices: arrayByNum(this.getMaxLocalStorage())
      }), React.createElement(Glass_, {
        text: "\uD83D\uDCBE Save N+1",
        onClick: function onClick() {
          localStorage.setItem(STORE_KEY_LOCAL + maxLocalStorage, typeof objUpdate === "object" && objUpdate !== null && objUpdate !== undefined ? JSON.stringify(objUpdate) : objUpdate === null ? "null" : objUpdate === undefined ? "undefined" : String(objUpdate));
        }
      }), React.createElement(Glass_, {
        text: "\uD83D\uDCE4 Upload Json",
        onClick: function onClick() {
          _this3.uploadTemplateSave();
        }
      }), React.createElement(Glass_, {
        text: "\uD83D\uDCE5 to Files N+1",
        onClick: function onClick() {
          _this3.downloadTemplateSave();
        }
      })), React.createElement("div", {
        style: {
          display: "flex"
        }
      }, React.createElement("img", {
        src: extra.IMG_INTERN.JsonForm.key,
        style: {
          width: 40
        }
      }), "Nouveaux Clefs : ", React.createElement("input", {
        style: {
          width: 200,
          height: 40,
          border: "3px orange solid"
        },
        value: inputKeys,
        onChange: function onChange(e) {
          _this3.setState({
            inputKeys: e.currentTarget.value
          });
        }
      }))) : React.createElement(React.Fragment, null), React.createElement("div", {
        className: "jsonInspector"
      }, React.createElement(RenderInputByType_Jip, Object.assign({}, {
        extra: extra,
        setting: setting,
        handleValue: undefined,
        deep: 0,
        isItemArray: isItemArray,
        isKeys: false,
        onAction: this.onAction,
        inherentValue: objUpdate,
        type: returnType(objUpdate),
        path: ""
      }))), React.createElement("div", {
        className: "JIP_Valid"
      }, React.createElement(Glass_, {
        text: "\uD83D\uDEA8 Valider \uD83D\uDEA8",
        onClick: function onClick() {
          _this3.onAction("", "onValidate");
        }
      })));
    }
  };

  return JsonFormInspect;
}(Component);

var Number_Jip = /*#__PURE__*/function (_Component3) {
  _inheritsLoose(Number_Jip, _Component3);

  function Number_Jip(props) {
    var _this4;

    _this4 = _Component3.call(this, props) || this;
    _this4.state = {
      value: 0
    };
    return _this4;
  }

  var _proto3 = Number_Jip.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    var inherentValue = this.props.inherentValue;
    var realValue = inherentValue;
    this.setState({
      value: realValue
    });
  };

  _proto3.form = function form() {
    var _this5 = this;

    var _this$props2 = this.props,
        isItemArray = _this$props2.isItemArray,
        path = _this$props2.path,
        onAction = _this$props2.onAction;
    return React.createElement("input", {
      onChange: function onChange(e) {
        var val = e.currentTarget.value;
        var value = parseInt(typeof val !== "string" || /^[0-9]+$/gi.test(val) === false ? "0" : val, 10);

        _this5.setState({
          value: value
        });
      },
      onMouseDown: function onMouseDown(e) {
        var val = e.currentTarget.value;
        var value = parseInt(typeof val !== "string" || /^[0-9]+$/gi.test(val) === false ? "0" : val, 10);

        _this5.setState({
          value: value
        });

        upFormVal(onAction, path, value, isItemArray);
      },
      type: "range",
      min: 0,
      max: 100,
      step: 1,
      value: "" + this.state.value,
      style: {
        width: 50
      }
    });
  };

  _proto3.render = function render() {
    var _this$props3 = this.props,
        permission = _this$props3.permission,
        isItemArray = _this$props3.isItemArray,
        extra = _this$props3.extra;
    return typeof isItemArray === "number" ? this.form() : React.createElement("div", {
      style: {
        marginRight: 10
      }
    }, React.createElement("div", {
      style: {
        position: "relative",
        height: 40,
        display: "flex"
      }
    }, React.createElement("img", {
      style: {
        height: 20,
        width: 20
      },
      src: extra == null ? void 0 : extra.IMG_INTERN.JsonForm.value
    }), React.createElement("p", null, "Val")), permission.value === false ? React.createElement("div", {
      style: {
        display: "grid"
      }
    }, this.form(), React.createElement("p", null, this.state.value)) : React.createElement("p", null, this.state.value));
  };

  return Number_Jip;
}(Component);

var Array_Jip = /*#__PURE__*/function (_Component4) {
  _inheritsLoose(Array_Jip, _Component4);

  function Array_Jip(props) {
    var _this6;

    _this6 = _Component4.call(this, props) || this;
    _this6.state = {
      swapItemArr: {
        iBegin: null,
        iEnd: null
      },
      iUpdating: null,
      arrNow: null
    };
    return _this6;
  }

  var _proto4 = Array_Jip.prototype;

  _proto4.updateStateArr = function updateStateArr() {
    var _this7 = this;

    var inherentValue = this.props.inherentValue;

    if (this.state.arrNow !== null && this.state.arrNow.length !== 0 && this.state.arrNow.length === inherentValue.length) {
      this.setState({
        iUpdating: inherentValue.map(function (elA, iA) {
          return isEqual(elA, _this7.state.arrNow[iA]);
        }).findIndex(function (x) {
          return x === false;
        })
      });
    } else {
      this.setState({
        iUpdating: null
      });
    }

    if (this.state.arrNow === null) {
      this.setState({
        arrNow: inherentValue
      });
    } else {
      this.setState({
        arrNow: inherentValue
      });
    }
  };

  _proto4.render = function render() {
    var _this8 = this;

    var _this$props4 = this.props,
        deep = _this$props4.deep,
        onAction = _this$props4.onAction,
        extra = _this$props4.extra,
        inherentValue = _this$props4.inherentValue,
        path = _this$props4.path;
    var _this$state2 = this.state,
        swapItemArr = _this$state2.swapItemArr,
        arrNow = _this$state2.arrNow;
    var propsJip = onAction("", "getJip");

    if (arrNow !== inherentValue) {
      this.updateStateArr();
    }

    return React.createElement("div", {
      className: "Array",
      style: {
        borderStyle: "dotted",
        borderColor: colorDeep[deep],
        borderWidth: 3
      }
    }, typeof swapItemArr.iBegin === "number" && typeof swapItemArr.iEnd === "number" && inherentValue !== undefined ? React.createElement("div", {
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 500
      }
    }, React.createElement(Glass_, {
      text: "\u2195\uFE0F",
      onClick: function onClick() {
        onAction(path, "updateValue", {
          onArrVal: false,
          updateValue: {
            newValue: swap(inherentValue, _this8.state.swapItemArr.iBegin, _this8.state.swapItemArr.iEnd)
          }
        });

        _this8.setState({
          swapItemArr: {
            iBegin: null,
            iEnd: null
          }
        });
      }
    })) : React.createElement(React.Fragment, null), inherentValue.map(function (itemValue, i) {
      var type = returnType(itemValue);
      return React.createElement("div", null, React.createElement("div", {
        style: {
          display: "flex"
        }
      }, React.createElement("div", {
        className: "minus"
      }, React.createElement(Glass_, {
        text: "\u2796",
        onClick: function onClick() {
          onAction(path, "deleteValue", {
            onArrVal: true,
            deleteValue: {
              supprI: i
            }
          });
        }
      })), React.createElement("div", {
        style: {
          position: "relative",
          width: 44,
          margin: 5,
          marginRight: 10
        }
      }, React.createElement("p", {
        className: "linkInSwapBut"
      }, swapItemArr.iBegin === i ? "🪂" : swapItemArr.iEnd === i ? "🎯" : "🖱️"), React.createElement("div", {
        style: {
          cursor: "pointer",
          position: "absolute",
          top: 0,
          left: 0
        },
        onClick: function onClick() {
          if (_this8.state.swapItemArr.iBegin === null) {
            _this8.setState({
              swapItemArr: {
                iBegin: swapItemArr.iBegin === i ? null : i,
                iEnd: _this8.state.swapItemArr.iEnd
              }
            });
          }

          if (typeof _this8.state.swapItemArr.iBegin === "number" && _this8.state.swapItemArr.iEnd === null) {
            _this8.setState({
              swapItemArr: {
                iBegin: swapItemArr.iBegin,
                iEnd: swapItemArr.iBegin === i ? null : i
              }
            });
          }

          if (typeof _this8.state.swapItemArr.iBegin === "number" && typeof _this8.state.swapItemArr.iEnd === "number") {
            _this8.setState({
              swapItemArr: {
                iBegin: null,
                iEnd: null
              }
            });
          }
        }
      }, React.createElement(RadientNum, {
        txt: i.toString()
      }))), React.createElement(JsonFormInspect, Object.assign({}, _extends({}, propsJip, {
        inherentValue: itemValue,
        obj_: itemValue,
        onValidate: function onValidate(obj) {
          onAction(path, "updateValue", {
            updateValue: {
              iUpdate: i,
              newValue: obj
            },
            onArrVal: true
          });
        },
        onUpdate: function onUpdate() {},
        isWithAccessory: false,
        isItemArray: i,
        isMain: false,
        isUpdatingSecondary_Jip: i === _this8.state.iUpdating ? true : false
      }))), React.createElement(DropButton, {
        imgMain: returnImgByType(type, extra == null ? void 0 : extra.IMG_INTERN.Type),
        jsx_Picture: toTypeByType(type.main, itemValue, function (value) {
          _this8.setState({});

          onAction(path, "updateValue", {
            updateValue: {
              iUpdate: i,
              newValue: value
            },
            onArrVal: true
          });
        }, extra.IMG_INTERN.Type)
      }), convertsButton(function (value) {
        onAction(path, "updateValue", {
          updateValue: {
            iUpdate: i,
            newValue: value
          },
          onArrVal: true
        });
      }, extra.IMG_ASST.Jpg.Bac[0], extra == null ? void 0 : extra.IMG_INTERN.Type, extra == null ? void 0 : extra.IMG_INTERN.Extra.multi)));
    }), React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, React.createElement(Glass_, {
      text: "\u2795 1ier Item",
      onClick: function onClick() {
        onAction(path, "addValue", {
          onArrVal: true
        });
      }
    })));
  };

  return Array_Jip;
}(Component);

var Obj_Jip = /*#__PURE__*/function (_Component5) {
  _inheritsLoose(Obj_Jip, _Component5);

  function Obj_Jip() {
    return _Component5.apply(this, arguments) || this;
  }

  var _proto5 = Obj_Jip.prototype;

  _proto5.render = function render() {
    var _this$props5 = this.props,
        deep = _this$props5.deep,
        setting = _this$props5.setting,
        extra = _this$props5.extra,
        path = _this$props5.path,
        onAction = _this$props5.onAction,
        isItemArray = _this$props5.isItemArray,
        inherentValue = _this$props5.inherentValue;
    var currentObj = onAction(path, "getObjByPath");
    return React.createElement("div", {
      className: "Obj",
      style: {
        display: "flex",
        marginLeft: 5
      }
    }, React.createElement("input", {
      type: "checkbox",
      className: "displayHide__input"
    }), React.createElement("div", {
      className: "displayHide__content",
      style: {
        border: colorDeep[deep] + " 5px solid",
        margin: deep * 10
      }
    }, Object.keys(currentObj).map(function (keysObj) {
      var newPath = pathLoBuild(path, "Object", {
        sub: keysObj,
        i: 0
      });
      return React.createElement(PairKeyValue_Jip, Object.assign({}, {
        path: newPath,
        deep: deep + 1,
        initKey: keysObj,
        initValue: currentObj[keysObj],
        isItemArray: false,
        setting: setting,
        onAction: onAction,
        extra: extra,
        isWithAccessory: true
      }));
    }), React.createElement(AddButtons_Jip, Object.assign({}, {
      onAction: onAction,
      extra: extra,
      isItemArray: isItemArray,
      inherentValue: inherentValue,
      deep: deep,
      setting: setting,
      isAutoFill: setting.autoFillDangerous,
      path: path
    }))));
  };

  return Obj_Jip;
}(Component);

var AddButtons_Jip = /*#__PURE__*/function (_Component6) {
  _inheritsLoose(AddButtons_Jip, _Component6);

  function AddButtons_Jip() {
    return _Component6.apply(this, arguments) || this;
  }

  var _proto6 = AddButtons_Jip.prototype;

  _proto6.mainOperation = function mainOperation(value) {
    var _this$props6 = this.props,
        onAction = _this$props6.onAction,
        extra = _this$props6.extra,
        isItemArray = _this$props6.isItemArray,
        path = _this$props6.path;
    onAction(pathLoBuild(path, "Object", {
      sub: extra.inputKeys,
      i: 0
    }), "addValue", {
      addValue: {
        newKey: isItemArray === false ? extra.inputKeys : undefined,
        newValue: value
      },
      onArrVal: false
    });
  };

  _proto6.render = function render() {
    var _this9 = this;

    return React.createElement("div", {
      style: {
        display: "flex"
      },
      className: "ButtonsAdd"
    }, React.createElement(Glass_, {
      text: "\u2795 Txt",
      onClick: function onClick() {
        _this9.mainOperation(INIT_VALUES_BY_TYPE.word);
      }
    }), React.createElement(Glass_, {
      text: "\u2795 Obj",
      onClick: function onClick() {
        _this9.mainOperation(INIT_VALUES_BY_TYPE.object);
      }
    }), React.createElement(Glass_, {
      text: "\u2795 Tab",
      onClick: function onClick() {
        _this9.mainOperation(INIT_VALUES_BY_TYPE.array);
      }
    }));
  };

  return AddButtons_Jip;
}(Component);

var PairKeyValue_Jip = /*#__PURE__*/function (_Component7) {
  _inheritsLoose(PairKeyValue_Jip, _Component7);

  function PairKeyValue_Jip() {
    return _Component7.apply(this, arguments) || this;
  }

  var _proto7 = PairKeyValue_Jip.prototype;

  _proto7.render = function render() {
    var _this$props7 = this.props,
        onAction = _this$props7.onAction,
        setting = _this$props7.setting,
        extra = _this$props7.extra,
        deep = _this$props7.deep,
        isItemArray = _this$props7.isItemArray,
        path = _this$props7.path,
        initKey = _this$props7.initKey,
        initValue = _this$props7.initValue;
    var typeProps = returnType(initValue);
    return React.createElement("div", {
      style: {
        display: "flex"
      }
    }, React.createElement(RenderInputByType_Jip, Object.assign({}, {
      deep: deep,
      extra: extra,
      onAction: onAction,
      setting: setting,
      inherentValue: initKey,
      path: path,
      type: typeOfToJIType["word"],
      isItemArray: isItemArray,
      isKeys: true
    })), React.createElement(RenderInputByType_Jip, Object.assign({}, {
      deep: deep,
      extra: extra,
      onAction: onAction,
      setting: setting,
      type: typeProps,
      path: path,
      inherentValue: initValue,
      isItemArray: isItemArray,
      isKeys: false
    })), React.createElement("div", {
      style: {
        display: "flex"
      },
      className: "minus"
    }, React.createElement(Glass_, {
      text: "\u2796",
      onClick: function onClick() {
        onAction(path, "deleteValue", {
          deleteValue: {
            supprKey: initKey
          },
          onArrVal: false
        });
      }
    })));
  };

  return PairKeyValue_Jip;
}(Component);

var Color_Jip = /*#__PURE__*/function (_Component8) {
  _inheritsLoose(Color_Jip, _Component8);

  function Color_Jip(props) {
    var _this10;

    _this10 = _Component8.call(this, props) || this;
    _this10.state = {
      value: "",
      colorMode: null
    };
    return _this10;
  }

  var _proto8 = Color_Jip.prototype;

  _proto8.componentDidMount = function componentDidMount() {
    var inherentValue = this.props.inherentValue;
    var realValue = inherentValue;
    var colorMode = regex_Rgb.test(realValue) ? "Rgb" : regex_Hex.test(realValue) ? "Hex" : regex_Hsl.test(realValue) ? "Hsl" : "None";

    if (colorMode === "None") {
      this.setState({
        value: INIT_VALUES_BY_TYPE.color,
        colorMode: "Rgb"
      });
    } else {
      this.setState({
        value: realValue,
        colorMode: colorMode
      });
    }
  };

  _proto8.render = function render() {
    var _this11 = this;

    var _this$props8 = this.props,
        extra = _this$props8.extra,
        isItemArray = _this$props8.isItemArray,
        onAction = _this$props8.onAction,
        path = _this$props8.path;
    return React.createElement("div", null, React.createElement(SketchPicker, {
      color: this.state.value,
      onChange: function onChange(e) {
        var hsl = e.hsl;
        var rgb = e.rgb;
        var value = _this11.state.value;
        var colorValueSend = "";

        if (/^#/gm.test(value) || extra.colorMode === "Hex") {
          colorValueSend = e.hex;
        }

        if (/rgb/gm.test(value) || extra.colorMode === "Rgb") {
          colorValueSend = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
        }

        if (/hsl/gm.test(value) === true || extra.colorMode === "Hsl") {
          colorValueSend = "hsl(" + hsl.h + ", " + hsl.s * 100 + "%, " + hsl.l * 100 + "%)";
        }

        _this11.setState({
          value: colorValueSend
        });

        upFormVal(onAction, path, colorValueSend, isItemArray);
      }
    }), React.createElement(DropDownSquish, {
      lght: 10,
      choices: ["Rgb", "Hsl", "Hex"],
      onChange_: function onChange_(color) {
        if (_this11.state.colorMode === color) ; else {
          var value = _this11.state.value;

          if (color === "Hex" && _this11.state.colorMode === "Rgb") {
            value = rgbToHex.apply(void 0, strToRgb(value));
          }

          if (color === "Hsl" && _this11.state.colorMode === "Rgb") {
            value = rgbToHsl.apply(void 0, strToRgb(value));
          }

          if (color === "Hex" && _this11.state.colorMode === "Hsl") {
            value = hslToHex.apply(void 0, strToHsl(value));
          }

          if (color === "Rgb" && _this11.state.colorMode === "Hsl") {
            value = hslToRgb.apply(void 0, strToHsl(value));
          }

          if (color === "Rgb" && _this11.state.colorMode === "Hex") {
            value = hexToRGB(value);
          }

          if (color === "Hsl" && _this11.state.colorMode === "Hex") {
            value = hexToHsl(value);
          }

          _this11.setState({
            value: value,
            colorMode: color
          });
        }
      }
    }));
  };

  return Color_Jip;
}(Component);

var AssetImg_Jip = /*#__PURE__*/function (_Component9) {
  _inheritsLoose(AssetImg_Jip, _Component9);

  function AssetImg_Jip(props) {
    var _this12;

    _this12 = _Component9.call(this, props) || this;
    _this12.state = {
      value: undefined
    };
    return _this12;
  }

  var _proto9 = AssetImg_Jip.prototype;

  _proto9.componentDidMount = function componentDidMount() {
    var _extra$IMG_ASST;

    var _this$props9 = this.props,
        inherentValue = _this$props9.inherentValue,
        extra = _this$props9.extra;
    this.setState({
      value: extremTest_Assets(inherentValue) ? inherentValue : extra == null ? void 0 : (_extra$IMG_ASST = extra.IMG_ASST) == null ? void 0 : _extra$IMG_ASST.Jpg.Bac[0]
    });
  };

  _proto9.componentDidUpdate = function componentDidUpdate() {
    var _this$props10 = this.props,
        inherentValue = _this$props10.inherentValue,
        extra = _this$props10.extra;

    if (this.state.value !== inherentValue) {
      var _extra$IMG_ASST2;

      this.setState({
        value: extremTest_Assets(inherentValue) ? inherentValue : extra == null ? void 0 : (_extra$IMG_ASST2 = extra.IMG_ASST) == null ? void 0 : _extra$IMG_ASST2.Jpg.Bac[0]
      });
    }
  };

  _proto9.render = function render() {
    return React.createElement("div", {
      className: "AssetImg",
      style: {
        marginLeft: 20
      }
    }, typeof this.state.value === "string" ? React.createElement("img", {
      src: this.state.value,
      style: {
        border: "2px red dotted",
        width: 100,
        height: 100
      }
    }) : React.createElement(React.Fragment, null));
  };

  return AssetImg_Jip;
}(Component);

var ImgHttpOrS = /*#__PURE__*/function (_Component10) {
  _inheritsLoose(ImgHttpOrS, _Component10);

  function ImgHttpOrS(props) {
    var _this13;

    _this13 = _Component10.call(this, props) || this;
    _this13.state = {
      value: ""
    };
    return _this13;
  }

  var _proto10 = ImgHttpOrS.prototype;

  _proto10.componentDidMount = function componentDidMount() {
    var inherentValue = this.props.inherentValue;
    var initValue = inherentValue;
    var realValue = regex_Img_http.test(initValue) ? initValue : INIT_VALUES_BY_TYPE.https;
    var isHttps = regex_https.test(realValue);
    var baseUrl = realValue.match(regex_BaseUrlHttp)[0].replace(regex_Img_http, "");
    this.setState({
      value: realValue.replace(baseUrl, "").replace(regex_Img_http, ""),
      baseUrl: baseUrl,
      isHttps: isHttps
    });
  };

  _proto10.builtHttp = function builtHttp() {
    return "http" + (this.state.isHttps ? "s" : "") + "://" + this.state.baseUrl + this.state.value;
  };

  _proto10.render = function render() {
    var extra = this.props.extra;
    return React.createElement("div", {
      className: "Http_s",
      style: {
        position: "relative",
        width: 375,
        height: 200
      }
    }, React.createElement(InputHttp, Object.assign({}, {
      color: "",
      img: {
        http: extra.IMG_INTERN.Extra.logoHttp,
        https: extra.IMG_INTERN.Extra.logoHttps,
        input: extra.IMG_INTERN.Extra.inputHttp
      },
      isS: this.state.isHttps === true,
      words: {
        desc: this.state.value,
        title: this.state.baseUrl
      }
    })));
  };

  return ImgHttpOrS;
}(Component);

var InputHttp = /*#__PURE__*/function (_Component11) {
  _inheritsLoose(InputHttp, _Component11);

  function InputHttp() {
    return _Component11.apply(this, arguments) || this;
  }

  var _proto11 = InputHttp.prototype;

  _proto11.render = function render() {
    var _this$props11 = this.props,
        words = _this$props11.words,
        isS = _this$props11.isS,
        img = _this$props11.img;
    return React.createElement("div", {
      className: "InputHttp_Cpnt"
    }, React.createElement("img", {
      src: img.input,
      style: {
        position: "absolute",
        top: 0,
        height: "100%",
        zIndex: 3
      }
    }), React.createElement("img", {
      src: isS ? img.https : img.http,
      className: "emblem"
    }), React.createElement("p", {
      className: "title"
    }, words.title), React.createElement("p", {
      className: "desc"
    }, words.desc), React.createElement("div", {
      className: "emblemColor",
      style: {
        backgroundColor: isS ? "#7CC97D" : "#FB9F9F"
      }
    }), React.createElement("div", {
      className: "descColor",
      style: {
        backgroundColor: isS ? "#7CC97D" : "#FB9F9F"
      }
    }));
  };

  return InputHttp;
}(Component);

var cssStyleInput = {
  width: 200,
  height: 35,
  margin: 30,
  border: "black solid 2px"
};

var Word_Jip = /*#__PURE__*/function (_Component12) {
  _inheritsLoose(Word_Jip, _Component12);

  function Word_Jip(props) {
    var _this14;

    _this14 = _Component12.call(this, props) || this;
    _this14.state = {
      value: "",
      firstChange: ""
    };
    return _this14;
  }

  var _proto12 = Word_Jip.prototype;

  _proto12.componentDidMount = function componentDidMount() {
    var inherentValue = this.props.inherentValue;
    this.setState({
      value: inherentValue
    });
  };

  _proto12.form = function form() {
    var _this15 = this;

    var _this$props12 = this.props,
        permission = _this$props12.permission,
        isKeys = _this$props12.isKeys,
        onAction = _this$props12.onAction,
        isItemArray = _this$props12.isItemArray,
        path = _this$props12.path,
        inherentValue = _this$props12.inherentValue;
    return isKeys && permission.key || permission.value && isKeys === false ? React.createElement("p", null, this.state.value) : React.createElement("div", {
      style: {
        display: "flex"
      },
      className: "minus"
    }, React.createElement("input", {
      style: _extends({}, cssStyleInput, {
        margin: 5,
        width: 50
      }),
      onChange: function onChange(e) {
        var value = e.currentTarget.value;

        _this15.setState({
          value: value
        });
      },
      value: this.state.value
    }), this.state.value !== inherentValue ? React.createElement(Glass_, {
      text: "\u2714\uFE0F",
      onClick: function onClick() {
        upFormVal(onAction, path, _this15.state.value, isItemArray, isKeys);
      }
    }) : React.createElement(React.Fragment, null));
  };

  _proto12.render = function render() {
    var _this$props13 = this.props,
        isKeys = _this$props13.isKeys,
        isItemArray = _this$props13.isItemArray,
        extra = _this$props13.extra;
    return typeof isItemArray === "number" ? this.form() : React.createElement("div", {
      style: {
        position: "relative",
        marginRight: isKeys === false ? 10 : 0
      }
    }, isKeys ? React.createElement("div", {
      style: {
        display: "flex"
      }
    }, React.createElement("img", {
      style: {
        height: 20,
        width: 20
      },
      src: extra.IMG_INTERN.JsonForm.key
    }), React.createElement("p", null, "Clef")) : React.createElement("div", {
      style: {
        display: "flex"
      }
    }, React.createElement("img", {
      style: {
        height: 20,
        width: 20
      },
      src: extra.IMG_INTERN.JsonForm.value
    }), React.createElement("p", null, "Val")), this.form());
  };

  return Word_Jip;
}(Component);

var Boolean_Jip = /*#__PURE__*/function (_Component13) {
  _inheritsLoose(Boolean_Jip, _Component13);

  function Boolean_Jip(props) {
    var _this16;

    _this16 = _Component13.call(this, props) || this;
    _this16.state = {
      value: false
    };
    return _this16;
  }

  var _proto13 = Boolean_Jip.prototype;

  _proto13.componentDidMount = function componentDidMount() {
    var inherentValue = this.props.inherentValue;
    var realValue = inherentValue;
    this.setState({
      value: realValue
    });
  };

  _proto13.form = function form() {
    var _this17 = this;

    var _this$props14 = this.props,
        isItemArray = _this$props14.isItemArray,
        onAction = _this$props14.onAction,
        path = _this$props14.path;
    return React.createElement("input", {
      style: {
        width: 40,
        height: 40
      },
      type: "checkbox",
      checked: this.state.value,
      onChange: function onChange(e) {
        var value = e.currentTarget.checked;

        _this17.setState({
          value: value
        });

        upFormVal(onAction, path, value, isItemArray);
      }
    });
  };

  _proto13.render = function render() {
    var _extra$IMG_INTERN;

    var _this$props15 = this.props,
        isItemArray = _this$props15.isItemArray,
        extra = _this$props15.extra;
    return typeof isItemArray === "number" ? this.form() : React.createElement("div", {
      style: {
        position: "relative",
        marginRight: 10
      }
    }, React.createElement("div", {
      style: {
        position: "relative",
        height: 40,
        width: "100%",
        display: "flex"
      }
    }, React.createElement("img", {
      style: {
        height: 20,
        width: 20
      },
      src: (_extra$IMG_INTERN = extra.IMG_INTERN) == null ? void 0 : _extra$IMG_INTERN.JsonForm.value
    }), React.createElement("p", null, "Val")), this.form());
  };

  return Boolean_Jip;
}(Component);

var cssImgOnlyRender = {
  width: 100,
  height: 100,
  border: "red 7px ridge"
};

var RenderInputByType_Jip = /*#__PURE__*/function (_Component14) {
  _inheritsLoose(RenderInputByType_Jip, _Component14);

  function RenderInputByType_Jip() {
    return _Component14.apply(this, arguments) || this;
  }

  var _proto14 = RenderInputByType_Jip.prototype;

  _proto14.render = function render() {
    var _this$props16 = this.props,
        isKeys = _this$props16.isKeys,
        type = _this$props16.type,
        setting = _this$props16.setting,
        extra = _this$props16.extra,
        isItemArray = _this$props16.isItemArray,
        onAction = _this$props16.onAction,
        deep = _this$props16.deep,
        inherentValue = _this$props16.inherentValue,
        path = _this$props16.path;
    var isReadKey = false;
    var isReadValue = false;
    var permission = {
      isAutoFill: setting.autoFillDangerous,
      key: isReadKey,
      value: isReadValue
    };
    var genData = {
      extra: extra,
      permission: permission,
      isItemArray: isItemArray,
      isKeys: isKeys,
      inherentValue: inherentValue,
      onAction: onAction,
      path: path
    };
    var KeyManip = type === typeOfToJIType.word && isKeys === true ? React.createElement(BasicModal, Object.assign({}, {
      onAction: onAction,
      path: path,
      type: "key",
      onArrVal: false,
      data: keyTemplate,
      custom: extra.IMG_ASST,
      textIndu: extra.TextTemplate
    })) : React.createElement(React.Fragment, null);
    return React.createElement("div", {
      style: {
        display: "flex"
      }
    }, KeyManip, type === typeOfToJIType.word ? React.createElement(Word_Jip, Object.assign({}, genData)) : typeOfToJIType.assetImg === type ? React.createElement(AssetImg_Jip, Object.assign({}, genData)) : typeOfToJIType.http === type || typeOfToJIType.https === type ? React.createElement(ImgHttpOrS, Object.assign({}, genData)) : typeOfToJIType.color === type ? React.createElement(Color_Jip, Object.assign({}, genData)) : typeOfToJIType.number === type ? React.createElement(Number_Jip, Object.assign({}, genData)) : typeOfToJIType["boolean"] === type ? React.createElement(Boolean_Jip, Object.assign({}, genData)) : typeOfToJIType.array === type ? React.createElement(Array_Jip, Object.assign({}, {
      deep: deep,
      extra: extra,
      isItemArray: isItemArray,
      onAction: onAction,
      setting: setting,
      inherentValue: inherentValue,
      path: path
    })) : typeOfToJIType.object === type ? React.createElement(Obj_Jip, Object.assign({}, {
      path: path,
      sub: genData,
      isItemArray: isItemArray,
      deep: deep,
      setting: setting,
      extra: extra,
      onAction: onAction,
      inherentValue: inherentValue
    })) : typeOfToJIType["null"] === type ? React.createElement("img", {
      style: _extends({}, cssImgOnlyRender, {
        width: 55,
        height: 55,
        marginRight: 5
      }),
      src: returnImgByType(null, extra.IMG_INTERN.Type)
    }) : typeOfToJIType.undefined === type ? React.createElement("img", {
      style: _extends({}, cssImgOnlyRender, {
        width: 55,
        height: 55,
        marginRight: 5
      }),
      src: returnImgByType(undefined, extra.IMG_INTERN.Type)
    }) : React.createElement(React.Fragment, null), isKeys === false ? React.createElement("div", {
      style: {
        display: "flex",
        marginLeft: -8
      },
      className: "minus"
    }, typeOfToJIType.word === type ? React.createElement(BasicModal, Object.assign({}, {
      data: extra.TextTemplate,
      onAction: onAction,
      path: path,
      type: "word",
      iUpdate: isItemArray !== false ? isItemArray : undefined,
      onArrVal: isItemArray !== false,
      custom: extra.IMG_ASST,
      textIndu: extra.TextTemplate
    })) : React.createElement(React.Fragment, null), typeOfToJIType.assetImg === type ? React.createElement(BasicModal, Object.assign({}, {
      data: extra.IMG_ASST,
      custom: extra.IMG_ASST,
      onAction: onAction,
      path: path,
      type: "assetImg",
      iUpdate: isItemArray !== false ? isItemArray : undefined,
      onArrVal: isItemArray !== false,
      textIndu: extra.TextTemplate
    })) : React.createElement(React.Fragment, null), isItemArray === false ? React.createElement("div", {
      style: {
        display: "flex"
      }
    }, React.createElement(DropButton, {
      imgMain: returnImgByType(type, extra.IMG_INTERN.Type),
      jsx_Picture: toTypeByType(type.main, inherentValue, function (value) {
        upFormVal(onAction, path, value, isItemArray);
      }, extra.IMG_INTERN.Type)
    }), convertsButton(function (value) {
      upFormVal(onAction, path, value, isItemArray);
    }, extra.IMG_ASST.Jpg.Bac[0], extra.IMG_INTERN.Type, extra.IMG_INTERN.Extra.multi)) : React.createElement(React.Fragment, null)) : React.createElement(React.Fragment, null));
  };

  return RenderInputByType_Jip;
}(Component);

var DropDownSquish = /*#__PURE__*/function (_Component15) {
  _inheritsLoose(DropDownSquish, _Component15);

  function DropDownSquish(props) {
    var _this18;

    _this18 = _Component15.call(this, props) || this;
    _this18.state = {
      active: false,
      value: "",
      prvsInherent: undefined
    };
    return _this18;
  }

  var _proto15 = DropDownSquish.prototype;

  _proto15.componentDidMount = function componentDidMount() {
    if (typeof this.props.initValue === "string") {
      this.setState({
        prvsInherent: this.props.initValue,
        value: this.props.initValue
      });
    } else {
      this.setState({
        prvsInherent: this.props.initValue
      });
    }
  };

  _proto15.affectValue = function affectValue(value) {
    this.setState({
      value: value.length > this.props.lght ? value.substring(0, this.props.lght) + "..." : value
    });
  };

  _proto15.componentDidUpdate = function componentDidUpdate() {
    if (this.props.initValue !== this.state.prvsInherent && typeof this.props.initValue === "string") {
      {
        this.setState({
          prvsInherent: this.props.initValue
        });
        this.affectValue(this.props.initValue);
      }
    }
  };

  _proto15.handleActive = function handleActive(active) {
    this.setState({
      active: active
    });
  };

  _proto15.handleValue = function handleValue(value) {
    this.affectValue(value);
  };

  _proto15.render = function render() {
    var _this19 = this;

    var _this$props17 = this.props,
        choices = _this$props17.choices,
        onChange_ = _this$props17.onChange_;
    return React.createElement("form", {
      className: "dropDownSquish"
    }, React.createElement("input", {
      className: "chosen-value chosen-value1",
      type: "text",
      value: this.state.value,
      onChange: function onChange(e) {
        _this19.handleValue(e.target.value);
      },
      placeholder: "Type to filter",
      onClick: function onClick() {
        _this19.handleActive(!_this19.state.active);
      }
    }), React.createElement("ul", {
      className: "value-list value-list1 " + (this.state.active ? " open" : "")
    }, choices.map(function (li) {
      return React.createElement("li", {
        onClick: function onClick(e) {
          _this19.handleValue(e.currentTarget.textContent);

          _this19.handleActive(!_this19.state.active);

          if (onChange_ !== undefined) {
            onChange_(li);
          }
        },
        className: "valueFilter1" + (_this19.state.active ? "" : " closed")
      }, li);
    })));
  };

  return DropDownSquish;
}(Component);

var Glass_ = /*#__PURE__*/function (_Component16) {
  _inheritsLoose(Glass_, _Component16);

  function Glass_(props) {
    return _Component16.call(this, props) || this;
  }

  var _proto16 = Glass_.prototype;

  _proto16.render = function render() {
    var _this$props18 = this.props,
        text = _this$props18.text,
        href = _this$props18.href,
        link = _this$props18.link,
        _onClick = _this$props18.onClick;
    return React.createElement("div", {
      className: "glassEffect",
      onClick: function onClick() {
        if (_onClick === undefined) ; else {
          _onClick();
        }
      }
    }, React.createElement("div", {
      className: "container"
    }, link !== undefined ? React.createElement(Link, {
      to: link,
      href: href
    }, React.createElement("div", {
      className: "btn effect01"
    }, React.createElement("span", null, text))) : React.createElement("a", {
      href: href,
      className: "btn effect01"
    }, React.createElement("span", null, text))));
  };

  return Glass_;
}(Component);

var RadientNum = /*#__PURE__*/function (_Component17) {
  _inheritsLoose(RadientNum, _Component17);

  function RadientNum() {
    return _Component17.apply(this, arguments) || this;
  }

  var _proto17 = RadientNum.prototype;

  _proto17.render = function render() {
    return React.createElement("div", {
      className: "RadientNum"
    }, React.createElement("h1", {
      className: "GradientBorder"
    }, this.props.txt));
  };

  return RadientNum;
}(Component);

var DropButton = /*#__PURE__*/function (_Component18) {
  _inheritsLoose(DropButton, _Component18);

  function DropButton(props) {
    var _this20;

    _this20 = _Component18.call(this, props) || this;
    _this20.state = {
      isActive: false
    };
    return _this20;
  }

  var _proto18 = DropButton.prototype;

  _proto18.render = function render() {
    var _this21 = this;

    var cssIsActive = {
      display: "grid",
      gridTemplateColumns: "auto auto auto auto"
    };
    return React.createElement("div", {
      className: "DropButton_Cpnt",
      onMouseLeave: function onMouseLeave() {
        _this21.setState({
          isActive: false
        });
      },
      onMouseEnter: function onMouseEnter() {
        _this21.setState({
          isActive: true
        });
      }
    }, React.createElement("div", {
      className: "profile-pic"
    }, React.createElement(BallButton, {
      imgMain: this.props.imgMain
    })), React.createElement("div", {
      className: "content down",
      style: this.state.isActive ? cssIsActive : {},
      onMouseLeave: function onMouseLeave() {
        _this21.setState({
          isActive: false
        });
      },
      onMouseEnter: function onMouseEnter() {
        _this21.setState({
          isActive: true
        });
      }
    }, this.props.jsx_Picture));
  };

  return DropButton;
}(Component);

var IS_ONLY_ONE_Next = -5;

var PanelViewTsx = /*#__PURE__*/function (_Component19) {
  _inheritsLoose(PanelViewTsx, _Component19);

  function PanelViewTsx(props) {
    var _this22;

    _this22 = _Component19.call(this, props) || this;
    _this22.state = {
      choiceSlc: [],
      isRandom: false,
      isBlockingAt: {
        block: false,
        at: 100
      }
    };
    return _this22;
  }

  var _proto19 = PanelViewTsx.prototype;

  _proto19.nextObject = function nextObject(obj, i, index, haveNext) {
    if (this.state.isBlockingAt.at === index && this.state.isBlockingAt.block === true) {
      return undefined;
    }

    if (typeof obj === "object" && Array.isArray(obj) === false) {
      var keys = Object.keys(obj);

      if (keys.includes(CONST_PNLV.next)) {
        return obj[CONST_PNLV.next];
      }

      if (keys.includes(CONST_PNLV.choice) && typeof i === "number") {
        return obj[CONST_PNLV.choice][i];
      }
    } else {
      if (haveNext === false) {
        this.setState({
          isBlockingAt: {
            at: index,
            block: true
          }
        });
      }

      if (Array.isArray(obj) && obj.every(function (x) {
        return typeof x === "string";
      })) {
        if (this.state.isBlockingAt.block === false) {
          this.setState({
            isBlockingAt: {
              at: index,
              block: true
            }
          });
        }

        return obj;
      }
    }
  };

  _proto19.returnSomthing = function returnSomthing(obj, i) {
    var res = undefined;

    if (typeof obj === "object") {
      if (i === IS_ONLY_ONE_Next) {
        res = obj[this.ObjKeys(obj)[0]];
      } else {
        res = obj[this.ObjKeys(obj)[i]];
        console.log("here");

        if (typeof res === "object" && Object.keys(res).includes(CONST_PNLV.next)) {
          res = res[CONST_PNLV.next];
        }
      }
    }

    if (Array.isArray(obj) && obj.every(function (x) {
      return typeof x === "string";
    })) {
      res = obj;
    }

    return res;
  };

  _proto19.getCustom = function getCustom() {
    var choiceSlc = this.state.choiceSlc;
    var arrVal = this.props.arrVal;
    var objEl = cloneDeep(arrVal);

    var _loop = function _loop(i) {
      var choiceIsInTheLastArr = Array.isArray(objEl) && objEl.every(function (x) {
        return typeof x === "string";
      }) && objEl.filter(function (y) {
        return y === choiceSlc[i];
      }).length === 1;

      if (choiceIsInTheLastArr === false && (objEl === null || objEl === undefined || objEl[choiceSlc[i]] === undefined)) {
        return {
          v: null
        };
      } else {
        if (choiceIsInTheLastArr === true) {
          objEl = choiceSlc[i];
        } else {
          objEl = objEl[choiceSlc[i]];
        }
      }
    };

    for (var i = 0; i < choiceSlc.length; i++) {
      var _ret = _loop(i);

      if (typeof _ret === "object") return _ret.v;
    }

    return objEl;
  };

  _proto19.choicesAvailable = function choicesAvailable() {
    var _this23 = this;

    var dropDownsVal = this.props.dropDownsVal;
    var choiceSlc = this.state.choiceSlc;
    var res = [];
    res.push(dropDownsVal[this.ObjKeys(dropDownsVal)[0]]);

    if (choiceSlc.length === 0) {
      return res;
    } else {
      var i = 0;
      var elementObj = {};

      var _loop2 = function _loop2(j) {
        if (res.length - 1 < j) {
          return {
            v: res
          };
        }

        i = res[j].findIndex(function (x) {
          return x === choiceSlc[j];
        });
        elementObj = _this23.nextObject(j === 0 ? dropDownsVal : elementObj, i === -1 ? undefined : i, j);

        if (elementObj === undefined) {
          return {
            v: res
          };
        } else {
          var resPush = _this23.returnSomthing(elementObj, _this23.ObjKeys(elementObj).length === 2 ? IS_ONLY_ONE_Next : i);

          if (resPush !== undefined) {
            res.push(resPush);
          }
        }
      };

      for (var j = 0; j < choiceSlc.length; j++) {
        var _ret2 = _loop2(j);

        if (typeof _ret2 === "object") return _ret2.v;
      }
    }

    if (this.state.isBlockingAt.block === true) {
      var newRes = [];

      for (var p = 0; p < this.state.isBlockingAt.at; p++) {
        newRes.push(res[p]);

        if (res.length - 1 < p) {
          return newRes;
        }
      }
    }

    return res;
  };

  _proto19.ObjKeys = function ObjKeys(obj) {
    return Object.keys(obj).filter(function (x) {
      return x !== CONST_PNLV.choice || x !== CONST_PNLV.next;
    });
  };

  _proto19.render = function render() {
    var _this24 = this;

    var _this$props19 = this.props,
        path = _this$props19.path,
        onAction = _this$props19.onAction,
        isKey = _this$props19.isKey,
        iUpdate = _this$props19.iUpdate;
    var allArray = this.choicesAvailable();
    var CUSTOM = allArray.length === this.state.choiceSlc.length ? this.getCustom() : null;
    return React.createElement("div", null, React.createElement("div", {
      style: {
        display: "flex",
        position: "relative"
      },
      className: "PanelViewTsx_Cpnt"
    }, React.createElement("div", {
      style: {
        position: "absolute",
        top: -50,
        left: 200
      }
    }, React.createElement(Glass_, {
      text: "Randomize Tout"
    })), React.createElement("div", {
      className: "grid"
    }, allArray.map(function (arrEl, i) {
      return React.createElement("div", null, React.createElement(DropDownSquish, {
        lght: 7,
        initValue: _this24.state.choiceSlc.length - 1 < i ? undefined : _this24.state.choiceSlc[i],
        choices: arrEl,
        onChange_: function onChange_(el) {
          _this24.setState({
            choiceSlc: allSquishChange(_this24.state.choiceSlc, el, i)
          });
        }
      }), React.createElement("div", {
        className: "minify"
      }, React.createElement(Glass_, {
        text: "Random " + (i + 1),
        onClick: function onClick() {
          _this24.setState({
            choiceSlc: allSquishChange(_this24.state.choiceSlc, arrEl[Math.round(Math.random() * (arrEl.length - 1))], i, true)
          });
        }
      })));
    }))), React.createElement("div", {
      style: {
        position: "absolute",
        right: 100,
        top: 0
      }
    }, CUSTOM === null ? React.createElement(React.Fragment, null) : this.props.isKey ? React.createElement("p", {
      className: "pRes",
      style: {
        fontSize: 50
      }
    }, CUSTOM) : /\/static*/gm.test(CUSTOM) ? React.createElement("img", {
      src: CUSTOM,
      style: {
        width: 500,
        height: 500
      }
    }) : React.createElement("p", {
      className: "pRes"
    }, CUSTOM), CUSTOM === null ? React.createElement(React.Fragment, null) : React.createElement("div", {
      style: {
        position: "absolute",
        top: 75,
        left: "-15vw"
      }
    }, React.createElement(Glass_, {
      text: "Valider",
      onClick: function onClick() {
        if (CUSTOM !== null) {
          onAction(path, "updateValue", {
            updateValue: {
              iUpdate: iUpdate,
              newValue: isKey ? undefined : CUSTOM,
              newKey: isKey ? CUSTOM : undefined
            },
            onArrVal: false
          });
        }
      }
    }))));
  };

  return PanelViewTsx;
}(Component);

var BasicModal = /*#__PURE__*/function (_Component20) {
  _inheritsLoose(BasicModal, _Component20);

  function BasicModal(props) {
    var _this25;

    _this25 = _Component20.call(this, props) || this;
    _this25.state = {
      showModal: false
    };
    _this25.open = _this25.open.bind(_assertThisInitialized(_this25));
    _this25.close = _this25.close.bind(_assertThisInitialized(_this25));
    return _this25;
  }

  var _proto20 = BasicModal.prototype;

  _proto20.open = function open() {
    this.setState({
      showModal: true
    });
  };

  _proto20.close = function close() {
    this.setState({
      showModal: false
    });
  };

  _proto20.render = function render() {
    var _this26 = this;

    var _this$props20 = this.props,
        onAction = _this$props20.onAction,
        path = _this$props20.path,
        type = _this$props20.type,
        iUpdate = _this$props20.iUpdate,
        onArrVal = _this$props20.onArrVal,
        data = _this$props20.data,
        custom = _this$props20.custom,
        textIndu = _this$props20.textIndu;
    return React.createElement("div", {
      className: "BasicModal"
    }, React.createElement(Glass_, {
      text: "\u270A",
      onClick: function onClick() {
        _this26.open();
      }
    }), React.createElement(Glass_, {
      text: "\uD83C\uDFB2",
      onClick: function onClick() {
        _this26.open();
      }
    }), React.createElement(ReactModal, {
      isOpen: this.state.showModal,
      contentLabel: "Minimal Modal Example"
    }, React.createElement(Glass_, {
      onClick: function onClick() {
        _this26.close();
      },
      text: "Fermer"
    }), React.createElement(PanelViewTsx, Object.assign({}, {
      isKey: type === "key",
      initAsstImg: {
        isRandom: true
      },
      initChoices: [""],
      onAction: onAction,
      path: path,
      onArrVal: onArrVal,
      iUpdate: iUpdate,
      dropDownsVal: CONDITION_PANEL_VIEW(custom, textIndu)[type],
      arrVal: data
    }))));
  };

  return BasicModal;
}(Component);

export { JsonFormInspect };
//# sourceMappingURL=jsoninspectorhelper.esm.js.map
