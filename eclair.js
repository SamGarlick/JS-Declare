
// eclair




let eclair = {
    _ids: 0,
    _elements: {},
    _newID: function() {this._ids += 1; return this._ids - 1;},
    
    Style: function() {return new EclairStyleComponent();},
    
    State: function(_val) {return new EclairState(_val);},    
    Color: function(_col) {return new EclairColor(_col);},
    TextStyle: function() {return new EclairTextStyleState();},
    Alignment: function() {return new EclairAlignmentState();},
    
    View: function(_elements) {return new EclairView(_elements);},
    VStack: function(_elements) {return new EclairVStack(_elements);},
    HStack: function(_elements) {return new EclairHStack(_elements);},
    TabView: function(_tab, _elements) {return new EclairTabView(_tab, _elements);},
    
    Button: function(text) {return new EclairButton(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Image: function() {return new EclairImage();},
    Text: function(text) {return new EclairText(text);},
    
    TextBox: function(text) {return new EclairTextBox(text);},
    TextArea: function(_value) {return new EclairTextArea(_value);},
    IFrame: function() {return new EclairIFrame();},
    Select: function() {return new EclairSelect();},
    Link: function(text) {return new EclairLink(text);},
    Slider: function(_value) {return new EclairSlider(_value);},
    HiddenInput: function(_value) {return new EclairHiddenInput(_value);},
    Toggle: function(_value) {return new EclairToggle(_value);},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    CustomTagComponent: function(tag) {return new EclairCustomTagComponent(tag);},
    SyntaxHighlighter: function() {return new EclairSyntaxHighlighter();},
    RadioButtons: function() {return new EclairRadioButtons();},
    CheckBox: function(text) {return new EclairCheckBox(text);},
    
    ProgressBar: function(_progress) {return new EclairProgressBar(_progress);},
    Alert: function(_value) {return new EclairAlertBox(_value);},
    
    performCallback: function(eID, event, param1) {this._elements[eID].performCallback(event, param1);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}


// states.state
class EclairState {
    constructor(newValue) {
        this._value = newValue
        this.callbacks = {}
    }
    
    value(_value) {
        if (_value == undefined) {
            return this._value
        } else {
            this._value = _value;
            
            let self = this
            Object.keys(self.callbacks).forEach(function(key) {
                self.callbacks[key](self)
            })
        }
        
        return this
    }
    
    addCallback(key, func, perform) {
        this.callbacks[key] = func
        if (perform == true) {
            func(this)
        }
    }
    
    removeCallback(key) {
        delete this.callbacks[key]
    }
    
    string() {
        return `${this._value}`
    }
    
    number(_default) {
        try {
            return parseFloat(this._value)
        } catch (error) {
            if (_default == null) {
                return 0
            } else {
                return _default
            }
        }
    }
    
    int(_default) {
        try {
            return parseInt(this._value)
        } catch (error) {
            if (_default == null) {
                return 0
            } else {
                return _default
            }
        }
    }
    
    bool() {
        return this._value == "true" || this._value == "True" || this._value == "TRUE" || 
            this._value == "yes" || this._value == "1" || this._value == "Yes" || 
            this._value == "YES" || this._value == true || this._value == 1
    }

    true() {
        this.value(true)
        return this
    }

    false() {
        this.value(false)
        return this
    }
    

    toggle() {
        this.value(!this.bool())
    }
}


// states.alignment
class EclairAlignmentState extends EclairState {
    constructor() {
        super("center")
    }
    
    start() {this.value("start"); return this;}
    
    center() {this.value("center"); return this;}
    
    end() {this.value("end"); return this;}
}


// states.color
class EclairColor extends EclairState {
    constructor(_col) {
        super(_col)
    }
    
    hex(_hex) {
        this.value(_hex[0] == "#" ? _hex:`#${_hex}`)
        return this;
    }
    
    rgb(r, g, b) {
        this.value(`rgb(${r},${g},${b})`)
        return this;
    }
    
    rgba(r, g, b, a) {
        this.value(`rgb(${r},${g},${b}, ${a})`)
        return this;
    }   
    
    aliceBlue() {return this.hex("F0F8FF")}
    antiqueWhite() {return this.hex("FAEBD7")}
    aqua() {return this.hex("00FFFF")}
    aquamarine() {return this.hex("7FFFD4")}
    azure() {return this.hex("F0FFFF")}
    beige() {return this.hex("F5F5DC")}
    bisque() {return this.hex("FFE4C4")}
    black() {return this.hex("000000")}
    blanchedAlmond() {return this.hex("FFEBCD")}
    blue() {return this.hex("0000FF")}
    blueViolet() {return this.hex("8A2BE2")}
    brown() {return this.hex("A52A2A")}
    burlyWood() {return this.hex("DEB887")}
    cadetBlue() {return this.hex("5F9EA0")}
    chartreuse() {return this.hex("7FFF00")}
    chocolate() {return this.hex("D2691E")}
    coral() {return this.hex("FF7F50")}
    cornflowerBlue() {return this.hex("6495ED")}
    cornsilk() {return this.hex("FFF8DC")}
    crimson() {return this.hex("DC143C")}
    cyan() {return this.hex("00FFFF")}
    darkBlue() {return this.hex("00008B")}
    darkCyan() {return this.hex("008B8B")}
    darkGoldenRod() {return this.hex("B8860B")}
    darkGray() {return this.hex("A9A9A9")}
    darkGrey() {return this.hex("A9A9A9")}
    darkGreen() {return this.hex("006400")}
    darkKhaki() {return this.hex("BDB76B")}
    darkMagenta() {return this.hex("8B008B")}
    darkOliveGreen() {return this.hex("556B2F")}
    darkOrange() {return this.hex("FF8C00")}
    darkOrchid() {return this.hex("9932CC")}
    darkRed() {return this.hex("8B0000")}
    darkSalmon() {return this.hex("E9967A")}
    darkSeaGreen() {return this.hex("8FBC8F")}
    darkSlateBlue() {return this.hex("483D8B")}
    darkSlateGray() {return this.hex("2F4F4F")}
    darkSlateGrey() {return this.hex("2F4F4F")}
    darkTurquoise() {return this.hex("00CED1")}
    darkViolet() {return this.hex("9400D3")}
    deepPink() {return this.hex("FF1493")}
    deepSkyBlue() {return this.hex("00BFFF")}
    dimGray() {return this.hex("696969")}
    dimGrey() {return this.hex("696969")}
    dodgerBlue() {return this.hex("1E90FF")}
    fireBrick() {return this.hex("B22222")}
    floralWhite() {return this.hex("FFFAF0")}
    forestGreen() {return this.hex("228B22")}
    fuchsia() {return this.hex("FF00FF")}
    gainsboro() {return this.hex("DCDCDC")}
    ghostWhite() {return this.hex("F8F8FF")}
    gold() {return this.hex("FFD700")}
    goldenRod() {return this.hex("DAA520")}
    gray() {return this.hex("808080")}
    grey() {return this.hex("808080")}
    green() {return this.hex("008000")}
    greenYellow() {return this.hex("ADFF2F")}
    honeyDew() {return this.hex("F0FFF0")}
    hotPink() {return this.hex("FF69B4")}
    indianRed () {return this.hex("CD5C5C")}
    indigo () {return this.hex("4B0082")}
    ivory() {return this.hex("FFFFF0")}
    khaki() {return this.hex("F0E68C")}
    lavender() {return this.hex("E6E6FA")}
    lavenderBlush() {return this.hex("FFF0F5")}
    lawnGreen() {return this.hex("7CFC00")}
    lemonChiffon() {return this.hex("FFFACD")}
    lightBlue() {return this.hex("ADD8E6")}
    lightCoral() {return this.hex("F08080")}
    lightCyan() {return this.hex("E0FFFF")}
    lightGoldenRodYellow() {return this.hex("FAFAD2")}
    lightGray() {return this.hex("D3D3D3")}
    lightGrey() {return this.hex("D3D3D3")}
    lightGreen() {return this.hex("90EE90")}
    lightPink() {return this.hex("FFB6C1")}
    lightSalmon() {return this.hex("FFA07A")}
    lightSeaGreen() {return this.hex("20B2AA")}
    lightSkyBlue() {return this.hex("87CEFA")}
    lightSlateGray() {return this.hex("778899")}
    lightSlateGrey() {return this.hex("778899")}
    lightSteelBlue() {return this.hex("B0C4DE")}
    lightYellow() {return this.hex("FFFFE0")}
    lime() {return this.hex("00FF00")}
    limeGreen() {return this.hex("32CD32")}
    linen() {return this.hex("FAF0E6")}
    magenta() {return this.hex("FF00FF")}
    maroon() {return this.hex("800000")}
    mediumAquaMarine() {return this.hex("66CDAA")}
    mediumBlue() {return this.hex("0000CD")}
    mediumOrchid() {return this.hex("BA55D3")}
    mediumPurple() {return this.hex("9370DB")}
    mediumSeaGreen() {return this.hex("3CB371")}
    mediumSlateBlue() {return this.hex("7B68EE")}
    mediumSpringGreen() {return this.hex("00FA9A")}
    mediumTurquoise() {return this.hex("48D1CC")}
    mediumVioletRed() {return this.hex("C71585")}
    midnightBlue() {return this.hex("191970")}
    mintCream() {return this.hex("F5FFFA")}
    mistyRose() {return this.hex("FFE4E1")}
    moccasin() {return this.hex("FFE4B5")}
    navajoWhite() {return this.hex("FFDEAD")}
    navy() {return this.hex("000080")}
    oldLace() {return this.hex("FDF5E6")}
    olive() {return this.hex("808000")}
    oliveDrab() {return this.hex("6B8E23")}
    orange() {return this.hex("FFA500")}
    orangeRed() {return this.hex("FF4500")}
    orchid() {return this.hex("DA70D6")}
    paleGoldenRod() {return this.hex("EEE8AA")}
    paleGreen() {return this.hex("98FB98")}
    paleTurquoise() {return this.hex("AFEEEE")}
    paleVioletRed() {return this.hex("DB7093")}
    papayaWhip() {return this.hex("FFEFD5")}
    peachPuff() {return this.hex("FFDAB9")}
    peru() {return this.hex("CD853F")}
    pink() {return this.hex("FFC0CB")}
    plum() {return this.hex("DDA0DD")}
    powderBlue() {return this.hex("B0E0E6")}
    purple() {return this.hex("800080")}
    rebeccaPurple() {return this.hex("663399")}
    red() {return this.hex("FF0000")}
    rosyBrown() {return this.hex("BC8F8F")}
    royalBlue() {return this.hex("4169E1")}
    saddleBrown() {return this.hex("8B4513")}
    salmon() {return this.hex("FA8072")}
    sandyBrown() {return this.hex("F4A460")}
    seaGreen() {return this.hex("2E8B57")}
    seaShell() {return this.hex("FFF5EE")}
    sienna() {return this.hex("A0522D")}
    silver() {return this.hex("C0C0C0")}
    skyBlue() {return this.hex("87CEEB")}
    slateBlue() {return this.hex("6A5ACD")}
    slateGray() {return this.hex("708090")}
    slateGrey() {return this.hex("708090")}
    snow() {return this.hex("FFFAFA")}
    springGreen() {return this.hex("00FF7F")}
    steelBlue() {return this.hex("4682B4")}
    tan() {return this.hex("D2B48C")}
    teal() {return this.hex("008080")}
    thistle() {return this.hex("D8BFD8")}
    tomato() {return this.hex("FF6347")}
    turquoise() {return this.hex("40E0D0")}
    violet() {return this.hex("EE82EE")}
    wheat() {return this.hex("F5DEB3")}
    white() {return this.hex("FFFFFF")}
    whiteSmoke() {return this.hex("F5F5F5")}
    yellow() {return this.hex("FFFF00")}
    yellowGreen() {return this.hex("9ACD32")}
    
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
}

// states.text-styles
class EclairTextStyleState extends EclairState {
    title() {this.value("title"); return this;}
    subtitle() {this.value("subtitle"); return this;}
    heading1() {this.value("heading1"); return this;}
    heading2() {this.value("heading2"); return this;}
    heading3() {this.value("heading3"); return this;}
    heading4() {this.value("heading4"); return this;}
}




// style.style
class EclairStylableObject {
    constructor() {
        this._styles = {}
        this._stylePrefix = "#"
    }
    
    getStyleSheet(selector) {
        selector = (selector == null)? "" : selector
        if (!this._styles.hasOwnProperty(selector)) {
            this._styles[selector] = {}
        }
        return this._styles[selector];
    }
    
    buildStyleCode(cssOnly) {
        if (cssOnly == null) {cssOnly = false}
        let self = this;
        let objectID = this.id()
        
        let styleCode = ""
        
        
        Object.keys(self._styles).forEach(function(selector) {
            let styleSheet = self._styles[selector];
            let styleSheetCode = '';
            
            Object.keys(self._styles[selector]).forEach(function(key) {
                let value = self._styles[selector][key]
                if (value != null) {
                    styleSheetCode += (key == "css")? value + ";" : `${key}:${value};` 
                }
            });
            
            if (selector.length > 0) {
                if (selector[0] != " ") {
                    selector = ":" + selector;
                }
            }
            styleCode += `${self._stylePrefix}${objectID}${selector}{${styleSheetCode}}`;
        });
        
        if (cssOnly) {
            return styleCode
        }
        
        return `<style id='${objectID}-css'>${styleCode}</style>`;
    }
    
    updateCSSStyle() {
        let objectID = this.id() + "-css";
        let cssElement = document.getElementById(objectID);
        
        if (cssElement != null) {
            cssElement.innerHTML = this.buildStyleCode(true)
        }
        
        return this;
    }
    
    _set(selector, type, _style) {
        this.getStyleSheet(selector)[type] = _style; 
        
        if (_style instanceof EclairState) {
            let self = this
            _style.addCallback(this.id() + `-style-{type}`, function(state) {
                self.getStyleSheet(selector)[type] = _style.string(); 
                self.updateCSSStyle()
            }, true)
        }
        
        return this.updateCSSStyle()
    }
    
    css(_style, selector) {return this._set(selector, "css", _style)}
    display(_display, selector) {return this._set(selector, "display", _display)}
    background(_background, selector) {return this._set(selector, "background", _background)}
    backgroundColor(_color, selector) {return this._set(selector, "background-color", _color)}
    borderSize(_size, selector) {return this._set(selector, "border-width", _size)}
    borderColor(_color, selector) {return this._set(selector, "border-color", _color)}
    borderStyle(_style, selector) {return this._set(selector, "border-style", _style)}
    borderRadius(_radius, selector) {return this._set(selector, "border-radius", _radius)}
    padding(_size, selector) {return this._set(selector, "padding", _size)}
    margin(_size, selector) {return this._set(selector, "margin", _size)}
    gap(_size, selector) {return this._set(selector, "gap", _size)}
    font(_family, selector) {return this._set(selector, "font-family", _family)}
    fontSize(_size, selector) {return this._set(selector, "font-size", _size)}
    fontColor(_color, selector) {return this._set(selector, "color", _color)}
    fontWeight(_weight, selector) {return this._set(selector, "font-weight", _weight)}
    width(_width, selector) {return this._set(selector, "width", _width)}
    height(_height, selector) {return this._set(selector, "height", _height)}
    display(_display, selector) {return this._set(selector, "display", _display)}
    overflow(_overflow, selector) {return this._set(selector, "overflow", _overflow)}
    opacity(_opacity, selector) {return this._set(selector, "opacity", _opacity)}
    textAlign(_align, selector) {return this._set(selector, "text-align", _align)}
    verticalAlign(_align, selector) {return this._set(selector, "vertical-align", _align)}
    position(_pos, selector) {return this._set(selector, "position", _pos)}
    top(_top, selector) {return this._set(selector, "top", _top)}
    bottom(_bottom, selector) {return this._set(selector, "bottom", _bottom)}
    left(_left, selector) {return this._set(selector, "left", _left)}
    right(_right, selector) {return this._set(selector, "right", _right)}
    cursor(_value, selector) {return this._set(selector, "cursor", _value)}
    textDecoration(_value, selector) {return this._set(selector, "text-decoration", _value)}
    transition(_value, selector) {return this._set(selector, "transition", _value)}
    userSelect(_value, selector) {return this._set(selector, "user-select", _value)}
    boxSizing(_value, selector) {return this._set(selector, "box-sizing", _value)}
    transform(_value, selector) {return this._set(selector, "transform", _value)}
    
    flexDirection(_value, selector) {return this._set(selector, "flex-direction", _value)}
    alignItems(_value, selector) {return this._set(selector, "align-items", _value)}
}

class EclairStyleComponent extends EclairStylableObject {
    constructor() {
        super()
        this._id = eclair._newID()
        
        this._stylePrefix = "."
        
        let node = document.createElement("style")
        node.innerHTML = this.buildStyleCode(true)
        node.setAttribute("id", this.id() + "-css")
        
        let headElements = document.head.children;
        if (headElements.length == 0) {
            document.head.appendChild(node)
        } else {
            document.head.insertBefore(node, headElements[0])
        }
    }
    
    id() {
        return "eclairStyle" + this._id;
    }
}


// style.defaults
eclair.styles = {
    View: eclair.Style(),
    VStack: eclair.Style(),
    HStack: eclair.Style(),
    TabView: eclair.Style()
        .display("flex")
        .alignItems("center"),
    
    Text: eclair.Style()
        .font(eclair.theme.font),
    
    IFrame: eclair.Style()
        .borderColor("#333333")
        .borderSize("1px")
        .width("100%")
        .height("100%"),
    
    Button: eclair.Style()
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Select: eclair.Style()
        .font(eclair.theme.font),
    
    Slider: eclair.Style()
        .transition("0.2s all")
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
        .css("-webkit-appearance: none; appearance: none;", ":-webkit-slider-thumb")
        .css("-webkit-appearance: none; appearance: none;", ":-moz-slider-thumb")
        .cursor("pointer", ":-webkit-slider-thumb")
        .cursor("pointer", ":-moz-slider-thumb")
        .background("#d3d3d3")
        .background(eclair.theme.accent, ":-webkit-slider-thumb")
        .background(eclair.theme.accent, ":-moz-slider-thumb")
        .borderRadius("50%", ":-webkit-slider-thumb")
        .borderRadius("50%", ":-moz-slider-thumb")
        .height("25px", ":-webkit-slider-thumb")
        .height("25px", ":-moz-slider-thumb")
        .width("25px", ":-webkit-slider-thumb")
        .width("25px", ":-moz-slider-thumb")
        .width("100%")
        .height("15px")
        .borderRadius("5px")
        .opacity(0.7)
        .opacity(1, "hover"),
    
    Link: eclair.Style()
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .textDecoration("none")
        .textDecoration("underline", "hover"),
    
    Image: eclair.Style()
        .display("block"),
    
    TextBox: eclair.Style()
        .width("100%")
        .borderSize("0px")
        .borderRadius("3px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active")
        .background("#bbbbbb", "focused"),
    
    HorizontalLine: eclair.Style()
        .borderSize("0px")
        .width("100%")
        .css("border-top: 1px solid #999999"),
    
    RadioButtons: eclair.Style(),  // No default style
    RadioButtonsItem: eclair.Style()
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .font(eclair.theme.font),
    RadioButtonsSelectedItem: eclair.Style()
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .userSelect("none")
        .width("100%")
        .font(eclair.theme.font),
    RadioButtonsRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%"),
    RadioButtonsSelectedRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%")
        .background(eclair.theme.accent),
    
    CheckBox: eclair.Style()    
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .transition("0.2s all")
        .userSelect("none")
        .font(eclair.theme.font),
    CheckBoxIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .fontSize("0.85rem")
        .userSelect("none")
        .textAlign("center"),        
    CheckBoxActiveIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .userSelect("none")
        .background(eclair.theme.accent)
        .fontColor("white")
        .fontSize("0.85rem")
        .textAlign("center"),
    CheckBoxLabel: eclair.Style(),
    
    ProgressBar: eclair.Style()
        .background("#d3d3d3")
        .borderRadius("3px")
        .height("16px")
        .userSelect("none")
        .overflow("hidden"),
    ProgressBarIndicator: eclair.Style()
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .background(eclair.theme.accent)
        .height("100%")
        .transition("0.3s all")
        .userSelect("none")
        .margin("0px auto 0px 0px"),
    ProgressBarLabel: eclair.Style()
        .fontColor("white")
        .fontWeight(700)
        .userSelect("none")
        .fontSize("11px"),
    
    Toggle: eclair.Style()    
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .position("relative")
        .width("50px")
        .background("#dddddd")
        .padding("3px")
        .cursor("pointer")
        .userSelect("none")
        .borderRadius("20px")
        .transition("0.2s all")
        .boxSizing("border-box"),
    ToggleKnob: eclair.Style()
        .height("14px")
        .width("14px")
        .background("#ffffff")
        .transform("translateX(0%)")
        .transition("0.2s all")
        .userSelect("none")
        .borderRadius("20px"),
    ToggleTick: eclair.Style()
        .position("absolute")
        .fontColor("#ffffff")
        .left("35%")
        .transition("0.2s all")
        .transform("translateX(-50%)")
        .fontWeight(700)
        .userSelect("none")
        .opacity(0)
}



// elements.component
class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = eclair._newID();
        eclair._elements[this.id()] = this;
        
        this.parent = null
        this.children = []
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {id: this.id()}
        this.stateBindings = {}
    }
    
    
    id() {
        return "eclairElement" + this._id;
    }
    
    write() {
        document.write(this.compile())
    }
    
    to(elemID) {
        document.getElementById(elemID).innerHTML = this.compile();
    }
    
    getElement(callback) {
        let elem = document.getElementById(this.id());
        if (callback != null && elem != null) {
            callback(elem)
        }
        return elem;
    }
    
    getAttr(key) {
        let elem = this.getElement();
        if (elem != null) {
            return elem.getAttribute(key);
        }
        return this.attributes[key];
    }
    
    setAttr(key, value) {
        if (value == null) {
            delete this.attributes[key];
            this.getElement(elem => {elem.removeAttribute(key)})
        } else {
            this.attributes[key] = value;
            this.getElement(elem => {elem.setAttribute(key, value)})
        }
        return this;
    }
    
    addStyle(sharedClass) {
        if (sharedClass != null) {
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.id();

            let found = false;
            for (let n = 0; n < this.sharedStyles.length; n++) {
                found = found || this.sharedStyles[n] == className;
            }

            if (!found) {
                this.sharedStyles.push(className);
            }

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.setAttr("class", classesString)
        }
        return this;
    }
    
    removeStyle(sharedClass) {
        if (sharedClass != null) { 
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.id();
            
            let newStyles = []
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (this.sharedStyles[n] != className) {
                    newStyles.push(this.sharedStyles[n])
                }
            }

            this.sharedStyles = newStyles;

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.setAttr("class", classesString)
        }
        return this;
    }
    
    bindState(state, stateBindingID, onCallback, valueCallback) {
        if (state instanceof EclairState) {
            let objectBindingId = `${this.id()}-${stateBindingID}`
            
            if (this.stateBindings.hasOwnProperty(stateBindingID)) {
                state.removeCallback(objectBindingId)
            }
            
            this.stateBindings[stateBindingID] = state
            
            state.addCallback(objectBindingId, function(state) {
                let value = (valueCallback == null)? state.value() : valueCallback(state)
                onCallback(value)
            }, true)
        } else {
            onCallback(state)
        }
    }
    
    build() {
        throw "Build function not implemented"
    }
    
    compile() {       
        let wrapperElement = document.createElement("div")
        wrapperElement.innerHTML = this.build();
        let element = wrapperElement.children[0]
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
        
        let html = this.buildStyleCode() + wrapperElement.innerHTML;
                
        return html
    }
    
    onBlur(callback) {return this._updateCallback("onBlur", callback);}
    onChange(callback) {return this._updateCallback("onChange", callback);}
    onFocus(callback) {return this._updateCallback("onFocus", callback);}
    onSelect(callback) {return this._updateCallback("onSelect", callback);}
    onSubmit(callback) {return this._updateCallback("onSubmit", callback);}
    onReset(callback) {return this._updateCallback("onReset", callback);}
    onKeyDown(callback) {return this._updateCallback("onKeyDown", callback);}
    onKeyPress(callback) {return this._updateCallback("onKeyPress", callback);}
    onKeyUp(callback) {return this._updateCallback("onKeyUp", callback);}
    onInput(callback) {return this._updateCallback("onInput", callback);}
    onMouseDown(callback) {return this._updateCallback("onMouseDown", callback);}
    onMouseUp(callback) {return this._updateCallback("onMouseUp", callback);}
    onMouseOver(callback) {return this._updateCallback("onMouseOver", callback);}
    onMouseOut(callback) {return this._updateCallback("onMouseOut", callback);}
    onMouseMove(callback) {return this._updateCallback("onMouseMove", callback);}
    onClick(callback) {return this._updateCallback("onClick", callback);}
    onDblClick(callback) {return this._updateCallback("onDblClick", callback);}
    onScroll(callback) {return this._updateCallback("onScroll", callback);}
    onLoad(callback) {return this._updateCallback("onLoad", callback);}
    onError(callback) {return this._updateCallback("onError", callback);}
    onUnload(callback) {return this._updateCallback("onUnload", callback);}
    onResize(callback) {return this._updateCallback("onResize", callback);}
    
    performCallback(event, param1) {
        if (this._callbacks.hasOwnProperty(event)) {
            this._callbacks[event](this, param1);
        }
    }
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `eclair.performCallback("${this.id()}", "${callbackKey}")`)
        }
        return this;
    }
}

