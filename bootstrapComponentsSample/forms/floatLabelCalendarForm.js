/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F492435E-7AD4-4B65-B2D3-91F1211B6DC4"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"87310160-777F-4931-A1DD-A4FB6E5DBBBF"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D3E0D4EC-3049-413D-8D34-591E74D77214"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4421862A-2C34-4E92-AE5D-2E055E07F9EA"}
 */
var outputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"452E878C-F705-41CD-B172-46392CB1767A"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8C82BCB3-BA5D-40B0-B909-865693C81B1A"}
 */
var floatLabelTextDP = 'FloatLabel text';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0119757E-72EF-4C23-A28E-8AD9BF530CD4"}
 */
var errorMessageDP = 'This is the error message';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"3567EC85-4D0B-4F47-AE51-2B83EF949CEF",variableType:93}
 */
var floatLabelCalendarDP = null;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"BF978C52-4035-4F0B-82A0-D28AA1142F1D"}
 */
function onAction(event) {
	outputActionDP = 'On action called'
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
 * @properties={typeid:24,uuid:"67DC6D88-1793-49F6-9242-AD28DF7E4308"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'Data changed from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8380E2D9-D8DB-4BB1-A74F-6A030224B778"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6B6DAFD7-4045-4328-9FAE-FCF4A549EA41"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
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
 * @properties={typeid:24,uuid:"05A6B5B7-99EF-48DD-A45F-1627A8FF4B50"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.floatlabelcalendar_11.styleClass = styleClassDP
	return true
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4A03A280-009F-4CD4-84A7-B476897D6F88"}
 */
function onAction_toggleCalendarWeeks(event) {
	elements.floatlabelcalendar_11.calendarWeeks = !elements.floatlabelcalendar_11.calendarWeeks
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2432C13F-1D25-4E75-9EDE-B0607D8C80C2"}
 */
function onAction_toggleEnabled(event) {
	elements.floatlabelcalendar_11.enabled = !elements.floatlabelcalendar_11.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"BBCA34FC-BE98-4648-8316-8DA4487C68EE"}
 */
function onAction_togglePickerOnly(event) {
	elements.floatlabelcalendar_11.pickerOnly = !elements.floatlabelcalendar_11.pickerOnly
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"FC92D848-0EFF-4FFE-B532-342A87A50D99"}
 */
function onAction_toggleVisible(event) {
	elements.floatlabelcalendar_11.visible = !elements.floatlabelcalendar_11.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B5073799-F759-4603-915D-EED18EBFC2A8"}
 */
function onAction_requestFocusTrue(event) {
	elements.floatlabelcalendar_11.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"37719412-6AEB-4EE6-9EE1-7DA3E07B6630"}
 */
function onAction_requestFocusFalse(event) {
	elements.floatlabelcalendar_11.requestFocus(false)
}

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"FEF11C56-E837-49D2-B606-664E808BF3A2",variableType:93}
 */
var mindateDP = new Date();
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6A819232-DFBA-4F47-B9FC-604F17431585"}
 */
function onAction_disableDates(event) {
	elements.floatlabelcalendar_11.disableDates([mindateDP])
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"40281DC2-A412-4F56-A350-44C4953D6710"}
 */
function onAction_disableDays(event) {
	elements.floatlabelcalendar_11.disableDays([1, 3, 5])
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"42AA29BD-4B8F-44F1-9CC9-F9001C016CD8"}
 */
function onAction_setMinMaxDate(event) {
	elements.floatlabelcalendar_11.setMinMaxDate(new Date(2025, 6, 19), new Date())
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CAD6B26A-A1CE-409A-BB03-0834DFBC691C"}
 */
function onAction_toggleErrorMessage(event) {
	elements.floatlabelcalendar_11.toggleErrorMessage(true)
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
 * @properties={typeid:24,uuid:"EC09A4FB-016E-4433-B234-7024329F0EEA"}
 */
function onDataChange_errorMessage(oldValue, newValue, event) {
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
 * @properties={typeid:24,uuid:"EA0D944A-4C44-4A3D-9D67-CA3AD3453112"}
 */
function onDataChange_floatLabelText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
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
 * @properties={typeid:24,uuid:"C6A9DBDD-5189-488A-87EB-6CE6793F28FE"}
 */
function onDataChange_toolTipText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
