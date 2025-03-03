/* Calendar is an input control component. It allows using a date-picker to choose Date values for a bound data-provider.
The key difference compared to the Calendar-Inline component is that this Calendar component is an input field that the shows the date-picker in a popup only when clicked; whereas the Calendar-Inline shows the date-picker directly on the form. */

var calendarWeeks;

var dataProviderID;

var enabled;

var format;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var floatLabelText;

var errorMessage;

var size;

var tabSeq;

var theme;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

/**
 * Whether to select the text when date field is focused.
 */
var selectOnEnter;

/**
 * Whether to only allow date entry from the date picker or not (cannot type the date).
 */
var pickerOnly;


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


var calendarWeeks;

var dataProviderID;

var enabled;

var format;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var placeholderText;

var size;

var tabSeq;

var theme;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;

/**
 * Whether to select the text when date field is focused.
 */
var selectOnEnter;

/**
 * Whether to only allow date entry from the date picker or not (cannot type the date).
 */
var pickerOnly;

/**
 * See https://getdatepicker.com/6/options/ what options you can set, some could be overridden by the locale again
 */
var options;


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
 * Set the focus to this calendar.
 * 
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod]
 *            if false will not execute the onFocusGained
 *            method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {
}

/**
 * Set the min date or max date that can be selected
 *  
 * @param {date} minDate The earliest date that can be selected in the component. 
* @param {date} maxDate The latest date that can be selected in the component.
* @param {Boolean} [keepInvalid] Optional. A flag indicating whether to retain previously restricted dates that are no longer valid (true) or to remove them (false).
 * 
 */
function setMinMaxDate(minDate, maxDate, keepInvalid) {
}

/**
 *  Dates that should be disabled.
 *
 * @param {Array<Date>} dateArray An array of dates to be disabled in the component.
 * @param {Boolean} [keepInvalid] A flag indicating whether to retain previously disabled dates that are no longer valid (true) or to remove them (false).
 */
function disableDates(dateArray, keepInvalid) {
}

/** 
* Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday).
* 
* @param {Array<Number>} dayArray An array of numbers representing the days of the week to be disabled, where 0 corresponds to Sunday and 6 to Saturday.
* @param {Boolean} [keepInvalid] A flag indicating whether to retain previously disabled days that are no longer valid (true) or to remove them (false).
* 
*/
function disableDays(dayArray, keepInvalid) {
};

/**
 * Toggles the display of the error message for the component.
 * 
 * @param {Boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}
