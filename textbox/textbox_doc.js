/**
 *  TextBox is a text input component styled with Bootstrap. It allows users to enter single-line text values.
 *  The component supports various input types (e.g. text, password, email, etc.) and includes features such as autocomplete and error messaging.
 */

/**
 * Bound data provider identifier for the text field value.
 */
var dataProviderID;

/**
 * Flag indicating whether the text box is enabled for user interaction.
 */
var enabled;

/**
 * Format string used to display and parse the text box value.
 */
var format;

/**
 * The type of input for the text field (e.g. text, password, email, tel, etc.).
 */
var inputType;

/**
 * Flag indicating whether the text box is editable.
 */
var editable;

/**
 * Placeholder text displayed when the text box is empty.
 */
var placeholderText;

/**
 * Dimensions (width and height) of the text box component.
 */
var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Set the styleclasses for the eye when inputType on this component is password-with-eye, you need to add main(not manadatory), eye and eye-slash classes in this order, default value for NG is 'glyphicon glyphicon-eye-open glyphicon-eye-close' and for TiNG 'fa fa-eye fa-eye-slash'
 */
var styleClassForEye;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the text box.
 */
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
     * Fired when the text box action is triggered (for example, when the Enter key is pressed).
     *
     * @param {JSEvent} event the event object containing details about the action event e.g. target element, key pressed
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {dataproviderType} oldValue the previous value from the data provider
     * @param {dataproviderType} newValue the new value to be set in the data provider
     * @param {JSEvent} event the event object associated with the data change
     * 
     * @return {Boolean} true if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {},

    /**
     * Fired when the text box gains focus.
     *
     * @param {JSEvent} event the event object containing details about the focus gained event e.g. target element, timestamp
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the text box loses focus.
     *
     * @param {JSEvent} event the event object containing details about the focus lost event e.g. target element, timestamp
     */
    onFocusLostMethodID: function() {},

    /**
     * Fired when the text box is right-clicked.
     *
     * @param {JSEvent} event the event object containing details about the right-click event e.g. target element, mouse coordinates
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
