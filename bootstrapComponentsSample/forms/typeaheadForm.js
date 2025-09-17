/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BEE22EDD-8D63-4A35-B8BE-D291118D42E9"}
 */
var toolTipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0987D685-65CE-48BB-A2F0-0CE4F52D57F0"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2AC3720E-89A6-4055-A755-C97DB53E7EF6"}
 */
var placeholderTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4DC4EA7B-A33F-470D-97E5-923551D0004D"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CDBC322D-B49F-4AF0-8730-C86555D96ED2"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"52C00884-54FC-4D20-A9E7-EA2FED68EB96"}
 */
var outputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"946E442D-4941-43D9-B7EE-A636DCDC1146"}
 */
var typeaheadTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A5ED1828-B2EA-4EFC-ACBD-C753099B54F3"}
 */
var typeaheadHtmlDP = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"221AB8F1-A9F7-4022-849D-EE095B11027D"}
 */
function onLoad(event) {
	typeaheadHtmlDP = elements.typeahead_demoHtml.valuelist.dataset.getValue(1, 1);
	application.output(typeaheadHtmlDP);
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
 * @properties={typeid:24,uuid:"69985FDB-EB51-40C5-AF97-B7AA60388896"}
 */
function onDataChangeHtml(oldValue, newValue, event) {
	outputDataChangeDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E7031FE0-BC0E-4B18-BD23-FB8266429C7A"}
 */
function onActionHtml(event) {
	outputActionDP = 'On action called from html typeahead'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"13C90680-D1BC-481A-8045-EFFB0AECB7BB"}
 */
function onFocusGainedHtml(event) {
	outputFocusDP = 'Focus gained on html typeahead'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5BD68949-6E1F-4A85-ABBD-366034D8AF69"}
 */
function onFocusLostHtml(event) {
	outputFocusDP = 'Focus lost on html typeahead'
}

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @return {Boolean}
 * @properties={typeid:24,uuid:"4B54CD47-FD22-4CFE-B4D8-749BA6A945F7"}
 */
function onDataChangeText(oldValue, newValue, event) {
	outputDataChangeDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"BFA96E45-0DF1-45F2-B5F9-8420B7ABC6DD"}
 */
function onActionText(event) {
	outputActionDP = 'On action called from text typeahead'
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"660E1C8F-85B9-4707-9800-CE1858A6EC37"}
 */
function onFocusGainedText(event) {
	outputFocusDP = 'Focus gained on text typeahead'
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"9044D342-EC15-490B-B434-F0ABB0D01530"}
 */
function onFocusLostText(event) {
	outputFocusDP = 'Focus lost on text typeahead'
}
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C6393842-153F-4BF2-90DE-60A987C70AEE"}
 */
function onAction_toggleAppendToBody(event) {
	elements.typeahead_demoHtml.appendToBody = !elements.typeahead_demoHtml.appendToBody
	elements.typeahead_demoText.appendToBody = !elements.typeahead_demoText.appendToBody
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D14016F8-4B99-403A-8796-921319B7DEEA"}
 */
function onAction_toggleEditable(event) {
	elements.typeahead_demoHtml.editable = !elements.typeahead_demoHtml.editable
	elements.typeahead_demoText.editable = !elements.typeahead_demoText.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9FD7D0A7-88B7-450C-BCB7-96221D455C85"}
 */
function onAction_toggleEnabled(event) {
	elements.typeahead_demoHtml.enabled = !elements.typeahead_demoHtml.enabled
	elements.typeahead_demoText.enabled = !elements.typeahead_demoText.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2D484B23-1573-402F-A062-F3BFABEAAACE"}
 */
function onAction_toggleVisible(event) {
	elements.typeahead_demoHtml.visible = !elements.typeahead_demoHtml.visible
	elements.typeahead_demoText.visible = !elements.typeahead_demoText.visible
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
 * @properties={typeid:24,uuid:"A3A952CC-9B0D-444E-B66C-ECEB975F8638"}
 */
function onDataChange_placeholderText(oldValue, newValue, event) {
	elements.typeahead_demoHtml.placeholderText = placeholderTextDP
	elements.typeahead_demoText.placeholderText = placeholderTextDP
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
 * @properties={typeid:24,uuid:"CF88A25C-D7D2-40E3-B1A3-60BD9CD296E8"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.typeahead_demoHtml.styleClass = styleClassDP
	elements.typeahead_demoText.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"5C60F2BE-35F9-4926-AFDF-570B3A3B79DC"}
 */
function onDataChange_toolTipText(oldValue, newValue, event) {
	elements.typeahead_demoHtml.toolTipText = toolTipTextDP
	elements.typeahead_demoText.toolTipText = toolTipTextDP
	return true
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DA357891-F3D8-4DA8-9AE3-09DBCC05B209"}
 */
function onAction_btn_requestFocusTrue(event) {
	elements.typeahead_demoHtml.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2AA4E39D-958D-4B6F-9BF8-50ED932AFE15"}
 */
function onAction_btn_requestFocusFalse(event) {
	elements.typeahead_demoHtml.requestFocus(false)
}
