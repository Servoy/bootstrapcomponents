/*
 * Calendar-Inline is an inline input component. It shows a date-picker so the user can choose Date values for a bound data-provider.
 * It is similar to the Calendar component, but this Calendar-Inline shows the date-picker the date-picker directly on the form, not in a popup when clicked. 
 */

var calendarWeeks;

/**
 * Bound data provider identifier for the date value.
 */
var dataProviderID;

/**
 * This format is just used to be able to configure 'use as LocalDateTime'
 */
var format;

/**
 * Flag indicating whether the calendar is enabled for user interaction.
 */
var enabled;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Dimensions of the calendar component (width and height).
 */
var size;

/**
 * Visual theme applied to the calendar (e.g. light or dark).
 */
var theme;

/**
 * Tooltip text displayed when hovering over the calendar.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {dataproviderType} oldValue The previous date value from the data provider
     * @param {dataproviderType} newValue The new date value to be set in the data provider
     * @param {JSEvent} event The event object associated with the data change
     *
     * @return {Boolean} True if the new date value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {}
};


/**
 * Set the min date or max date that can be selected
 *  
 * @param {date} minDate The earliest date that can be selected in the Servoy component.
 * @param {date} maxDate The latest date that can be selected in the Servoy component. 
 */
function setMinMaxDate(minDate, maxDate) {
}

/**
 *  Dates that should be disabled.
 *
 * @param {Array<Date>} dateArray An array of dates to be disabled in the component.
 * 
 */
function disableDates(dateArray) {
}

/** 
* Days of the week that should be disabled.
* 
* @param {Array<Number>} dayArray An array of numbers representing the days of the week to be disabled, where 0 corresponds to Sunday and 6 to Saturday.
* 
*/
function disableDays(dayArray) {
};
