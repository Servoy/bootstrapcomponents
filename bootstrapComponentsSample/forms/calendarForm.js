/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"66E49DC1-34D6-496D-B4F7-5772D8A59DAA","variableType":-4}
 */
var side_by_side_option = {
	  display: {
		  sideBySide: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"1280FFC0-E9FA-403A-839D-4FD78B8AE53F","variableType":-4}
 */
var calendar_time_only_option = {
	display: {
	    viewMode: 'clock'
	  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"5825BFFD-5656-4166-89D4-FA38EDFA3DFB","variableType":-4}
 */
var dark_theme_option = {
	  display: {
		  theme: 'dark'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"52F4E4F5-E6A3-4CBA-A6D6-67913218C056","variableType":-4}
 */
var month_view_option = {
	  display: {
		  viewMode: 'months'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"0448A562-58F7-4D30-80BE-70C9D4918618","variableType":-4}
 */
var inline_option = {
	  display: {
		  inline: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"6D90CE9A-CD44-4217-8D90-E57171348547","variableType":-4}
 */
var custom_icons_option = {
	  display: {
	    icons: {
	      time:     'far fa-clock',
	      date:     'far fa-calendar',
	      previous: 'fas fa-arrow-left',
	      next:     'fas fa-arrow-right',
	      today:    'far fa-calendar-check',
	      clear: 	'fas fa-eraser',
	      close:    'fas fa-times-circle'
	    }
	  }
	};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"D88B5D17-F755-4F52-9244-2647B28BD3FA","variableType":-4}
 */
var today_only_button_option = {
	  display: {
		  buttons: {
			  today: true,
			  clear: false,
			  close: false
			  }
		  }
};

/**
 * @properties={"typeid":35,"uuid":"75F96522-BA1B-43D5-99CA-6F8020F9975D","variableType":-4}
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
 * @type {String}
 * @properties={"typeid":35,"uuid":"6F7AB0F9-5EA7-403E-97A4-657A4DE62AB8"}
 */
var disabledDaysDP = null;

/**
 * @type {Array<Number>}
 * @properties={"typeid":35,"uuid":"8D9CECBC-CA7A-434E-AF3F-AF5952154CCD","variableType":-4}
 */
var disabledDays = [];

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"F73E4B73-58FF-49A3-849E-512EFB0A6DEF","variableType":-4}
 */
var keepInvalidDP = false;

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"F48DBB6A-79D0-4DCD-8CB6-032C9EF5FA6F","variableType":93}
 */
var minMaxDP = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"99E391A1-6EB2-444B-BE74-9128AF621CA8","variableType":93}
 */
var maxdateDP = (function() {
    var dateNo = new Date().getTime() + (21 * 24 * 60 * 60 * 1000); // 3 weeks in ms
    return new Date(dateNo);
})();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"19BD92F6-69AD-41F0-9237-71B1C1F6026F","variableType":93}
 */
var mindateDP = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"79477B8B-9B07-4EE1-B980-3852C6768543","variableType":93}
 */
var customDate = new Date();

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"FA039CD7-43FB-40BB-BFD8-09957FE8B76E"}
 */
var placeholder_dp = 'Select a date';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"EB59DCD6-8E78-4DA1-9DBC-49B4A8889AF0"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';

/**
 * @properties={"typeid":35,"uuid":"513B858F-3769-4EE9-9593-B5AEE05EDEEF","variableType":-4}
 */
var enableDP = true;

/**
 * @properties={"typeid":35,"uuid":"B7885E03-A8D6-4A7A-AECF-B9CB2770EB18","variableType":-4}
 */
var visibleDP = true;

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"F49EB0F1-D50B-458E-8F88-DC38274E1F1C"}
 */
var base_message_dp = 'Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:38)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"B447C8A6-8961-440B-928B-B7248D755B80"}
 */
var format_dp = 'MM/dd/yyyy hh:mm aa';

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"D6229B40-D31A-4A99-AA48-9EA9B4B4CD03","variableType":93}
 */
var date_dp = new Date();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"D65F0B2B-E72A-437A-9A69-7C6F1E924589"}
 */
function onToggleEnabled(event) {
	enableDP = !enableDP;
	updateBaseCalendarStatus("Calendar enabled: " + enableDP);
	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"2C1F5291-4D67-4617-9153-6203AA49A653"}
 */
function onToggleVisible(event) {
	visibleDP = !visibleDP;
	// Update status display
	updateBaseCalendarStatus('Calendar visible = ' + visibleDP);
	
	// If button is now invisible, show a message
	if (!visibleDP) {
		updateBaseCalendarStatus('visible = false: the calendar is now hidden. Click "Toggle" again to show it.');
	}
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"01E77CEE-B928-4A7A-A94D-3C4EE11CBF15"}
 */
function onStyleclassChange(event) {
	var calendar = elements.basic_calendar;
	
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
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"E6E2A0C4-AC74-417A-AA9C-F4FB89D44013"}
 */
