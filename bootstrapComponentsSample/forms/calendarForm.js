/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"82EFF91E-B98E-4A88-9958-350748350B7B",variableType:-4}
 */
var side_by_side_option = {
	  display: {
		  sideBySide: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"9E367439-CDFA-4D15-9389-866CD6062E16",variableType:-4}
 */
var calendar_time_only_option = {
	display: {
	    viewMode: 'clock'
	  }
};

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"1EA9A45E-C8A1-4669-808B-1AFB9BED6337",variableType:-4}
 */
var dark_theme_option = {
	  display: {
		  theme: 'dark'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"2586470E-3BB3-4142-9512-2A25D3072B85",variableType:-4}
 */
var month_view_option = {
	  display: {
		  viewMode: 'months'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"B0CB2EA4-9B28-43E5-AB85-2E44614726C8",variableType:-4}
 */
var inline_option = {
	  display: {
		  inline: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"196E2647-26AE-4F70-9F89-2ED09578AE86",variableType:-4}
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
 * @properties={typeid:35,uuid:"22894D28-514E-4E10-94EA-6741B332C129",variableType:-4}
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
 * @properties={typeid:35,uuid:"CD391B52-61E2-46D8-80AA-EA0D4AD39409",variableType:-4}
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
 * @properties={typeid:35,uuid:"24C900D0-75CF-47E8-9857-BEFDE0CBB2F6"}
 */
var disabledDaysDP = null;

/**
 * @type {Array<Number>}
 * @properties={typeid:35,uuid:"FA1D9B23-183A-49CD-A300-F8C4B449BAF7",variableType:-4}
 */
var disabledDays = [];

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"D413761F-7CC8-46E7-AE41-124C7292C06B",variableType:-4}
 */
var keepInvalidDP = false;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"3C150C14-F675-4EC7-859D-D8C9E89EEE63",variableType:93}
 */
var minMaxDP = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"BA33E5BF-88F5-4FA5-92F5-21983098B319",variableType:93}
 */
var maxdateDP = (function() {
    var dateNo = new Date().getTime() + (21 * 24 * 60 * 60 * 1000); // 3 weeks in ms
    return new Date(dateNo);
})();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"9EDA5B76-CC42-45F5-9D78-C8BCEF131C8D",variableType:93}
 */
var mindateDP = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"B17EC80A-2E8D-41B8-A64D-680D38ACAF14",variableType:93}
 */
var customDate = new Date();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F4D26328-4359-4F4C-9511-E6B51C1F5FD8"}
 */
var placeholder_dp = 'Select a date';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"661BB6EC-6600-4A70-8A42-D3E104F4A6E7"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A0C9D693-E8B3-4968-A2B4-5B161495576C"}
 */
var base_message_dp = 'Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:38)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6449A26D-1E20-4511-858E-E18969FD9540"}
 */
var format_dp = 'MM/dd/yyyy hh:mm aa';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"9F28D495-B4D4-41A7-8A1A-36C82FBAD3AD",variableType:93}
 */
var date_dp = new Date();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C338C953-043D-48C5-B18F-5EC7C78D789A"}
 */