// elements.base
class EclairCustomTagComponent extends EclairComponent {
    constructor(tag) {
        super()
        this.tag = tag;
        this._innerHTML = "";
    }
    
    innerHTML(_html) {
        this.bindState(_html, "html", value => {
            this._innerHTML = value;
            this.getElement(e => {
                e.innerHTML = value
            })
        })
        return this;
    }
    
    build() {
        return `<${this.tag}>${this._innerHTML}</${this.tag}>`
    }
}


// elements.custom.alert-box
class EclairAlertBox extends EclairComponent {
    constructor(text) {
        super()
        
        this._titleText = eclair.State(null)
        this._title = eclair.Text(this._titleText)
            .fontWeight(500)
            .fontSize("1.5rem")
            .display("none")
            .fontColor("rgba(0, 0, 0, 0.6)")
            .width("100%")
        
        this._text = eclair.Text(text)
            .fontColor("rgba(0, 0, 0, 0.6)")
        
        this._title.parent = this
        this._text.parent = this
        this.children = [this._title, this._text]
        
        this._title.getStyleSheet()["margin-bottom"] = ".5rem"
        
        this
            .background(eclair.theme.accent)
            .borderRadius(".25rem")
            .padding(".75rem 1.25rem")
        
        let styleSheet = this.getStyleSheet(" hr")
        styleSheet["border"] = "0px"
        styleSheet["margin-top"] = ".75rem"
        styleSheet["margin-bottom"] = ".75rem"
        styleSheet["border-top"] = "1px solid rgba(0, 0, 0, 0.2)"
        this.getStyleSheet()["box-shadow"] = "0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset"
    }
    
