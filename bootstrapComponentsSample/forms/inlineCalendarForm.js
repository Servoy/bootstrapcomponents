/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"5777DFE9-03D3-40C2-930C-7FBD280B2004"}
 */
var restricted_msg_dp = null;

/**
 * @properties={"typeid":35,"uuid":"AC115489-A68D-4DC9-883C-B09F27E251AC","variableType":-4}
 */
const dayMap = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    };

/**
 * @type {Date}
 * @properties={"typeid":35,"uuid":"EFDC3CA8-C73B-460E-91E4-1E7AFE0323A1","variableType":93}
 */
var min_date = null;

/**
 * @type {Date}
 * @properties={"typeid":35,"uuid":"4CE56D21-635A-4B97-B370-4FA483167E5D","variableType":93}
 */
var max_date = null;

/**
 * @type {Array<Date>}
 * @properties={"typeid":35,"uuid":"9B09E8A2-DABF-4591-8B58-050C6BC150EF","variableType":-4}
 */
var restricted_dates = [];

/**
 * @type {Boolean}
 * @properties={"typeid":35,"uuid":"788AA06B-F550-4927-A9F5-D76516144A6C","variableType":-4}
 */
var keep_invalid_dp = false;

/**
 * @type {String}
 * @properties={"typeid":35,"uuid":"DF7D1BA4-B531-4D8C-818B-DC986A052FA2"}
 */
var disabled_days = '';

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"F661BEDA-402F-490C-9F45-E7916701C2DA","variableType":93}
 */
var restricted_dates_dp = new Date();

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"822414CB-14F3-486C-A8CD-CED5EC1D626F"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"2A0A6EDD-E515-43CE-A917-E5C21ED1B6C2"}
 */
var format_dp = 'MM/dd/yyyy';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"CF99D90C-CD18-49C2-8C64-F252700A438F"}
 */
var base_message_dp = null;

/**
 * @properties={"typeid":35,"uuid":"5CD3B740-46D6-4E8F-A542-52A6113AF453","variableType":-4}
 */
var visible_dp = true;

/**
 * @properties={"typeid":35,"uuid":"13F1D397-BC89-4E3E-BB4D-BAF96A2C8D42","variableType":-4}
 */
var enabled_dp = true;

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"8C8DCA57-D9EF-4A1B-92C3-ADC6D899D197","variableType":93}
 */
var date_dp = new Date();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"3F35BAA4-D605-4418-B07B-114869367CBC"}
 */
