/**
 * Checkbox is a standard input component that can have two states: checked and unchecked. 
 */

var dataProviderID;

/**
 * Flag indicating whether the checkbox is enabled for user interaction.
 */
var enabled;

/**
 * Dimensions of the checkbox (width and height).
 */
var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * The text label displayed next to the checkbox.
 */
var text;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * The value returned when the checkbox is checked (default is 1)
 */
var selectedValue;

/**
 * Option whether checkbox text is shown as plain text, sanitized html or trusted html (as is).
 */
var showAs;

/**
 * Tooltip text displayed when hovering over the checkbox.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     *
     * @param {JSEvent} event The event object containing details about the click event (e.g. target element, mouse coordinates)
     * @param {String} dataTarget The identifier for inner html elements defined by their data-target attribute
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {dataproviderType} oldValue The previous value from the data provider
     * @param {dataproviderType} newValue The new value to be set in the data provider
     * @param {JSEvent} event The event object associated with the data change
     *
     * @return {Boolean} True if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {},

    /**
     * @param {JSEvent} event The event object containing details about the focus gained event (e.g. target element, timestamp)
     */
    onFocusGainedMethodID: function() {},

    /**
     * @param {JSEvent} event The event object containing details about the focus lost event (e.g. target element, timestamp)
     */
    onFocusLostMethodID: function() {}
};


/**
 * Request the focus to this checkbox.
 * 
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod]
 *            If false will not execute the onFocusGained
 *            method; the default value is true
 */
function requestFocus (mustExecuteOnFocusGainedMethod) {}
