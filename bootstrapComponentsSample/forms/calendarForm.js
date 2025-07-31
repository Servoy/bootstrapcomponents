/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"229F2AA6-A8FE-4539-A3DA-8AF120A82E88",variableType:-4}
 */
var side_by_side_option = {
	  display: {
		  sideBySide: true
		  }
}

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"1A2B3C4D-5E6F-7A8B-9C0D-1E2F3A4B5C6D",variableType:-4}
 */
var calendar_time_only_option = {
	display: {
	    viewMode: 'clock'
	  }
}

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"3C4D5E6F-7A8B-9C0D-1E2F-3A4B5C6D7E8F",variableType:-4}
 */
var dark_theme_option = {
	  display: {
		  theme: 'dark'
		  }
}

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"4D5E6F7A-8B9C-0D1E-2F3A-4B5C6D7E8F9A",variableType:-4}
 */
var month_view_option = {
	  display: {
		  viewMode: 'months'
		  }
}

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"6F7A8B9C-0D1E-2F3A-4B5C-6D7E8F9A0B1C",variableType:-4}
 */
var inline_option = {
	  display: {
		  inline: true
		  }
}

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"8B9C0D1E-2F3A-4B5C-6D7E-8F9A0B1C2D3E",variableType:-4}
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
 * @properties={typeid:35,uuid:"9C0D1E2F-3A4B-5C6D-7E8F-9A0B1C2D3E4F",variableType:-4}
 */
var today_only_button_option = {
	  display: {
		  buttons: {
			  today: true,
			  clear: false,
			  close: false
			  }
		  }
}


/**
 * @properties={typeid:35,uuid:"10C86659-4711-45B0-837E-0F8933B88D48",variableType:-4}
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
 * @properties={typeid:35,uuid:"3A302F3F-E905-4328-8F9E-0296D206D443"}
 */
var disabledDaysDP = null;

/**
 * @type {Array<Number>}
 * @properties={typeid:35,uuid:"E08989F1-0ADE-41EC-8135-FE40286CF1AD",variableType:-4}
 */
var disabledDays = [];

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"7F8F9489-3835-4E29-B144-984CB657A0BE",variableType:-4}
 */
var keepInvalidDP = false;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"71E5196A-39AB-4D2F-8E4D-EE13884663CA",variableType:93}
 */
var minMaxDP = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"4C835FDA-CAE4-4AD0-9B30-9BE8F3526B3E",variableType:93}
 */
var maxdateDP = (function() {
    var dateNo = new Date().getTime() + (21 * 24 * 60 * 60 * 1000); // 3 weeks in ms
    return new Date(dateNo);
})();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"4259210D-394C-4637-BA33-51A3D87682E4",variableType:93}
 */
var mindateDP = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"73DBEDDF-FC0D-4357-AF25-9BBBFB30A2F3",variableType:93}
 */
var customDate = new Date();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"481B584B-C93B-4CEE-8A4D-8AFD003AB381"}
 */
var placeholder_dp = 'Select a date';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2A9DA046-57F5-4326-8541-C3D2C2A1BED2"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';


/**
 * @properties={typeid:35,uuid:"BDFAA3C7-F110-48D5-8B8B-7EA5F3C60FC5",variableType:-4}
 */
var enableDP = true;

/**
 * @properties={typeid:35,uuid:"838CA7F2-6E30-4314-8891-9DAE6B89149B",variableType:-4}
 */
var visibleDP = true;



/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"788AA8D9-BB45-4738-A646-35F53F7B774C"}
 */
var base_message_dp = 'Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:38)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AC911791-45FD-40A8-9A76-0A099C4E2031"}
 */
var format_dp = 'MM/dd/yyyy hh:mm aa';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"7BB6DE23-897E-4369-B60E-4005055E2300",variableType:93}
 */
var date_dp = new Date();


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"258AEBB4-B4AF-429D-B34D-7E0D034A1CFC"}
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
 * @properties={typeid:24,uuid:"42C424C5-8885-42B2-8E66-245F777C578B"}
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
 * @properties={typeid:24,uuid:"6D581AE5-BEE2-45CB-B56F-828FF34CE94D"}
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
 * @properties={typeid:24,uuid:"5D9B0394-8B28-47EC-9B90-372FDC4DA09B"}
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
 * @properties={typeid:24,uuid:"9694896B-B678-4216-B3CC-EEBF654ACE23"}
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
 * @properties={typeid:24,uuid:"5F1E7466-7CE7-48A0-993D-1E12C71C75C1"}
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
 * @properties={typeid:24,uuid:"5EB7DC85-0369-49B1-BFB2-01E63CF5D802"}
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
 * @properties={typeid:24,uuid:"B18A4FAF-E2FE-47D7-9113-329FC79118B0"}
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
 * @properties={typeid:24,uuid:"25AAA9EF-1FC6-4721-BCA4-9314678318AE"}
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
 * @properties={typeid:24,uuid:"C5C21004-57D4-4CD7-A078-0E007EEF5052"}
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
 * @properties={typeid:24,uuid:"A4CB23EE-0341-43D2-BBAA-6830129A2E5F"}
 */
function onTest(event) {
	application.output('Test btn pressed');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9EF41E9D-A9DA-48D0-BDD8-19DE4CE22070"}
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
 * @properties={typeid:24,uuid:"94B1AF5A-9488-4A2C-AF24-0A08AA44E8E2"}
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
 * @properties={typeid:24,uuid:"321C912A-3534-4873-A45B-1990DD785D1E"}
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
 * @properties={typeid:24,uuid:"305896FA-D8A0-46C9-AA74-CF5858155C5C"}
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
 * @properties={typeid:24,uuid:"03423085-0113-418F-B3A0-22FBDA08BD3E"}
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
 * @properties={typeid:24,uuid:"0DCAD474-397E-459E-82DC-AE42233CE6CB"}
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
 * @properties={typeid:24,uuid:"E7786E62-9826-446C-B930-CDA83DBFD350"}
 */
function onCalendarDataChange(oldValue, newValue, event) {
	updateBaseCalendarStatus('Calendar date changed: ' + newValue);
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7BD322E8-78CA-40E0-89D8-C633D7EF32C3"}
 */
function onCalendarFocusGained(event) {
	scopes.global.setStatusMessage('Calendar focus gained: ' + event.getElementName());
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"95C1AE56-2933-4786-8100-AD8A5B16ACA5"}
 */
function onCalendarFocusLost(event) {
	scopes.global.setStatusMessage('Calendar focus lost: ' + event.getElementName());
}

/**
 * @properties={typeid:24,uuid:"CCF8CFB8-5C3A-4E8B-88C6-20C9D8883E2B"}
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
