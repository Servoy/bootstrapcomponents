/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"792DA0F5-A6A7-4FA8-9A19-248D9C92BC49"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5E41C99C-CD4A-4AC6-81E3-07F19FDFA1D2"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F8DD47FB-63A5-4A84-A19D-8D1C4E3FACD3"}
 */
var choiceGroupFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9B2C9B1C-7E1F-49B4-BD2C-235EB5A1AFD2"}
 */
var choiceGroupActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F80624F1-E6FA-4C8A-866D-4B36680373FB"}
 */
var choiceGroupOutputDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1350235C-B736-4014-99C8-19C3C1DEE64F"}
 */
var radioGroupHorizontalDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"74936CAE-55A4-426A-83B9-3CB12F276CE6"}
 */
var radioGroupVerticalDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"790AA8D6-2CB0-4C38-B0BC-ACFE8892F1BA"}
 */
var checkboxGroupHorizontalDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8D774DF3-F972-4411-864A-D5E4FCB132C6"}
 */
var checkboxGroupVerticalDP = null;

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"FC8CFD9E-B1B7-499D-B816-7AF32AEADD3A"}
 */
function onAction_enabled(event) {
	elements.choicegroup_checkboxHorizontal.enabled = !elements.choicegroup_checkboxHorizontal.enabled
	elements.choicegroup_checkboxVertical.enabled = !elements.choicegroup_checkboxVertical.enabled
	elements.choicegroup_radioHorizontal.enabled = !elements.choicegroup_radioHorizontal.enabled
	elements.choicegroup_radioVertical.enabled = !elements.choicegroup_radioVertical.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B2608AB6-5976-4767-BF05-BACD829AD068"}
 */
function onAction_visible(event) {
	elements.choicegroup_checkboxHorizontal.visible = !elements.choicegroup_checkboxHorizontal.visible
	elements.choicegroup_checkboxVertical.visible = !elements.choicegroup_checkboxVertical.visible
	elements.choicegroup_radioHorizontal.visible = !elements.choicegroup_radioHorizontal.visible
	elements.choicegroup_radioVertical.visible = !elements.choicegroup_radioVertical.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F830B5FC-E967-46B3-BACA-4BC09139C217"}
 */
function onAction_requestFocusFalse(event) {
	elements.choicegroup_checkboxVertical.requestFocus(false);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"B77D7348-F2EF-4D11-9C1C-9235E93F64F5"}
 */
function onAction_requestFocusTrue(event) {
	elements.choicegroup_checkboxVertical.requestFocus(true);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5F5020F8-5641-4E0D-821C-57A9587A7A1F"}
 */
function onAction(event) {
	choiceGroupActionDP = "On action called"
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
 * @properties={typeid:24,uuid:"225BB8B1-FDBB-40B4-BF19-48A0956F0B67"}
 */
function onDataChange(oldValue, newValue, event) {
	choiceGroupOutputDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0C2D4128-2676-4C10-A2A7-CC87EEC45075"}
 */
function onFocusGained(event) {
	choiceGroupFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7ABD5081-41F8-4B90-83F4-C8E945311F6A"}
 */
function onFocusLost(event) {
	choiceGroupFocusDP = 'Focus lost'
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
 * @properties={typeid:24,uuid:"624D5137-CEE1-44C9-A81A-D9C37934C5C9"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.choicegroup_checkboxHorizontal.styleClass = styleClassDP
	elements.choicegroup_checkboxVertical.styleClass = styleClassDP
	elements.choicegroup_radioHorizontal.styleClass = styleClassDP
	elements.choicegroup_radioVertical.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"961B8EC6-D48C-4466-AD3D-582324FAF6A6"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.choicegroup_checkboxHorizontal.toolTipText = tooltipTextDP
	elements.choicegroup_checkboxVertical.toolTipText = tooltipTextDP
	elements.choicegroup_radioHorizontal.toolTipText = tooltipTextDP
	elements.choicegroup_radioVertical.toolTipText = tooltipTextDP
	return true
}
