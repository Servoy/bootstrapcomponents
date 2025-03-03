/* Checkbox is a standard input component that can have two states: checked and unchecked. */

var dataProviderID;

var readOnly;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

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
 * Whether the button is visible or not
 */
var visible;



var handlers = {
    /**
     * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     * 
     * @param {JSEvent} event
     * @param {String} dataTarget
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     * 
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
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
