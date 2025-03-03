/* Calendar is an input control component. It allows using a date-picker to choose Date values for a bound data-provider.
The key difference compared to the Calendar-Inline component is that this Calendar component is an input field that the shows the date-picker in a popup only when clicked; whereas the Calendar-Inline shows the date-picker directly on the form. */

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
