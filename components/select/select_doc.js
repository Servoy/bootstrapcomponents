/**
 * Native Select displays a dropdown list of values. Allows single or multiple selection, bound to a data provider. 
 */

/**
 * Bound data provider identifier for the select component's value. Can be a table column or a form/global variable. If multiselect is true, dataProviderID type must either be a text or an sql array column.
 */
var dataProviderID;

/**
 * Flag indicating whether the select component is enabled for user interaction.
 */
var enabled;

/**
 * Dimensions (width and height) of the select component.
 */
var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Identifier for the value list that provides the available options for the select component.
 */
var valuelistID;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the select component.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

/**
 * Placeholder text displayed when no value is selected.
 */
var placeholderText;

/**
 * The number of rows (visible options) to display in the dropdown list.
 */
var selectSize;

/**
 * Flag indicating whether multiple selections are allowed. In case multiselect is true, the data provider should be an sql array column or a string containing a new line separated list of values.
 */
var multiselect;


var handlers = {
    /**
     * Fired when an option is selected from the dropdown.
     *
     * @param {JSEvent} event the event object containing details about the action event e.g. target element, selected option
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
     * @return {Boolean} True if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {},

    /**
     * Fired when the select component gains focus.
     *
     * @param {JSEvent} event the event object containing details about the focus gained event e.g. target element, timestamp
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the select component loses focus.
     *
     * @param {JSEvent} event the event object containing details about the focus lost event e.g. target element, timestamp
     */
    onFocusLostMethodID: function() {}
};

/**
 * Set the focus to combobox.
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}