/*
 * A choice group input component shows a group of checkboxes, each one for one of the values from a provided value list; it will have in it's attached dataprovider the selected values as a carriage return-separated string. 
 */

/**
 * Bound data provider identifier for the Choice Group component's value. Can be a table column or a form/global variable. If inputType is 'checkbox', component will behave in multiselect mode then dataProviderID type must either be a text or an sql array column.
 */
var dataProviderID;

/**
 * Flag indicating whether the choice group is enabled for user interaction.
 */
var enabled;

/**
 * Type of input for the choice group; typically 'checkbox' or 'radio'.
 */
var inputType;

/**
 * Dimensions of the choice group component (width and height).
 */
var size;

/**
 * Option whether choice text is shown as plain text, sanitized html or trusted html (as is).
 */
var showAs;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Identifier for the value list that provides the available options.
 */
var valuelistID;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the choice group.
 */
var toolTipText;


/**
 * Whether the button is visible or not
 */
var visible;

/**
 * Alignment of the choice group options; for example, 'vertical' or 'horizontal'.
 */
var alignment;


var handlers = {
    /**
     * Fired when an action occurs in the choice group such as when the selection changes.
     *
     * @param {JSEvent} event the event object containing details about the action event (e.g. target element, event type)
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
     * Fired when the choice group gains focus.
     *
     * @param {JSEvent} event the event object containing details about the focus gained event (e.g. target element, timestamp)
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the choice group loses focus.
     *
     * @param {JSEvent} event the event object containing details about the focus lost event (e.g. target element, timestamp)
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