function onStyleClassAction(event) {
var calendar = elements.baseInlineCalendar;
	
	if (calendar.hasStyleClass('bg-primary')) {
		calendar.removeStyleClass('bg-primary');
		calendar.addStyleClass('bg-success');
		updateBaseCalendarStatus('Changed style to bg-success');
	} else if (calendar.hasStyleClass('bg-success')) {
		calendar.removeStyleClass('bg-success');
		calendar.addStyleClass('bg-warning');
		updateBaseCalendarStatus('Changed style to bg-warning');
	} else if (calendar.hasStyleClass('bg-warning')) {
		calendar.removeStyleClass('bg-warning');
		calendar.addStyleClass('bg-danger');
		updateBaseCalendarStatus('Changed style to bg-danger');
	} else if (calendar.hasStyleClass('bg-danger')) {
		calendar.removeStyleClass('bg-danger');
		calendar.addStyleClass('bg-info');
		updateBaseCalendarStatus('Changed style to bg-info');
	} else if (calendar.hasStyleClass('bg-info')) {
		calendar.removeStyleClass('bg-info');
		calendar.addStyleClass('bg-primary');
		updateBaseCalendarStatus('Changed style to bg-primary');
	} else {
		calendar.addStyleClass('bg-primary');
		updateBaseCalendarStatus('Added style bg-primary');
	}
	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * TODO generated, please specify type and doc for the params
 * @param message
 *
 * @properties={"typeid":24,"uuid":"0F96F781-764D-4728-AC00-9116FAAE1295"}
 */
function updateBaseCalendarStatus(message) {
	base_message_dp = message
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"5DDBB9F6-D600-48A9-AB6E-1271E251C36C"}
 */
function onToggleVisible(event) {
	visible_dp = !visible_dp;
	// Update status display
	updateBaseCalendarStatus('Calendar visible = ' + visible_dp);
	
	// If button is now invisible, show a message
	if (!visible_dp) {
		updateBaseCalendarStatus('visible = false: the calendar is now hidden. Click "Toggle" again to show it.');
	}
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"AFB81A56-2373-4708-B305-567BC1B45E51"}
 */
function onToggleEnabled(event) {
	enabled_dp = !enabled_dp;
	updateBaseCalendarStatus("Calendar enabled: " + enabled_dp);
	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"0D0A9F0D-B589-463F-AB73-B5F39F4501C8"}
 */
function onReset(event) {
	date_dp = new Date();
	format_dp = 'MM/dd/yyyy';
	elements.baseInlineCalendar.format = format_dp;
	enabled_dp = true;
	visible_dp = true;
	tooltip_dp = 'This is a demo calendar for basic configuration';
	updateBaseCalendarStatus('Day-Month-Year with dashes (e.g., 28-07-2025)\n\nFormat uses: d=day, M=month, y=year');
	elements.baseInlineCalendar.toolTipText = tooltip_dp;
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param {String} oldValue
 * @param {String} newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"10084714-422E-48E4-A045-EEAB688B7F26"}
 */
function onFormatDataChange(oldValue, newValue, event) {
	elements.baseInlineCalendar.format = newValue;
	switch(newValue) {
		case 'dd-MM-yyyy':
			updateBaseCalendarStatus('Day-Month-Year with dashes (e.g., 28-07-2025)\n\nFormat uses: d=day, M=month, y=year');
			break;
		case 'dd-MM-yyyy HH:mm':
			updateBaseCalendarStatus('Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:48)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute');
			break;
	}
	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"F701EBC2-E334-4480-B7B3-BFB0DC293E9C"}
 */
function onTooltip(event) {
	elements.baseInlineCalendar.toolTipText = tooltip_dp;
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"B593ACF4-4EAF-4D48-BEA1-CF0BD5AA263F"}
 */
function onLoad(event) {
	onReset(event);
	scopes.global.setStatusMessage('Inline Calendar Form loaded');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"2F5DFB2C-F9DB-4FEC-A5A7-C179D42C51D5"}
 */
function onMinDate(event) {
	min_date = restricted_dates_dp;
	if (!max_date) {
		updateBaseCalendarStatus('Min date ' + min_date + '. Select also a max date in order to apply the restriction!');
	}
	if (min_date && max_date && (min_date > max_date)) {
		updateBaseCalendarStatus('Min date ' + min_date + ' > ' + max_date + '. Can\'t apply restrictions!');
	} else {
		elements.calendarinline_restricted.setMinMaxDate(min_date,max_date);
	}
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"33C24E5A-AD38-44B3-899C-0A90134899C5"}
 */
function onMaxDate(event) {
	max_date = restricted_dates_dp;
	if (!min_date) {
		updateBaseCalendarStatus('Max date ' + min_date + '. Select also a min date in order to apply the restriction!');
	}
	if (min_date && max_date && (max_date < min_date)) {
		updateBaseCalendarStatus('Min date ' + min_date + ' > ' + max_date + '. Can\'t apply restrictions!');
	} else {
		elements.calendarinline_restricted.setMinMaxDate(min_date,max_date);
	}
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"6F2C289F-A813-480F-A142-B37CCAE07E6C"}
 */
function onDisableDate(event) {
	updateBaseCalendarStatus('Disable date: ' + restricted_dates_dp)
	elements.calendarinline_restricted.disableDates([restricted_dates_dp]);
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"B7DB77C1-3C2D-49C7-99D4-B3CC4E805E20"}
 */
function onRestrictionReset(event) {
	disabled_days = '';
	elements.calendarinline_restricted.setMinMaxDate(new Date(1900, 0, 1), new Date(9999, 11, 31))
	elements.calendarinline_restricted.disableDates([]);
	elements.calendarinline_restricted.disableDays([]);

}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"0E56B6E0-4F57-4232-BB35-5D28DCB27ABD"}
 */
function onBaseDataChange(oldValue, newValue, event) {
	updateBaseCalendarStatus('Date selected: ' + newValue);
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"8C6BBD2E-9106-4071-80F9-A5A1B4327568"}
 */
function onRestrictedDataChange(oldValue, newValue, event) {
	restricted_msg_dp = 'Date selected: ' + newValue;
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"77A44479-1A05-4419-BD0C-9231F90A709E"}
 */
function onRestrictedDaysDataChange(oldValue, newValue, event) {	
	var disabledDays = newValue
	    .split('\n')
	    .map(day => day.trim().toLowerCase())
	    .filter(day => dayMap.hasOwnProperty(day))
	    .map(day => dayMap[day]);
	
	elements.calendarinline_restricted.disableDays(disabledDays);
	
	updateBaseCalendarStatus('Days selected: ' + newValue);
	
	scopes.global.setStatusMessage(event.getElementName() + ' changed: ' + newValue);
	return true;
}
