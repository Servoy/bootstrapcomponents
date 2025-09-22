/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9179CDE3-E72F-4549-ADFA-451E45A6054C"}
 */
var floatLabelTypeAheadDP = null;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"2DB885CD-A979-4D84-BE57-CE53A12DFF7C"}
 */
var tooltipTextDP = 'This is the toolTip';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"745DF3E6-DFCB-46A4-9681-698750E6653C"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"2D5C9070-5C5E-49C7-A7DE-9A7297585BB3"}
 */
var floatLabelTextDP = 'This is the float label text';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"8D8BD948-E6F9-4641-B85A-9A4FCD72D4A4"}
 */
var errorMessageDP = 'This is the error message';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"A85D147D-22A3-4995-8C1C-1AC8131BF46E"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"45658C62-0C23-4146-8EA7-E78BF9939AA2"}
 */
var outputDataChangeDP = null;

/**
 *
 * @properties={typeid:35,uuid:"5A664635-663B-42AB-A4D7-90AF3C3F26B5",variableType:-4}
 */
var outputActionDP = null;

/**
 * @param event
 *
 *
 * @properties={typeid:24,uuid:"DC1495B0-6F82-4351-904A-AB2BD4600749"}
 */
function onAction(event) {
	outputActionDP = 'On Action called'
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
 *
 *
 * @properties={typeid:24,uuid:"8E5A1194-1FB1-46B1-B1B6-4E7914A65637"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'Data change from ' + oldValue + ' to ' + newValue
	return false;
}

/**
 * @param {JSEvent} event
 *
 *
 *
 * @properties={typeid:24,uuid:"E6D7A97F-7CDA-4147-8EFA-626429EDD0AA"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 *
 *
 * @properties={typeid:24,uuid:"0D2F5055-7C3D-4211-A7BF-A7FE86D898A5"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * @param event
 *
 *
 * @properties={typeid:24,uuid:"8CF02D24-42E2-49C0-B7E8-B1DC3288E954"}
 */
function onAction_toggleEditable(event) {
	elements.floatlabeltypeahead_html.editable = !elements.floatlabeltypeahead_html.editable
	elements.floatlabeltypeahead_text.editable = !elements.floatlabeltypeahead_text.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"005FCB87-755D-4054-9776-10CE6337B2CC"}
 */
function onAction_toggleEnabled(event) {
	elements.floatlabeltypeahead_html.enabled = !elements.floatlabeltypeahead_html.enabled
	elements.floatlabeltypeahead_text.enabled = !elements.floatlabeltypeahead_text.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"E703E10D-89C0-4C56-8262-36CBF1EDEAF1"}
 */
function onAction_toggleVisible(event) {
	elements.floatlabeltypeahead_html.visible = !elements.floatlabeltypeahead_html.visible
	elements.floatlabeltypeahead_text.visible = !elements.floatlabeltypeahead_text.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"7BA2C3A0-5C68-4B35-9F25-40F618F6157C"}
 */
function onAction_requestFocusTrue(event) {
	elements.floatlabeltypeahead_html.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"F7A68559-17D0-451B-91C1-0DFAE3A1E933"}
 */
function onAction_requestFocusFalse(event) {
	elements.floatlabeltypeahead_html.requestFocus(false)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"825C0D46-7156-4E55-9074-931F894BFCA6"}
 */
function onAction_toggleErrorMessage(event) {
	elements.floatlabeltypeahead_html.toggleErrorMessage(true)
	elements.floatlabeltypeahead_text.toggleErrorMessage(true)
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
 *
 * @properties={typeid:24,uuid:"7E6483D5-6FCF-4FE8-9E4B-B46D250FAF81"}
 */
function onDataChange_errorMessage(oldValue, newValue, event) {
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
 *
 * @properties={typeid:24,uuid:"A3C600EE-BD7A-4398-A69C-6832510346DA"}
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
 *
 * @properties={typeid:24,uuid:"762C9D91-BA37-4A4C-B573-0279A8382AD5"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.floatlabeltypeahead_html.styleClass = styleClassDP
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
 *
 * @properties={typeid:24,uuid:"6EFFA6C3-2842-4A12-A1C5-EF979B1D0022"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
