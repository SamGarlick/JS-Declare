/// ## Eclair Toggle
/// An eclair toggle element.
/// ```javascript
/// let on = eclair.State(true)
/// eclair.Toggle(on)
/// ```
class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        // If the user want's onclicks/oncreates then they need to be stored here as 
        // this class has it's own methods. So we need this alternative place to 
        // store the callbacks.
        let overrideOnClick = null;
        let overrideOnCreate = null;
        
        // Create internal elements
        this._tickMark = eclair.Text("✓")
        this._knob = new EclairView([])
        
        this._hiddenComponent = eclair.HiddenInput(_value)
    
        // Bind this object with the given eclair states
        if (_value instanceof EclairState) {
            let self = this
            _value.addCallback(this.id() + "-toggle", function(state) {
                let value = state.bool()
                let cValue = value;
                
                self._hiddenComponent.getElement(e => {
                    cValue = e.value == "true"
                    e.value = value
                })
                
                self._updateStyle()
                if (self._callbacks.hasOwnProperty("onChange")) {
                    self.performCallback("onChange")  
                }
            }, false)
        } 
        
        // Manually update the callback map as onClick
        // is void to prevent the user altering it.
        let self = this;
        this._updateCallback("onClick", e => {
            if (e._enabled) {
                // Toggle the option and 
                this._hiddenComponent.getElement(e => {
                    let cVal = e.value == "true"
                    if (_value instanceof EclairState) {
                        _value.value(!cVal)
                    } else {
                        e.value = !cVal
                        this._updateStyle()
                        if (self._callbacks.hasOwnProperty("onChange")) {
                            self.performCallback("onChange")  
                        }
                    }
                })
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(self)
            }
        })
        
        // Create custom on create callback which calls and updates the style of this object
        this._updateCallback("onCreate", e => {
            this._updateStyle();
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        // Set default states
        this._showCheckMark = false
        this._enabled = true
        
        // Add styles
        this.addStyle(eclair.styles.Toggle)
        this._tickMark.addStyle(eclair.styles.ToggleTick)
        this._knob.addStyle(eclair.styles.ToggleKnob)
    }
    
    // No need for documentation as this is an overriden method.
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    // No need for documentation as this is an overriden method.
    onCreate(callback) {
        this.overrideOnCreate = callback;
        return this;
    }
    
    /// ### .knob
    /// This function allows you to access the toggle's knob as a means modify it.
    /// ```javascript
    /// eclair.Toggle(true)
    ///     .knob((element) => {
    ///         element.background("red")
    ///     })
    /// ```
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    /// ### .name
    /// Set the name attribute for a textbox (used in forms).
    /// ```javascript
    /// eclair.Toggle(true)
    ///     .name("fname")
    /// ```
    name(_name) {
        this._hiddenComponent.name(_name)
        return this;
    }
    
    /// ### .enabled
    /// Set whether the toggle button is enabled.    
    /// ```javascript
    /// eclair.Toggle(false)
    ///     .enabled(true)
    /// ```
    enabled(_enabled) {
        if (_enabled instanceof EclairState) {
            let self = this
            _enabled.addCallback(this.id() + "-enabled", function(state) {
                self._enabled = state.bool()
                self.opacity(self._enabled? 1 : 0.6)
            }, true)
        } else {
            this._enabled = _enabled
            self.opacity(_enabled? 1 : 0.6)
        }
        
        return this
    }
    
    /// ### .showTick
    /// Set whether the tick is showing.    
    /// ```javascript
    /// eclair.Toggle(false)
    ///     .showTick(true)
    /// ```
    showTick(_bool) {
        if (_bool instanceof EclairState) {
            let self = this
            _bool.addCallback(this.id() + "-showTick", function(state) {
                self._showCheckMark = state.bool()
                self._tickMark.opacity((self._showCheckMark && (self._hiddenComponent.getAttr("value") == "true"))? 1:0)
            }, true)
        } else {
            this._showCheckMark = _bool
            this._tickMark.opacity((_bool && (this._hiddenComponent.value() == "true"))? 1:0)
        }
        
        return this
    }
    
    // Doesn't need to be accessed externally as is managed internally.
    _updateStyle() {
        if (this._hiddenComponent.getAttr("value") == "true") {
            this.background(eclair.theme.accent)
            if (this._showCheckMark) {
                this._tickMark.opacity(1)
            }

            let elem = this.getElement()
            if (elem != null) {
                this._knob.left((this.getElement().clientWidth - this._knob.getElement().clientWidth - 6) + "px")
            }
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
            this._knob.left("0px")
        }
    }
    
    // Implement the build function. No doc needed as this is a standard function.
    build() {
        return this.wrapHTML(`<div>${this._tickMark.build()}`+this._knob.build()+this._hiddenComponent.build()+"</div>")
    }
}