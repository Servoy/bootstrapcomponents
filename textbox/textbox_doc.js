var dataProviderID;

var enabled;

var format;

var inputType;

var editable;

var placeholderText;

var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Set the styleclasses for the eye when inputType on this component is password-with-eye, you need to add main(not manadatory), eye and eye-slash classes in this order, default value for NG is 'glyphicon glyphicon-eye-open glyphicon-eye-close' and for TiNG 'fa fa-eye fa-eye-slash'
 */
var styleClassForEye;

var tabSeq;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

var selectOnEnter;

/**
 * Html autocomplete property of the input field.
 */
var autocomplete;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     *
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusGainedMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusLostMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onRightClickMethodID: function() {}
};

var dataProviderID;

var enabled;

var format;

var inputType;

var editable;

var floatLabelText;

var errorMessage;

var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Set the styleclasses for the eye when inputType on this component is password-with-eye, you need to add main(not manadatory), eye and eye-slash classes in this order, default value for NG is 'glyphicon glyphicon-eye-open glyphicon-eye-close' and for TiNG 'fa fa-eye fa-eye-slash'
 */
var styleClassForEye;

var tabSeq;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

var selectOnEnter;

/**
 * Html autocomplete property of the input field.
 */
var autocomplete;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     *
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusGainedMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusLostMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onRightClickMethodID: function() {}
};

/**
 * Request the focus to this text field.
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}

/**
 * Reset the dataProvider to null and change the inputType of the textbox.<br/>
 * <b>Note:</b> the value of the dataProvider bound to this field will be automatically set to null
 * @param {String} inputType allowed values for inputType are <i>text, password, email, tel, date, time, datetime-local, month, week, number, color</i>
 * @example %%prefix%%%%elementName%%.inputType("tel");
 * 
 * @return {Boolean} True if the inputType was successfully changed and the dataProvider was reset to null; false otherwise.
 */
function setInputType(inputType) {}

/**
 * Toggles the display of the error message for the component.
 * 
 * @param {Boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}