function onApplyTooltip(event) {
	elements.basic_calendar.toolTipText = tooltip_dp;
	updateBaseCalendarStatus("Tooltip set to: \`" + tooltip_dp + "\'" )
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"27C9F3FF-19C9-4FE4-974F-0326C01946A3"}
 */
function onApplyPlaceholder(event) {
	date_dp = null;
	elements.basic_calendar.placeholderText = placeholder_dp;
	updateBaseCalendarStatus("Placeholder set to: \`" + placeholder_dp + "\'" );
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * TODO generated, please specify type and doc for the params
 * @param message
 *
 * @properties={"typeid":24,"uuid":"3DD63A2F-6DA6-4AC9-8CDB-388A263C4C17"}
 */
function updateBaseCalendarStatus(message) {
	base_message_dp = message;
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
 * @properties={"typeid":24,"uuid":"8A1AA003-877F-4FE6-A1D0-F491F2D33B7E"}
 */
function onFormatDataChange(oldValue, newValue, event) {
	elements.basic_calendar.format = newValue; 
	switch(newValue) {
		case 'dd-MM-yyyy':
			updateBaseCalendarStatus('Day-Month-Year with dashes (e.g., 28-07-2025)\n\nFormat uses: d=day, M=month, y=year');
			break;
		case 'dd-MM-yyyy HH:mm':
			updateBaseCalendarStatus('Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:48)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute');
			break;
		case 'MM/dd/yyyy':
			updateBaseCalendarStatus('Month/Day/Year with slashes (e.g., 07/28/2025)\n\nFormat uses: M=month, d=day, y=year');
			break;
		case 'MM/dd/yyyy hh:mm aa':
			updateBaseCalendarStatus('Month/Day/Year with time in 12-hour format and AM/PM (e.g., 07/28/2025 09:48 PM)\n\nFormat uses: M=month, d=day, y=year, h=hour(1-12), m=minute, a=AM/PM');
			break;
		case 'dd.MM.yyyy':
			updateBaseCalendarStatus('Day.Month.Year with dots (e.g., 28.07.2025)\n\nFormat uses: d=day, M=month, y=year');
			break;
		case 'yyyy-MM-dd':
			updateBaseCalendarStatus('ISO date format: Year-Month-Day (e.g., 2025-07-28)\n\nFormat uses: y=year, M=month, d=day');
			break;
		case 'EEEE, MMMM d, yyyy':
			updateBaseCalendarStatus('Full date with weekday: Weekday, Month Day, Year (e.g., Monday, July 28, 2025)\n\nFormat uses: E=day in week, M=month name, d=day, y=year');
			break;
		case 'dd MMM yyyy':
			updateBaseCalendarStatus('Day with abbreviated month: Day Month Year (e.g., 28 Jul 2025)\n\nFormat uses: d=day, M=abbreviated month name, y=year');
			break;
		case 'HH:mm:ss':
			updateBaseCalendarStatus('24-hour time format: Hours:Minutes:Seconds (e.g., 21:48:54)\n\nFormat uses: H=hour(0-23), m=minute, s=second');
			break;
		case 'yyyy-MM-dd\'T\'HH:mm:ss.SSS Z':
			updateBaseCalendarStatus('ISO 8601 timestamp format (e.g., 2025-07-28T22:33:19.000 +0300)\n\nFormat uses: y=year, M=month, d=day, H=hour(0-23), m=minute, s=second, S=millisecond, Z=timezone offset');
			break;
		case 'dd MMMM yyyy \'at\' HH:mm:ss z':
			updateBaseCalendarStatus('Full date and time with timezone: Day Month Year at Hours:Minutes:Seconds Timezone (e.g., 28 July 2025 at 22:33:19 EEST)\n\nFormat uses: d=day, M=full month name, y=year, H=hour(0-23), m=minute, s=second, z=timezone');
			break;
		case 'QQQ yyyy':
			updateBaseCalendarStatus('Quarter and year: Quarter Year (e.g., Q3 2025)\n\nNote: The "Q" format character for quarter may not be supported in all Java date formatters. If this format doesn\'t display correctly, try using "MM" for month instead and calculate the quarter manually.\n\nFormat uses: Q=quarter (1-4), y=year');
			break;
		case 'ww \'week of\' yyyy':
			updateBaseCalendarStatus('Week number and year: Week# week of Year (e.g., 31 week of 2025)\n\nFormat uses: w=week in year (1-52/53), y=year');
			break;
		case 'DDD \'day of\' yyyy':
			updateBaseCalendarStatus('Day of year: Day# day of Year (e.g., 209 day of 2025)\n\nFormat uses: D=day in year (1-366), y=year');
			break;
		case 'EEE MMM dd HH:mm:ss z yyyy':
			updateBaseCalendarStatus('Unix date format: Weekday Month Day Hours:Minutes:Seconds Timezone Year (e.g., Mon Jul 28 22:33:19 EEST 2025)\n\nFormat uses: E=day in week (abbreviated), M=month (abbreviated), d=day, H=hour(0-23), m=minute, s=second, z=timezone, y=year');
			break;
		case 'yyyy\'年\'MM\'月\'dd\'日\'':
			updateBaseCalendarStatus('Japanese/Chinese date format: Year年Month月Day日 (e.g., 2025年07月28日)\n\nFormat uses: y=year, M=month, d=day with CJK characters for year/month/day');
			break;
	}
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"22526422-F28D-403D-B612-BDD2E08D6995"}
 */
function onBasicResetAction(event) {
	date_dp = new Date();
	format_dp = 'MM/dd/yyyy hh:mm aa';
	elements.basic_calendar.format = format_dp;
	enableDP = true;
	visibleDP = true;
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');

}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param {Date} oldValue
 * @param {Date} newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"FCAA706D-3EF8-42AD-856D-E75EDF6C27AB"}
 */
function onMinDataChange(oldValue, newValue, event) {
	if (newValue < maxdateDP) {
		mindateDP = newValue
		return true;
	} else {
		scopes.global.setStatusMessage("CalendarForm - error on setting min date");
	}
	return false;
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param {Date} oldValue
 * @param {Date} newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={"typeid":24,"uuid":"4028CBD6-AC98-4ADB-8BFC-41244748590B"}
 */
function onMaxDataChange(oldValue, newValue, event) {
	if (newValue > mindateDP) {
		maxdateDP = newValue
		return true;
	} else {
		scopes.global.setStatusMessage("CalendarForm - error on setting maxß date");
	}
	return false;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"1F07515E-6217-4C3B-BB73-FE54172F6577"}
 */
function onTest(event) {
	application.output('Test btn pressed');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"60D94C0B-EE28-4040-AB33-253088C39391"}
 */
function onCalendarFormLoad(event) {
	elements.minmax_calendar.setMinMaxDate(mindateDP, maxdateDP);
	initCustomModes();
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"DB6678E4-B1D1-4A6F-9114-6F0DF6084732"}
 */
function onAddMinDisabledDate(event) {
	elements.minmax_calendar.disableDates([mindateDP], keepInvalidDP);
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"69A40173-C8FC-4D54-BE16-05A7874B6FD4"}
 */
function onAddMaxDisabledDate(event) {
	elements.minmax_calendar.disableDates([maxdateDP], keepInvalidDP);
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
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
 * @properties={"typeid":24,"uuid":"1C1C9E54-5AAC-482E-85EC-E0EAB25B7EB5"}
 */
function onDisableDaysChange(oldValue, newValue, event) {
    var disabledDaysArray = newValue
        .split(',')
        .map(day => day.trim().toLowerCase())
        .filter(day => dayMap.hasOwnProperty(day))
        .map(day => dayMap[day]);

    elements.minmax_calendar.disableDays(disabledDaysArray, keepInvalidDP);	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"635A9141-E0CA-4D63-8F64-E69ED182D43F"}
 */
function onRestrictionsReset(event) {
	elements.minmax_calendar.disableDates([]);
	elements.minmax_calendar.disableDays([]);
	disabledDaysDP = "";
	mindateDP = new Date();
	var dateNo = new Date().getTime() + (21 * 24 * 60 * 60 * 1000); //3 weeks
	maxdateDP = new Date(dateNo);
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"BBD09181-DF5A-4D84-BC9A-D5A1F709C5A7"}
 */
function onDateClick(event) {
	updateBaseCalendarStatus('Calendar date clicked: ' + event.getElementName());
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
 * @properties={"typeid":24,"uuid":"9FC87968-9BED-4DC6-886B-D857C750FC6B"}
 */
function onCalendarDataChange(oldValue, newValue, event) {
	updateBaseCalendarStatus('Calendar date changed: ' + newValue);
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"2C899371-F389-40A7-A1D2-00257A7DF750"}
 */
function onCalendarFocusGained(event) {
	scopes.global.setStatusMessage('Calendar focus gained: ' + event.getElementName());
}

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"D5BB8F78-9D28-4C19-B0DD-F1D9FAAF798F"}
 */
function onCalendarFocusLost(event) {
	scopes.global.setStatusMessage('Calendar focus lost: ' + event.getElementName());
}

/**
 * @properties={"typeid":24,"uuid":"14C26CF7-0087-49C5-8BF5-974315340C92"}
 */
function initCustomModes() {
	// Apply options to each calendar example
	elements.side_by_side_calendar.options = side_by_side_option;
	elements.calendar_timeonly.options = calendar_time_only_option;
	elements.dark_theme_calendar.options = dark_theme_option;
	elements.month_view_calendar.options = month_view_option;
	elements.inline_calendar.options = inline_option;
	elements.custom_icons_calendar.options = custom_icons_option;
	elements.today_only_button_calendar.options = today_only_button_option;
}
