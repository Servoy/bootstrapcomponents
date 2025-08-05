/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"B691C21C-FDCC-4E1F-9FBB-F584B4193133","variableType":-4}
 */
var side_by_side_option = {
	  display: {
		  sideBySide: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"2C344011-724B-46C8-AB0F-F548788DDB11","variableType":-4}
 */
var calendar_time_only_option = {
	display: {
	    viewMode: 'clock'
	  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"B7185483-CE84-45D8-8E8B-9125B4F79C7D","variableType":-4}
 */
var dark_theme_option = {
	  display: {
		  theme: 'dark'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"1F919B19-D9A0-4A55-AA4E-D04220D84338","variableType":-4}
 */
var month_view_option = {
	  display: {
		  viewMode: 'months'
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"F74E24A4-E6E6-4907-8CFA-B6EF24F48868","variableType":-4}
 */
var inline_option = {
	  display: {
		  inline: true
		  }
};

/**
 * @type {Object}
 * 
 * @properties={"typeid":35,"uuid":"C5990A98-5B2D-4255-9D1A-CC9586447A66","variableType":-4}
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
 * @properties={"typeid":35,"uuid":"520A8728-0C85-453B-89F2-B2E7B8DFC0A6","variableType":-4}
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
 * @properties={"typeid":35,"uuid":"D86A5BB5-BC70-4ADF-A4EB-FC937FEBC358","variableType":-4}
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
 * @properties={"typeid":35,"uuid":"F9942146-6EF7-4D11-9954-7D40ACE9B158"}
 */
var disabledDaysDP = null;

/**
 * @type {Array<Number>}
 * @properties={"typeid":35,"uuid":"A72EDB8B-257C-409B-89F6-CF09E0A02857","variableType":-4}
 */
var disabledDays = [];

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"6C31E4A1-7FDB-4EA3-80C1-656A94AFD4BB","variableType":-4}
 */
var keepInvalidDP = false;

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"6EBA8EAD-32A4-44FC-BEA9-EAEAF3CBF5AB","variableType":93}
 */
var minMaxDP = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"7D3CACB8-213E-4BA1-84E1-C8EAC0A55CA7","variableType":93}
 */
var maxdateDP = (function() {
    var dateNo = new Date().getTime() + (21 * 24 * 60 * 60 * 1000); // 3 weeks in ms
    return new Date(dateNo);
})();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"E76731ED-3EEA-44E7-B9CA-3946BC75C98C","variableType":93}
 */
var mindateDP = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"5F285BC3-ABAA-4E78-BDAA-76E641F08218","variableType":93}
 */
var customDate = new Date();

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"C7A4431E-7257-4BD0-8A50-AF5B86F518ED"}
 */
var placeholder_dp = 'Select a date';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"95F94CDD-DA36-4184-98C5-6C01A8206D88"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';

/**
 * @properties={"typeid":35,"uuid":"9BAE1401-3D07-411B-BCD1-F612D839F97D","variableType":-4}
 */
var enableDP = true;

/**
 * @properties={"typeid":35,"uuid":"A7BC8DC3-B14B-48AB-BA44-452363D0CA18","variableType":-4}
 */
var visibleDP = true;

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"A476A6D7-0A2E-47A5-ADB5-926202649BAB"}
 */
var base_message_dp = 'Day-Month-Year with time in 24-hour format (e.g., 28-07-2025 21:38)\n\nFormat uses: d=day, M=month, y=year, H=hour(0-23), m=minute';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"A67C81C3-7C09-4913-9A7D-2E0EFF381CE4"}
 */
var format_dp = 'MM/dd/yyyy hh:mm aa';

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"87CD6FF8-FAB7-4157-B460-A961DC5B5E8C","variableType":93}
 */
var date_dp = new Date();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"AD2F40D7-32BA-43F4-AE9D-DD7FA90E280F"}
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
 * @properties={"typeid":24,"uuid":"B3CF40CB-B052-4ED6-8E3A-0DC1D8B2D79E"}
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
 * @properties={"typeid":24,"uuid":"33F94AAB-53D7-4A67-A795-BE4326E8293C"}
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
 * @properties={"typeid":24,"uuid":"20D2428E-9154-4EA7-889B-29215B134929"}
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
 * @properties={"typeid":24,"uuid":"5DE64A6B-2145-4A3C-A037-8844CB3AFF33"}
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
 * @properties={"typeid":24,"uuid":"AB0AC1F4-5681-4698-9A06-1ACD87E43140"}
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
 * @properties={"typeid":24,"uuid":"371BB50B-614F-4E5C-9900-6FCA2AE99B6E"}
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
 * @properties={"typeid":24,"uuid":"B46908D6-8A5C-4A90-A0B9-7AAFF548DA75"}
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
 * @properties={"typeid":24,"uuid":"65042871-53EB-4103-8147-770A421D4C35"}
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
 * @properties={"typeid":24,"uuid":"24C3BC5F-A249-4C8A-BDFB-B6220CFF88C1"}
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
 * @properties={"typeid":24,"uuid":"2224D593-EB48-4792-801C-3AC249104DFD"}
 */
function onTest(event) {
	application.output('Test btn pressed');
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"778A469D-248F-4F29-B703-FD95B0F01153"}
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
 * @properties={"typeid":24,"uuid":"F30CE255-A370-4DAE-9214-728BDDFA0A0B"}
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
 * @properties={"typeid":24,"uuid":"B64F30BD-F591-41C1-B522-5D70DC550D90"}
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
 * @properties={"typeid":24,"uuid":"69895246-1B35-4E35-A220-6113F0BD79A9"}
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
 * @properties={"typeid":24,"uuid":"67DAC413-7A98-476F-89C3-DFBF1B04E4C8"}
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
 * @properties={"typeid":24,"uuid":"67C1ECE1-9A07-47FA-AEE0-A8DA2B966D51"}
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
 * @properties={"typeid":24,"uuid":"6F58DE76-85F8-4334-B2E8-D37C0F570DDB"}
 */
function onCalendarDataChange(oldValue, newValue, event) {
	updateBaseCalendarStatus('Calendar date changed: ' + newValue);
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"259B988E-9DC6-4B98-AE50-157CA7FA474F"}
 */
function onCalendarFocusGained(event) {
	scopes.global.setStatusMessage('Calendar focus gained: ' + event.getElementName());
}

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"62963C69-B1E2-4C2E-B905-B32E76B89910"}
 */
function onCalendarFocusLost(event) {
	scopes.global.setStatusMessage('Calendar focus lost: ' + event.getElementName());
}

/**
 * @properties={"typeid":24,"uuid":"BDF6AE69-6402-43C7-9545-1FB98F5D35C2"}
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
