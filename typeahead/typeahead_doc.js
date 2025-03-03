var dataProviderID;

var readOnly;

var findmode;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var valuelistID;

/**
 * Option typeahead options are shown as plain text or sanitized html.
 */
var showAs;

var tabSeq;

/**
 * Whether the button is visible or not
 */
var visible;

var selectOnEnter;



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
    onFocusLostMethodID: function() {}
};

var dataProviderID;

var readOnly;

var findmode;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var errorShow;

var valuelistID;

/**
 * Option typeahead options are shown as plain text or sanitized html.
 */
var showAs;

var tabSeq;

/**
 * Whether the button is visible or not
 */
var visible;

var selectOnEnter;



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
    onFocusLostMethodID: function() {}
};

/**
 * Request the focus to this typeahead.
 * 
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] if false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}

/**
 * Toggles the display of the error message for the component.
 * 
 * @param {boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}