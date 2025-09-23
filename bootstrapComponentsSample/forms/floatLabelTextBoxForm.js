/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"99DB7265-27CE-4B7F-9C8D-9FFBA0BCEE2C"}
 */
var styleClassForEyeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1A8F9D0F-B711-4644-828C-2A2017F3BE4C"}
 */
var inputTypeDP = 'text';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AEB4DDAF-FBF8-4B54-B546-D9A407B6E010"}
 */
var floatLabelTextBoxDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C4649E3F-AADF-4125-A5AA-0832E8DD606E"}
 */
var tooltipTextDP = 'This is the toolTip';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"E45CDC74-33C0-4352-BF19-5E764F4FDDA2"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"68CA1CEB-E1BE-491C-9B4E-BF0D1C50BBC1"}
 */
var floatLabelTextDP = 'This is the float label text';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"F9FD8DF3-BC41-4816-9278-106B902DE192"}
 */
var errorMessageDP = 'This is the error message';

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"9E474540-C37F-4F10-9727-C2084B190DAD"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 *
 *
 * @properties={typeid:35,uuid:"4E72EE39-CF5F-4B35-9DC0-DEDAB298B788"}
 */
var outputDataChangeDP = null;

/**
 *
 * @properties={typeid:35,uuid:"6B0E7568-0748-43A9-8043-C9DD02853BF3",variableType:-4}
 */
var outputActionDP = null;

/**
 * @param event
 *
 *
 * @properties={typeid:24,uuid:"A64637D2-C7E8-40FE-AA87-8E4249772AF0"}
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
 * @properties={typeid:24,uuid:"8C975623-A5FE-4C80-829D-7C237E8DA229"}
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
 * @properties={typeid:24,uuid:"EF257662-0798-41FF-AC48-9E13146E8DB5"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 *
 *
 * @properties={typeid:24,uuid:"CC4F78CD-4F08-414C-8CF3-7DD223FFC5AE"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * @param event
 *
 *
 * @properties={typeid:24,uuid:"CC3E4A41-8470-469D-9853-602AA605F632"}
 */
function onRightClick(event) {
	outputActionDP = 'On right click'
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"7949CAAA-A8D6-4CCD-8D63-B3EE226F2FC8"}
 */
function onAction_toggleEditable(event) {
	elements.floatlabeltextbox_12.editable = !elements.floatlabeltextbox_12.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"AFAACC16-B02D-49B3-B660-2432CAD4165E"}
 */
function onAction_toggleEnabled(event) {
	elements.floatlabeltextbox_12.enabled = !elements.floatlabeltextbox_12.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"B0269833-8E9D-447C-9862-A7C50089B3F8"}
 */
function onAction_toggleVisible(event) {
	elements.floatlabeltextbox_12.visible = !elements.floatlabeltextbox_12.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"97E6257D-389D-4DE3-A6D9-21008A6B2E14"}
 */
function onAction_requestFocusTrue(event) {
	elements.floatlabeltextbox_12.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"DF90CFE6-CEC0-489C-9B32-17AA458F456A"}
 */
function onAction_requestFocusFalse(event) {
	elements.floatlabeltextbox_12.requestFocus(false)
}
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"01A65D42-72FD-4176-BFD9-76FA575B08F6"}
 */
function onAction_setInputType(event) {
	elements.floatlabeltextbox_12.setInputType(inputTypeDP)

	if (inputTypeDP === 'password-with-eye') {
		elements.lbl_styleClassForEye.visible = true
		elements.tb_styleClassForEye.visible = true
	} else {
		elements.lbl_styleClassForEye.visible = false
		elements.tb_styleClassForEye.visible = false
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @return {Boolean}
 * @properties={typeid:24,uuid:"079E2976-0B49-413D-9E7E-0094FC26413E"}
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
 * @properties={typeid:24,uuid:"65A2B2D8-B598-4968-843E-B627ADB3DF3C"}
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
 * @properties={typeid:24,uuid:"495BEBF3-638E-4B70-A1FB-0299FA730841"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.floatlabeltextbox_12.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"855AAFEF-DAD0-4371-9655-8A040548C305"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
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
 * @properties={typeid:24,uuid:"39C600E5-EAB0-4A65-84F8-0E51D3E9BD91"}
 */
function onDataChange_styleClassForEye(oldValue, newValue, event) {
	elements.floatlabeltextbox_12.styleClassForEye = styleClassForEyeDP
	return true
}