    theme(_color) {
        this.bindState(_color, "color", value => {
            this.background(value)
        })
        
        return this
    }
        
    title(_text) {        
        this.bindState(_text, "title", value => {
            this._titleText.value(value)
            
            let hideTitle = value == null || value.trim().length == 0
            this._title.display(hideTitle? "none": "block")
        })
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}

// elements.custom.progress
class EclairProgressBar extends EclairComponent {
    constructor(_progress) {
        super()
        
        this._labelText = eclair.State("0%")
        this._label = eclair.Text(this._labelText)
        this._indicator = eclair.HStack([this._label])
        
        this.bindState(_progress, "progress", value => {
            _progress = Math.max(Math.min(value, 1), 0)
            this._progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        this._indicator.parent = this
        this.children = [this._indicator]
        
        this._label.addStyle(eclair.styles.ProgressBarLabel)
        this._indicator.addStyle(eclair.styles.ProgressBarIndicator)
        this.addStyle(eclair.styles.ProgressBar)
    }
    
    striped(_on) {
        this.bindState(_on, "color", value => {
            if (value) {
                this._indicator.getStyleSheet()["background-image"] = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            } else {
                this._indicator.getStyleSheet()["background-image"] = "";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            }
            this._indicator.updateCSSStyle()
        }, state => {return state.bool()})
        
        return this;
    }
    
    indicator(callback) {
        callback(this._indicator)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
        
    color(_color) {
        this._indicator.backgroundColor(_color)
        return this
    }
    
    showLabel(_show) {
        this.bindState(_show, "label", value => {
            this._label.opacity(value? "1":"0")
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<div>${this._indicator.compile()}</div>`
    }
}

// elements.custom.syntax-highlighter
class EclairSyntaxHighlighter extends EclairComponent {
    constructor(_html) {
        super()

        try {
            if (hljs) {}
        } catch (error) {
            console.log("HLJS Not imported. Go to 'https://highlightjs.org/usage/' to import the stylesheet and the .js file.")
        }

        let self = this;
        this
            .position("relative")
            .width("400px")
            .height("400px")
        
        this._html = _html == null? eclair.State() : _html
        this.highlightTimeout = null

        this._pre = eclair.CustomTagComponent("pre")
            .position("absolute")
            .padding("0px")
            .margin("0px")
            .height("100%")
            .width("100%")
            .top("0px")
            .left("0px")
            .background("white")
            .css("box-sizing: border-box;line-height: 1.05")

        this._code = eclair.CustomTagComponent("code")
            .position("absolute")
            .top("0px")
            .left("0px")
            .background("white")
            .width("100%")
            .height("100%")
            .margin("0px")
            .padding("10px 10px 10px 15px")
            .fontColor("black")
            .setAttr("class", "javascript")
            .textAlign("left")
            .css("box-sizing: border-box;")
            .innerHTML(this._html)

        this._textarea = eclair.TextArea(this._html)
            .setAttr("spellcheck", false)
            .display("inline")
            .position("absolute")
            .top("0px")
            .left("0px")
            .width("100%")
            .height("100%")
            .background("transparent")
            .fontColor("transparent")
            .font("monospace")
            .margin("0px")
            .padding("10px 10px 10px 15px")
            .css("box-sizing: border-box;line-height: 1.05; caret-color: black;resize:none;white-space: pre;letter-spacing: -0.2px;")
            .onKeyUp(e => {
                var escape = document.createElement('textarea');
                escape.textContent = e.getElement().value;
                this._html.value(escape)
                clearTimeout(this.highlightTimeout);
                hljs.highlightAll()
            })
            .onKeyDown(e => {
                var escape = document.createElement('textarea');
                console.log(e)
                console.log(e.getElement())
                console.log(e.getElement().value)
                escape.textContent = e.getElement().value;
                this._html.value(escape)
                clearTimeout(this.highlightTimeout);
                hljs.highlightAll()
            }) 
            .onScroll(e => {
                let textarea = e.getElement()
                self._code.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
            })
        
        this._pre.parent = this
        this._code.parent = this
        this._textarea.parent = this
        this.children = [this._pre, this._code, this._textarea]
    }

    build() {
        let postBuildScript = document.createElement("script")
        postBuildScript.innerHTML += "hljs.highlightAll();"
        
        this._pre.innerHTML(this._code.compile())
        return `<div>${this._pre.compile()}${this._textarea.compile()}</div>${postBuildScript.outerHTML}`
    }
}





// elements.form.button
class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this.text = value;
            this.getElement(elem => {elem.innerHTML = value;});
        })
        
        this.setAttr("type", "button")
        this.addStyle(eclair.styles.Button)
    }
    
    build() {
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        return `<button>${this.text}</button>`
    }
}

// elements.form.checkbox
class EclairCheckBox extends EclairComponent {
    constructor(checked) {
        super()
        
        this._enabled = true        
        
        this.checked = checked  // Parent one given by user
        this._hiddenValue = eclair.State(false)  // Private one which is updated in the .checked callback
        this._textValue = eclair.State("")  // Text value which is the message displayed alongside
        
        this._label = eclair.Text(this._textValue)
        this._checkbox = eclair.CustomTagComponent("div")
        this._hidden = eclair.HiddenInput(this._hiddenValue)
        
        let self = this
        this.overrideOnClick = null
        this._updateCallback("onClick", () => {
            if (this.overrideOnClick != null) {
                this.overrideOnClick(this)
            }
            if (this._enabled) {   
                this.checked.value(!this.checked.bool())
                this.performCallback("onChange")
            }  
        })
        
        this.bindState(checked, "checked", value => {
            this._hiddenValue.value(value)
            
            this.performCallback("onChange")    

            if (value) {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxActiveIcon)
                    .removeStyle(eclair.styles.CheckBoxIcon)
                    .innerHTML("✓")
            } else {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxIcon)
                    .removeStyle(eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("")
            }
        }, state => {return state.bool()})
        
        this._label.parent = this
        this._checkbox.parent = this
        this._hidden.parent = this
        this.children = [this._label, this._checkbox, this._hidden]
        
        this.setAttr("cellpadding", 6)   
        this.addStyle(eclair.styles.CheckBox)  
        this._label.addStyle(eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(eclair.styles.CheckBoxIcon)
    }
    
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    text(_text) {
        this.bindState(_text, "text", value => {
            this._textValue.value(value)
        });
        return this;
    }
        
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
        
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.opacity(value ? "1":"0.6")
            this._enabled = value
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<table><tr><td width=1>${this._checkbox.compile()}</td><td>${this._label.compile()}</td></tr></table>${this._hidden.compile()}`
    }
}

// elements.form.form
class EclairForm extends EclairComponent {
    constructor(elements) {
        super()
        
        this.elements = elements;
        this._method = "POST"
        this._action = null;
    }
    
    method(_method) {
        this._method = _method;
        return this;
    }
    
    action(_action) {
        this._action = _action;
        return this;
    }
    
    submit() {
        alert("Submit called")
    }
    
    build() {
        let code = `<form>`
        for (let n = 0; n < this.elements.length; n++) {
            code += this.elements[n].compile();
        }
        code += "</form>"
        
        return code;
    }
}


// elements.form.hidden
class EclairHiddenInput extends EclairCustomTagComponent {
    constructor(_value) {
        super("input")
        this.setAttr("type", "hidden")

        this.bindState(_value, "value", value => {
            this.setAttr("value", value)
            this.getElement(e => {e.value = value})
        })
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        
        return this
    }
}

// elements.form.radio-buttons
 class EclairRadioButtons extends EclairComponent {
    constructor() {
        super()
        
        this._enabled = true
        
        this._hiddenValue = eclair.State("")
        this._hidden = eclair.HiddenInput(this._hiddenValue)
        
        this.itemStyle = eclair.Style()
        this.selectedItemStyle = eclair.Style()
        this.radioStyle = eclair.Style()
        this.selectedRadioStyle = eclair.Style()
        
        this.addStyle(eclair.styles.RadioButtons)
        
        this.items = []
        
        let self = this
        this._callbacks["selectRadioButton"] = function(object, selectedValue) {
            if (self._enabled) {   
                self.value(selectedValue)
                self.performCallback("onChange")
            }
        }
    }
    
    buildItem(_item, index) {
        let style = `style='margin-top: 3px;'`
        if (index == 0) {style = ""}
        
        let radioClass = `${eclair.styles.RadioButtonsItem.id()} ${this.itemStyle.id()}`
        let divClass = `${eclair.styles.RadioButtonsRadio.id()} ${this.radioStyle.id()}`
        
        if (_item.value == this.value()) {
            radioClass = `${eclair.styles.RadioButtonsSelectedItem.id()} ${this.selectedItemStyle.id()}`
            divClass = `${eclair.styles.RadioButtonsSelectedRadio.id()} ${this.selectedRadioStyle.id()}`
        }
        
        return `<table onclick='eclair.performCallback("${this.id()}", "selectRadioButton", "${_item.value}")' cellpadding=6 class='${radioClass}' ${style}><tbody><tr><td width=1><div class='${divClass}'></div></td><td>${_item.text}</td></tr></tbody></table>`
    }
    
    addItem(value, text) {
        text = text == null ? value : text
        let item = {"value": value, "text": text}
        
        if (this.items.length == 0) {
            this._hiddenValue.value(value)
        }
        
        this.items.push(item)
        
        let self = this;
        this.getElement(e => {
            var div = document.createElement('div');
            div.innerHTML = self.buildItem(item, e.children.length)
            e.appendChild(div.firstChild);
        })
        
        return this;
    }
    
    removeItem(_value) {
        let selectedIndex = -1;
        for (let n = 0; n < this.items.length; n++) {
            if (this.items[n].value == _value) {
                selectedIndex = n;
            }
        }
        if (selectedIndex == -1) {
            for (let n = 0; n < this.items.length; n++) {
                if (this.items[n].text == _value) {
                    selectedIndex = n;
                }
            }
        }
        this.removeIndex(selectedIndex);
        
        return this;
    }
    
    removeIndex(_index) {
        if (this.value() == this.items[_index].value) {
            this.selectedIndex((this.selectedIndex() + 1) % this.items.length)
        }
        
        let newItems = []
        for (let n = 0; n < this.items.length; n++) {
            if (n != _index)
                newItems.push(this.items[n])
        }
        this.items = newItems;
        
        this.getElement(e => {
            e.removeChild(e.childNodes[_index]);  
        })
        
        return this;
    }
    
    addItems(_items) { 
        for (let n = 0; n < _items.length; n++) {
            this.addItem(_items[n])
        }
        return this
    }
    
    value(_val) {
        this._hiddenValue.value(_val)
        this.selectedIndex(this.selectedIndex())
        return this;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    enabled(_enabled) {
        if (_enabled == null) {
            return this._enabled;
        } else {
            this._enabled = _enabled;
            return this
        }
    }
    
    selectedIndex(_index) {
        if (_index == null) {
            let selectedIndex = -1;
            let _val = this._hiddenValue.value()
            for (let n = 0; n < this.items.length; n++) {
                if (this.items[n].value == _val) {
                    selectedIndex = n;
                }
            }
            if (selectedIndex == -1) {
                for (let n = 0; n < this.items.length; n++) {
                    if (this.items[n].text == _val) {
                        selectedIndex = n;
                    }
                }
            }
            return selectedIndex;
        }
        
        this._hiddenValue.value(this.items[_index].value)

        let self = this
        this.getElement(e => {
            for (let n = 0; n < self.items.length; n++) {
                let buttons = e.children;
                if (n == _index) {
                    buttons[n].setAttribute("class", eclair.styles.RadioButtonsSelectedItem.id() + " " + self.selectedItemStyle.id())
                } else {
                    buttons[n].setAttribute("class", eclair.styles.RadioButtonsItem.id() + " " + self.itemStyle.id())
                }

                let radioButton = buttons[n].children[0].children[0].children[0].children[0]
                if (n == _index) {
                    radioButton.setAttribute("class", eclair.styles.RadioButtonsSelectedRadio.id() + " " + self.selectedRadioStyle.id())
                } else {
                    radioButton.setAttribute("class", eclair.styles.RadioButtonsRadio.id() + " " + self.radioStyle.id())
                }
            }
        })
    }
    
    build() {          
        let items = ""
        for (let i = 0; i < this.items.length; i++) {
            items += this.buildItem(this.items[i], i)
        }
        return `<div>${items}</div>${this._hidden.compile()}`
    }
}

// elements.form.select

class EclairSelect extends EclairComponent {
    constructor() {
        super()
        this.options = []
        this.addStyle(eclair.styles.Select)
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    value(newValue) {
        if (newValue == null) {
            return this.getElement().value;
        } else {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = newValue == this.options[n].value;
            }
            
            this.getElement(elem => {elem.value = newValue})

            return this;
        }
    }
    
    selectedIndex(index) {
        if (index == null) {
            return this.getElement().selectedIndex;
        } else {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = index == n;
            }
            this.getElement(elem => {elem.selectedIndex = `${index}`})
            
            return this;
        }
    }
    
    addOptions(items) {
        for (let i = 0; i < items.length; i++) {
            this.addOption(items[i]);
        }
        return this;
    }
    
    addOption(value, text, selected) {
        if (typeof(text) == "boolean" && selected == null) {
            selected = text;
            text = null;
        }
        if (text == null) {text = value}
        if (selected == null) {selected = false}
        
        let newOption = {
            "value": value,
            "text": text,
            "selected": selected
        }
        
        this.options.push(newOption)
        
        let elem = this.getElement();
        if (elem != null) {
            elem.appendChild(this.buildOptionHTML(newOption))
        }
        
        return this;
    }
    
    removeOption(value) {
        let nonRemovedOptions = []
        for (let n = 0; n < this.options.length; n++) {
            if (this.options[n].value != value) {
                nonRemovedOptions.push(this.options[n]);
            }
        }
        this.options = nonRemovedOptions;
        
        let elem = this.getElement()
        if (elem != null) {
            let ops = elem.children;
            let removes = [];
            
            for (let o = 0; o < ops.length; o++) {
                if (ops[o].value == value) {
                    removes.push(ops[o]);
                }
            }
            
            for (let r = 0; r < removes.length; r++) {
                elem.removeChild(removes[r]);
            }
        }
        
        return this;
    }
    
    buildOptionHTML(newOption) {
        return `<option value='${newOption.value}'${newOption.selected ? " selected": ""}>${newOption.text}</option>`
    }
    
    build() {
        let options = ""
        for (let n = 0; n < this.options.length; n++) {
            options += this.buildOptionHTML(this.options[n]);
        }
        
        return `<select>${options}</select>`
    }
}


// elements.form.slider
class EclairSlider extends EclairCustomTagComponent {
    constructor(value) {
        super("input")
        
        this.bindState(value, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value})
        }, state => {return state.number()})
        
        let overrideOnInput = null;
        this._updateCallback("onInput", e => {
            if (value instanceof EclairState) {
                e.getElement(elem => {value.value(elem.value)})
            }
            
            if (this.overrideOnInput != null) {
                this.overrideOnInput(this)
            }
        })
        
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
    }
    
    onInput(callback) {
        console.log("on input called")
        this.overrideOnInput = callback;
        return this;
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        return this;
    }
    
    min(_min) {
        this.bindState(_min, "min", value => {
            this.setAttr("min", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    max(_max) {
        this.bindState(_max, "max", value => {
            this.setAttr("max", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    step(_step) {
        this.bindState(_step, "step", value => {
            this.setAttr("step", value);
        }, state => {return state.number()})
        
        return this;
    }
}
   

// elements.form.text-area
class EclairTextArea extends EclairCustomTagComponent {
    constructor(_value) {
        super("textarea")
        
        this.bindState(_value, "value", value => {
            this.innerHTML(value)
            this.getElement(e => {e.value = value})
        })
        
        this._overrideOnKeyUp = null
        this._updateCallback("onKeyUp", e => {
            if (_value instanceof EclairState) {
                _value.value(e.getElement().value)
            }
            
            if (this._overrideOnKeyUp != null) {
                this._overrideOnKeyUp(e)
            } 
        })
        
        this._overrideOnKeyDown = null
        this._updateCallback("onKeyDown", e => {
            if (_value instanceof EclairState) {
                _value.value(e.getElement().value)
            }
            
            if (this._overrideOnKeyDown != null) {
                this._overrideOnKeyDown(e)
            } 
        })
    }
    
    onKeyUp(callback) {
        this._overrideOnKeyUp = callback
        return this
    }
    
    onKeyDown(callback) {
        this._overrideOnKeyDown = callback
        return this
    }
}

// elements.form.textbox
class EclairTextBox extends EclairCustomTagComponent {
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(eclair.styles.TextBox)
        
        let self = this
        
        this.bindState(_text, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value});
        })
        
        this.overrideOnInput = null
        this._updateCallback("onInput", e => {
            if (_text instanceof EclairState) {
                e.getElement(elem => {_text.value(elem.value)})
            }

            if (this.overrideOnInput != null) {
                this.overrideOnInput(this)
            }
        })
    }
    
    onInput(callback) {
        this.overrideOnInput = callback
        return this
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        
        return this
    }
    
    placeholder(_placeholder) {
        this.bindState(_placeholder, "placeholder", value => {
            this.setAttr("placeholder", value)
        })
        
        return this
    }
    
    password(_password) {
        this.bindState(_password, "password", value => {
            this.setAttr("type", _password.bool()? "password":'text')
        }, state => {return state.bool()})
        
        return this
    }
    
    maxLength(_maxLength) {
        this.bindState(_maxLength, "maxlength", value => {
            this.setAttr("maxlength", value)
        })
        
        return this
    } 
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.setAttr("enabled", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    required(_required) {
        this.bindState(_required, "required", value => {
            this.setAttr("required", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    autofocus(_autofocus) {
        this.bindState(_autofocus, "autofocus", value => {
            this.setAttr("autofocus", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
}



// elements.form.toggle
class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        let overrideOnClick = null;
        
        this._tickMark = eclair.Text("✓")
        this._knob = eclair.View()
        
        this._value = eclair.State((_value instanceof EclairState)? _value.bool() : _value)
        this._hiddenComponent = eclair.HiddenInput(this._value)
    
        this.bindState(_value, "toggle", value => {
            let cVal = this._value.bool()
            
            this._value.value(value)
            this._updateStyle()
            
            if (value != cVal) {
                this.performCallback("onChange")  
            }
        }, state => {return state.bool()})
        
        let self = this;
        this._updateCallback("onClick", e => {
            if (e._enabled) {
                let cVal = this._value.bool()
                if (_value instanceof EclairState) {
                    _value.value(!cVal)
                } else {
                    this._value.value(!cVal)
                }
                this._updateStyle()
                this.performCallback("onChange")  
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(self)
            }
        })
        
        this._showCheckMark = false
        this._enabled = true
        
        this._tickMark.parent = this
        this._knob.parent = this
        this.children = [this._tickMark, this._knob]
        
        this.addStyle(eclair.styles.Toggle)
        this._tickMark.addStyle(eclair.styles.ToggleTick)
        this._knob.addStyle(eclair.styles.ToggleKnob)
        
        this.width("100%", " .wrapper")
            .transition("0.2s all", " .wrapper")
    }
    
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    name(_name) {
        this._hiddenComponent.name(_name)
        return this;
    }
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this._enabled = value
            this.opacity(value? 1 : 0.6)
        }, state => {return state.bool()})
        
        return this
    }
    
    showTick(_bool) {
        this.bindState(_bool, "showTick", value => {
            this._showCheckMark = value
            this._tickMark.opacity((value && (this._value.bool()))? 1:0)
        }, state => {return state.bool()})
        
        return this
    }
    
    _updateStyle() {
        if (this._value.bool()) {
            this._tickMark.opacity(this._showCheckMark ? 1 : 0)
            this.background(eclair.theme.accent)
                .transform("translateX(100%)", " .wrapper")
            this._knob
                .transform("translateX(-100%)")
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
                .transform("translateX(0%)", " .wrapper")
            
            this._knob
                .transform("translateX(0%)")
        }
    }
    
    build() {
        return `<toggle>${this._tickMark.compile()}<div class='wrapper'>${this._knob.compile()}</div>${this._hiddenComponent.compile()}</toggle>`
    }
}



// elements.layout.view
class EclairView extends EclairComponent {
    constructor(elements) {
        super()
        
        if (elements != null) {
            for (let i = 0; i < elements.length; i++) {
                this.addChild(elements[i])
            }
        }
        
        this.addStyle(eclair.styles.View)
    }
    
    addChild(_child) {
        this.children.push(_child)
        if (_child instanceof EclairComponent) {
            _child.parent = this
        }
        
        this.getElement(e => {
            let childHTML = child;
            if (_child instanceof EclairComponent) {
                childHTML = _child.compile()
            }
            e.insertAdjacentHTML('beforeend', childHTML)
        })
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e];
            
            if (child instanceof EclairComponent) {
                code += this.children[e].compile();
            }

            else if (typeof(child) == "string") { 
                code += child
            } 
            
            else {
                console.log(child)
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return "<div>" + code + "</div>";
    }
}

// elements.layout.vstack
class EclairVStack extends EclairView {
    constructor(func) {
        super(func)
        
        this
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
        this.css("justify-content: space-around;")
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.VStack)
    }
    
    
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}

// elements.layout.hstack
class EclairHStack extends EclairView {
    constructor(elements) {
        super(elements)
        this
            .display("flex")
            .flexDirection("row")
            .alignItems("center")
            .css("justify-content: space-around;")
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.HStack)
    }
    
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}

// elements.layout.tabs
class EclairTabView extends EclairView {
    constructor(_selectedView, elements) {
        super(elements)
        
        if (_selectedView instanceof EclairState) {
            this.bindState(_selectedView, "tab", value => {
                for (let e = 0; e < this.children.length; e++) {
                    this.children[e].display(value == e? "flex": "none")
                }
            }, state => {return state.int(0)})
        } else {
            throw "First parameter of Eclair TabView's must be an Eclair State"
        }
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.TabView)
    }
    
    addChild(_child) {
        if (_child instanceof EclairView) {
            this.children.push(_child)
            _child.parent = this

            this.getElement(e => {
                let childHTML = child;
                if (_child instanceof EclairComponent) {
                    childHTML = _child.compile()
                }
                e.insertAdjacentHTML('beforeend', childHTML)
            })
        } else {
            throw "All children of Eclair's Tab View must inherit from an Eclair View"
        }
    }
}



// elements.standard.hr
class EclairHorizontalLine extends EclairCustomTagComponent {
    constructor() {
        super("hr")        
        this.addStyle(eclair.styles.HorizontalLine)
    }
}

// elements.standard.iframe
class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
    }
    
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
    }
    
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
    }
    
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
    }
    
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })  
    }
    
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
    }
    
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
    }
}

