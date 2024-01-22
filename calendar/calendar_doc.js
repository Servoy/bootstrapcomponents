/* Calendar is an input control component. It allows using a date-picker to choose Date values for a bound data-provider.
The key difference compared to the Calendar-Inline component is that this Calendar component is an input field that the shows the date-picker in a popup only when clicked; whereas the Calendar-Inline shows the date-picker directly on the form. */

/**
 * Set the focus to this calendar.
 * 
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param mustExecuteOnFocusGainedMethod
 *            (optional) if false will not execute the onFocusGained
 *            method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {
}

/**
 * Set the min date or max date that can be selected
 *  
* @param {Date} minDate
* @param {Date} maxDate
* @param {Boolean} [keepInvalid]
* 
*/
function setMinMaxDate(minDate, maxDate, keepInvalid) {
}

/**
 *  Dates that should be disabled.
 *
 * @param {Array<Date>} dateArray
* @param {Boolean} [keepInvalid]
* 
*/
function disableDates(dateArray, keepInvalid) {
}

/** 
* Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday).
* 
* @param {Array<Number>} dayArray
* @param {Boolean} [keepInvalid]
* 
*/
function disableDays(dayArray, keepInvalid) {
};
