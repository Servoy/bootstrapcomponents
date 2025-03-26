/**
 *  TextArea is a multi-line text input component that allows users to enter and edit text.
 */

/**
 * Bound data provider identifier for the textarea's value.
 */
var dataProviderID;

/**
 * Flag indicating whether the textarea is enabled for user interaction.
 */
var enabled;

/**
 * Flag indicating whether the textarea is editable.
 */
var editable;


/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Dimensions (width and height) of the textarea component.
 */
var size;

/**
 * Placeholder text displayed when the textarea is empty.
 */
var placeholderText;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the textarea.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

/**
 * Maximum length allowed for the textarea input.
 */
var maxLength;


var handlers = {
    /**
     * Fired when an action is triggered on the textarea.
     *
     * @param {JSEvent} event the event object containing details about the action event e.g. target element, event type
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
     * Fired when the textarea gains focus.
     *
     * @param {JSEvent} event the event object containing details about the focus gained event e.g. target element, timestamp
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the textarea loses focus.
     *
     * @param {JSEvent} event the event object containing details about the focus lost event e.g. target element, timestamp
     */
    onFocusLostMethodID: function() {},

    /**
     * Fired when the textarea is right-clicked.
     *
     * @param {JSEvent} event the event object containing details about the right-click event e.g. target element, mouse coordinates
     */
    onRightClickMethodID: function() {}
};

/**
 * Request the focus to this textarea.
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}

/**
 * Toggles the display of the error message for the component.
 * @param {Boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}
