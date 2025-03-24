/**
 * Native Data List displays a list of data items and allows selection.
 */

/**
 * Bound data provider identifier for the list component's value.
 */
var dataProviderID;

/**
 * Flag indicating whether the list component is enabled for user interaction.
 */
var enabled;

/**
 * Flag indicating whether the list component is editable.
 */
var editable;

/**
 * Dimensions (width and height) of the list component.
 */
var size;

/**
 * CSS style classes to be applied to the list component.
 */
var styleClass;

/**
 * Identifier for the value list that provides the available options for the list.
 */
var valuelistID;

/**
 * Placeholder text displayed when no value is selected.
 */
var placeholderText;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the list component.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Fired when an action is performed on the list component (for example, when an item is selected).
     *
     * @param {JSEvent} event the event object containing details about the action event e.g. target element, interaction details
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {${dataproviderType}} oldValue the previous value from the data provider
     * @param {${dataproviderType}} newValue the new value to be set in the data provider
     * @param {JSEvent} event the event object associated with the data change
     * 
     * @return {Boolean} True if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {},

    /**
     * Fired when the list component gains focus.
     *
     * @param {JSEvent} event the event object containing details about the focus gained event e.g. target element, timestamp
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the list component loses focus.
     *
     * @param {JSEvent} event the event object containing details about the focus lost event e.g. target element, timestamp
     */
    onFocusLostMethodID: function() {}
};

/**
 * Set the focus to the list input
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}