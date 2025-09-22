/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F82A12C9-8812-4FF1-A601-8CC4FDD2E6A9"}
 */
var tooltipTextDP = 'This is the toolTip';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4EE0EB1F-4813-46F0-8B8B-4149F062C4BE"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4BE2681E-4BD1-42B4-94AC-B3C72D8EB596"}
 */
var floatLabelTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"72F3AC09-C55F-482C-9BEB-2A10DE8E60C3"}
 */
var errorMessageDP = 'This is the error message';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C09C3978-29E1-4C39-B373-2A4B9D886952"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B59BA335-4FA1-4C6B-93B1-E5BD599C716C"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"56580DAD-7946-4EFB-A1F7-D50EAAEE72DF"}
 */
var outputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0DB81A1D-928C-4277-AAAD-16172A7ED979"}
 */
var floatLabelComboboxDP = null;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5516168C-CA8A-48CC-B6AD-3376CBC90929"}
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
 * @properties={typeid:24,uuid:"BDE6A66E-3EEC-4200-8322-3738183EF925"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'Data change from ' + oldValue + ' to ' + newValue
	return false;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"69401AA8-88D8-49E1-AE3A-29089C483AC8"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"340B11A8-F5CF-4C46-BDAC-4694A68EB775"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A9951473-2BD2-46A7-8CB9-FFDC02217483"}
 */
function onRightClick(event) {
	outputActionDP = 'On right click'
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DB23A201-1A12-49A5-AB15-DB6DE5E35CEA"}
 */
function onAction_toggleEnabled(event) {
	elements.floatlabelcombobox_text.enabled = !elements.floatlabelcombobox_text.enabled
	elements.floatlabelcombobox_html.enabled = !elements.floatlabelcombobox_html.enabled
	elements.floatlabelcombobox_trustedHtml.enabled = !elements.floatlabelcombobox_trustedHtml.enabled

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"681593B2-69C9-4364-90EA-962D4FDF5A98"}
 */
function onAction_toggleVisible(event) {
	elements.floatlabelcombobox_text.visible = !elements.floatlabelcombobox_text.visible
	elements.floatlabelcombobox_html.visible = !elements.floatlabelcombobox_html.visible
	elements.floatlabelcombobox_trustedHtml.visible = !elements.floatlabelcombobox_trustedHtml.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7E5292BF-2E38-4C81-9B59-AB2F9A024795"}
 */
function onAction_requestFocusTrue(event) {
	elements.floatlabelcombobox_text.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"EBF74938-AEF2-4D29-9952-B63E83852A71"}
 */
function onAction_requestFocusFalse(event) {
	elements.floatlabelcombobox_text.requestFocus(false)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1496F78A-1FEC-44E3-A6BB-76C78D0CC2E2"}
 */
function onAction_toggleErrorMessage(event) {
	elements.floatlabelcombobox_text.toggleErrorMessage(true)
	elements.floatlabelcombobox_html.toggleErrorMessage(true)
	elements.floatlabelcombobox_trustedHtml.toggleErrorMessage(true)
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
 * @properties={typeid:24,uuid:"7BA8AB94-3B54-4E75-9F7B-A2B9C3371006"}
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
 * @properties={typeid:24,uuid:"648FCB4E-EED2-430A-9E30-94D860EC713F"}
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
 * @properties={typeid:24,uuid:"89FCBDC1-CB92-4615-AD40-25D155AF907D"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.floatlabelcombobox_text.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"51164986-380C-4E32-9517-15160FC92C03"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
