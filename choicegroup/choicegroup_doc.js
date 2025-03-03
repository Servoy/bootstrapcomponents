/* A choice group input component shows a group of checkboxes, each one for one of the values from a provided value list; it will have in it's attached dataprovider the selected values as a carriage return-separated string. */

var dataProviderID;

var enabled;

var inputType;

var size;

/**
 * Option whether choice text is shown as plain text, sanitized html or trusted html (as is).
 */
var showAs;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var valuelistID;

var tabSeq;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

var alignment;


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
    onFocusLostMethodID: function() {}
};


/**
 * Request the focus to this choicegroup.
 * 
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod]
 *            if false will not execute the onFocusGained
 *            method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}
