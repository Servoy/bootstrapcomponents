/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"446BFB91-6E1A-44B2-86B7-91462A9ED46D"}
 */
var restricted_msg_dp = null;

/**
 * @properties={typeid:35,uuid:"00F7BADC-6AEC-48F5-B87B-F2CACADC32F5",variableType:-4}
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
 * @properties={typeid:35,uuid:"0A2C9A42-2E20-4C83-9C8B-C1BA4BC4EC33",variableType:93}
 */
var min_date = null;

/**
 * @type {Date}
 * @properties={typeid:35,uuid:"7EE337DA-9530-4DCD-A1A8-6D0CABCA7016",variableType:93}
 */
var max_date = null;

/**
 * @type {Array<Date>}
 * @properties={typeid:35,uuid:"2E409DA0-195A-439D-BAD3-E0ACB6C1F17F",variableType:-4}
 */
var restricted_dates = [];

/**
 * @type {Boolean}
 * @properties={typeid:35,uuid:"8E40E521-4377-4570-AD14-225C20133271",variableType:-4}
 */
var keep_invalid_dp = false;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"3DB5FB48-0872-497F-94B5-124934251B1C"}
 */
var disabled_days;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"257F212A-C540-4F9B-8D21-F53D34A8BF8B",variableType:93}
 */
var restricted_dates_dp = new Date();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F3251F42-1516-4226-BA5B-7D41F55EE356"}
 */
var tooltip_dp = 'This is a demo calendar for basic configuration';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B8C66E74-AE9D-4A9E-8972-151200409EF0"}
 */
var format_dp = 'MM/dd/yyyy';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CEEDF182-F052-4CD5-9381-2EF1F683848E"}
 */
var base_message_dp = null;

/**
 * @properties={typeid:35,uuid:"2DFB1A42-A4F2-4BE7-AA43-B347A1DB43AE",variableType:-4}
 */
var visible_dp = true;

/**
 * @properties={typeid:35,uuid:"4B4CE780-C7E9-4E64-A0FE-F59E357A64E7",variableType:-4}
 */
var enabled_dp = true;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"036E17E5-5A59-42C5-92E7-4E3E45867891",variableType:93}
 */
var date_dp = new Date();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2F759C78-5D78-4FF9-8779-59D9A627304C"}
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
 * @properties={typeid:24,uuid:"E25FED59-C37E-4923-A843-DDB0EF17115D"}
 */
function updateBaseCalendarStatus(message) {
	base_message_dp = message
}
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A7B9DAC4-0924-4835-8B0F-C36A8C22DA67"}
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
 * @properties={typeid:24,uuid:"243E106D-569F-48B4-8967-04DAB66AB2AB"}
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
 * @properties={typeid:24,uuid:"6B7C7743-E7BF-46FE-B28D-F5C906CB4B58"}
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
 * @properties={typeid:24,uuid:"B7441184-8A52-4442-8F37-E56DFD0DD702"}
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
 * @properties={typeid:24,uuid:"08F2FBD8-22E7-429A-9072-61AE03A788CE"}
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
 * @properties={typeid:24,uuid:"16007D76-5EDE-4B54-9FD8-EBA9EFD6F9D1"}
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
 * @properties={typeid:24,uuid:"E93C7AF7-602E-4884-B698-68C5EB9C3FC6"}
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
 * @properties={typeid:24,uuid:"287D2F3A-E177-4C86-A674-6060B17F26CE"}
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
 * @properties={typeid:24,uuid:"F9983E13-24F0-4182-B5F6-32873FB18407"}
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
 * @properties={typeid:24,uuid:"CFC60A45-F232-4953-A0D1-7722EEFD6D70"}
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
 * @properties={typeid:24,uuid:"7289F22A-1FA9-425B-B4D0-C8D746814142"}
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
 * @properties={typeid:24,uuid:"DFAECD8D-7428-4EE3-B96B-3050954992BF"}
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
 * @properties={typeid:24,uuid:"2AE60F5B-7F3C-4ED5-9CE8-1F0D4DDB3C2A"}
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



/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"74576626-FB07-469E-BCB5-150E76463CF9"}
 */
function onTest(event) {
	elements.calendarinline_restricted.options = {
		  display: {
			  viewMode: 'months'
			  }
	};

}