function onToggleEnabled(event) {
	elements.basic_calendar.enabled = !elements.basic_calendar.enabled;
	updateBaseCalendarStatus("Calendar enabled: " + elements.basic_calendar.enabled);
	
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8635E42D-F589-41A4-8442-76C890F85355"}
 */
function onToggleVisible(event) {
	elements.basic_calendar.visible = !elements.basic_calendar.visible;
	// Update status display
	updateBaseCalendarStatus('Calendar visible = ' + elements.basic_calendar.visible);
	
	// If button is now invisible, show a message
	if (!elements.basic_calendar.visible) {
		updateBaseCalendarStatus('visible = false: the calendar is now hidden. Click "Toggle" again to show it.');
	}
	scopes.global.setStatusMessage(event.getElementName() + ' clicked');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B28B6B7A-3BC9-4AFD-BF4B-8A8D469D3DAA"}
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
 * @properties={typeid:24,uuid:"047E0D90-46DB-44EE-8A28-503AD142F516"}
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
 * @properties={typeid:24,uuid:"2E1B7F23-FB33-4C1A-93EF-6002ABACCC83"}
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
 * @properties={typeid:24,uuid:"436E5BD5-BE1D-4105-898F-9AE4E685F7E9"}
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
 * @properties={typeid:24,uuid:"76692A37-B531-4FA9-B6D4-5F2004518BBF"}
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
 * @properties={typeid:24,uuid:"4D7BD9EA-7532-4B7B-B2B9-F4AE7581B924"}
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
 * @properties={typeid:24,uuid:"A3E7AEC8-AAD2-4841-A47A-4E7332C7AA28"}
 */
function onMinDataChange(oldValue, newValue, event) {
	if (newValue < maxdateDP) {
		mindateDP = newValue;
		elements.minmax_calendar.setMinMaxDate(mindateDP, maxdateDP);
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
 * @properties={typeid:24,uuid:"11B588B3-36E6-4FEE-B079-1581DCF1611F"}
 */
function onMaxDataChange(oldValue, newValue, event) {
	if (newValue > mindateDP) {
		maxdateDP = newValue
		elements.minmax_calendar.setMinMaxDate(mindateDP, maxdateDP);
		return true;
	} else {
		scopes.global.setStatusMessage("CalendarForm - error on setting max date");
	}
	return false;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B8DD16CF-7AB7-4DE7-A0BC-232A0CBB9AD6"}
 */
function onTest(event) {
	application.output('Test btn pressed');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9144DA7D-31FA-4B07-BB20-23FFAFA3E3A5"}
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
 * @properties={typeid:24,uuid:"BEC8046E-D587-4ED6-A1BC-7B6115880D42"}
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
 * @properties={typeid:24,uuid:"7390DF77-9F70-4CD7-B155-6C70EE23C729"}
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
 * @properties={typeid:24,uuid:"380CA697-CD88-4707-88CC-7A1F7A244582"}
 */
function onDisableDaysChange(oldValue, newValue, event) {
		if (!newValue) {
			elements.minmax_calendar.disableDays([]);
			
		} else {
	
		  const tokens = String(newValue)
		    .split(/[,\r\n]+/)           // split on comma or CR/LF
		    .map(s => s.trim().toLowerCase())
		    .filter(Boolean)             // drop empty entries
		    .filter(day => dayMap.hasOwnProperty(day));
	
		  const disabledDaysArray = tokens.map(day => dayMap[day]);
	
		  elements.minmax_calendar.disableDays(disabledDaysArray, keepInvalidDP);
		}
	  scopes.global.setStatusMessage(event.getElementName() + ' clicked');
	  return true;
	}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E1C05243-0ADE-4B0A-BEBE-3781E67CA1A2"}
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
 * @properties={typeid:24,uuid:"D43C8CBE-A9C7-4A54-BF87-31E21899A694"}
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
 * @properties={typeid:24,uuid:"BE552F74-7E68-4F17-8E19-32FFE55A9571"}
 */
function onCalendarDataChange(oldValue, newValue, event) {
	updateBaseCalendarStatus('Calendar date changed: ' + newValue);
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8432EEA4-625E-4B1D-A644-83ECEEBB6342"}
 */
function onCalendarFocusGained(event) {
	scopes.global.setStatusMessage('Calendar focus gained: ' + event.getElementName());
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"50A92003-C1D7-4A4B-ABE4-66BD1E4773B3"}
 */
function onCalendarFocusLost(event) {
	scopes.global.setStatusMessage('Calendar focus lost: ' + event.getElementName());
}

/**
 * @properties={typeid:24,uuid:"F4B21C80-2326-4633-8E4B-260494BCCD5B"}
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