// elements.standard.image
class EclairImage extends EclairCustomTagComponent {
    constructor(_src) {
        super("img")
        
        this.bindState(_src, "src", value => {
            this.setAttr("src", value)
        })  
        
        this.addStyle(eclair.styles.Image)
    }
    
    altText(_alt) {
        this.bindState(_alt, "alt", value => {
            this.setAttr("alt", value)
        })  
    }
}

// elements.standard.link
class EclairLink extends EclairCustomTagComponent {
    constructor(_text) {
        super("a")
        
        this.bindState(_text, "html", value => {
            this.innerHTML(value)
        })  
        
        this.addStyle(eclair.styles.Link)
    }
    
    url(_location) {
        this.bindState(_location, "href", value => {
            this.setAttr("href", value)
        })  
        
        return this
    }
    
    target(_target) {
        this.bindState(_target, "target", value => {
            this.setAttr("target", value)
        })  
        
        return this
    }
}

// elements.standard.text
class EclairText extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
        })  
        
        this.addStyle(eclair.styles.Text)
    }
    
    type(_state) {
        this.bindState(_state, "type", newType => {
            if (newType == "title") {
                this.fontSize("40px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "subtitle") {
                this.fontSize("25px")
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading1") {
                this.fontSize("30px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading2") {
                this.fontSize("25px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading3") {
                this.fontSize("20px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading4") {
                this.fontSize("15px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }
        })  
        
        return this
    }
    
    build() {
        return `<span>${this._text}</span>`
    }
}






