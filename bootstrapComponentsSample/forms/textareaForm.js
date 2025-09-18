/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A6401D75-CBA3-4308-8CB5-083BA37BC4D1"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D2DF9E4B-98D6-47F2-AD4F-04FAFA6D030B"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C9AB4BF3-D674-4227-AA13-A20497EDDB92"}
 */
var placeholderTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9E1E444F-C662-4FB7-A0C7-A4CFDD17485F"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3CEC96DE-0F8F-41E9-A230-F9678F91F8A8"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C15CDB6D-1988-4452-A088-D51FF1F642CC"}
 */
var ouputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"874445E1-25FE-4C2C-A7CC-45515CA703A2"}
 */
var textareaDP = null;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8F165D0E-2C2E-4EB9-9F7B-078462AB5156"}
 */
function onAction(event) {
	ouputActionDP = 'On action called'
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
 * @properties={typeid:24,uuid:"5072E28A-C44F-4EBD-BEFA-FBEE46AD552A"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7878A4C2-46F3-4FE9-9D0E-804FE74319E9"}
 */
function onFocusGained(event) {
	outputFocusDP = 'Focus gained'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"92F90DB1-BACF-4E0E-AF0A-4D747DEA7BC3"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C34AC8CD-27B3-47EB-A45D-7E3AEBFC4F5F"}
 */
function onRightClick(event) {
	ouputActionDP = 'Right click called'
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B8DE48A6-B796-49F4-9385-40C11F11E057"}
 */
function onAction_toggleEditable(event) {
	elements.textarea_demo.editable = !elements.textarea_demo.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"721C61CF-E848-4D14-A478-DDAB248B2E65"}
 */
function onAction_toggleEnabled(event) {
	elements.textarea_demo.enabled = !elements.textarea_demo.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B3912A1C-BECD-4263-B43E-A37A17A0377D"}
 */
function onAction_toggleVisible(event) {
	elements.textarea_demo.visible = !elements.textarea_demo.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8B51815E-1965-4E93-8A2A-71050DC21849"}
 */
function onAction_requestFocusTrue(event) {
	elements.textarea_demo.requestFocus(true)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DACCBFEF-1073-47CB-B205-75860B77394E"}
 */
function onAction_requestFocusFalse(event) {
	elements.textarea_demo.requestFocus(false)
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
 * @properties={typeid:24,uuid:"61372BAA-C5C3-45D5-85D0-315524773A92"}
 */
function onDataChange_placeholderText(oldValue, newValue, event) {
	elements.textarea_demo.placeholderText = placeholderTextDP
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
 * @properties={typeid:24,uuid:"5A7C17C9-638E-4F18-8527-CDA840BF1A6F"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.textarea_demo.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"64853B2C-FFE4-4AF9-BB3B-8A9C6932469E"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.textarea_demo.toolTipText = tooltipTextDP
	return true
}
