/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C9FB06C8-6E49-4228-8182-538913B3FB26"}
 */
var floatLabelTextAreaDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"90D35344-5F7D-477D-8503-0E29CAE76076"}
 */
var tooltipTextDP = 'This is the toolTip';

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"F34660DB-D93F-44B1-BD8E-FFF75103C8BB"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"77DD2667-0EF6-42C1-9E4F-CD5348E5927B"}
 */
var floatLabelTextDP = 'This is the float label text';

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"03EB964E-4903-4265-A936-B21C1FC05388"}
 */
var errorMessageDP = 'This is the error message';

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"9AB2CE1E-10C6-45DC-99AB-2E90BA55261D"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"FB6043A9-8455-4121-8291-034317557139"}
 */
var outputDataChangeDP = null;

/**
 * @properties={typeid:35,uuid:"D2BD9F77-20D6-458B-9E3A-B6CD624D5961",variableType:-4}
 */
var outputActionDP = null;

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"82530A08-8DB6-4E2D-A636-836946B2DFAD"}
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
 * @properties={typeid:24,uuid:"A23A6E88-BC23-414B-8AB0-74F6CAFF839A"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'Data change from ' + oldValue + ' to ' + newValue
	return false;
}

/**
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"39C55B06-EBF6-4B57-9157-59D4513E7C12"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"030701FA-EB31-45E7-8777-3E93C44F329C"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"13673B3D-271C-4EFE-993A-8BD158F5CF7C"}
 */
function onRightClick(event) {
	outputActionDP = 'On right click'
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"45B600D3-90F5-401E-8101-0599B7F5AD68"}
 */
function onAction_toggleEditable(event) {
	elements.floatlabeltextarea_11.editable = !elements.floatlabeltextarea_11.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2A8C1EDF-8882-46F5-9635-80189778A202"}
 */
function onAction_toggleEnabled(event) {
	elements.floatlabeltextarea_11.enabled = !elements.floatlabeltextarea_11.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5398F07E-5BFC-4D25-A917-0470E481065F"}
 */
function onAction_toggleVisible(event) {
	elements.floatlabeltextarea_11.visible = !elements.floatlabeltextarea_11.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2E6C90BE-0AF9-4AC4-9005-5E3C05DB76E9"}
 */
function onAction_requestFocusTrue(event) {
	elements.floatlabeltextarea_11.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"84A138C4-87B5-419E-8382-6BBF1269DE8D"}
 */
function onAction_requestFocusFalse(event) {
	elements.floatlabeltextarea_11.requestFocus(false)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2AB2092B-EDAE-477F-BF48-E506B3F52353"}
 */
function onAction_toggleErrorMessage(event) {
	elements.floatlabeltextarea_11.toggleErrorMessage(true)
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
 * @properties={typeid:24,uuid:"BF5D92C4-93D6-4733-83AA-A76017CC862C"}
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
 * @properties={typeid:24,uuid:"4374A7AE-FAFB-4979-B0C4-017C0899BD09"}
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
 * @properties={typeid:24,uuid:"D9CAA221-DAC4-4215-A758-9D86880B21E7"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.floatlabeltextarea_11.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"42550128-0399-4CBD-AAD8-507CD1837E9A"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
