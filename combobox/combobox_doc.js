/* Combobox is a standard input component that allows the user to pick one of the options in it's drop-down list. */

var dataProviderID;

var readOnly;

var findmode;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var tabSeq;

var valuelistID;

/**
 * Whether the button is visible or not
 */
var visible;



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

var errorShow;

var readOnly;

var findmode;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var tabSeq;

var valuelistID;

/**
 * Whether the button is visible or not
 */
var visible;



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
* Request the focus to this combobox.
* @example %%prefix%%%%elementName%%.requestFocus();
* @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
*/
function requestFocus(mustExecuteOnFocusGainedMethod) { }

/**
 * Toggles the display of the error message for the component.
 * @param {Boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}
