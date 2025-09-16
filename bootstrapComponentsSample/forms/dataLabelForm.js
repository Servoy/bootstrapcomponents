/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C3D2F926-0269-4403-A803-896B490F2936"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2774F0AD-AB11-4EC6-BEB1-A715307DD960"}
 */
var trailingImageStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"601DC16E-1BD4-47CD-B9BE-B39D339B04BA"}
 */
var styleClassExpressionDP = 'row_status_class';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0C1A2854-28B0-41B3-8A75-BC688846206B"}
 */
var textareaDataLabelHtmlDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F196C017-5601-4CA7-9132-A205DAFC3B14"}
 */
var textareaDataLabelTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E81B94C8-34BA-440C-96F8-1B25DA35FB68"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"43D5D50D-CF6A-4F9B-A1A2-A254D5F1BA65"}
 */
var imageStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9B1D640B-38CF-4827-8D2B-884F757909DE"}
 */
var dataLabelDP = 'Data Label Text';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"44F6F7E1-00B3-499D-A859-CE35B71ED58F"}
 */
var dataLabelDPHtml = 'Data Label Html';

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"242050F0-9195-4D8A-80EE-9079965F7F4F"}
 */
function onAction_textDatalabel(event, dataTarget) {
	textareaDataLabelTextDP = 'On action called from ' + elements.datalabel_text.getName()
}

/**
 * DoubleClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"CDD7DFFC-ACB2-4281-ABF0-2EDEDF0B1F05"}
 */
function onDoubleClick_textDatalabel(event, dataTarget) {
	textareaDataLabelTextDP = 'On double click called from ' + elements.datalabel_text.getName()
}

/**
 * RightClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"30AC7141-E53E-4CE1-9624-4C52ABA6B476"}
 */
function onRightClick_textDatalabel(event, dataTarget) {
	textareaDataLabelTextDP = 'On right click called from ' + elements.datalabel_text.getName()
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"4CB689C3-5615-4D62-9C33-9AEA40D832E3"}
 */
function onAction_htmlDatalabel(event, dataTarget) {
	textareaDataLabelHtmlDP = 'On action called from ' + elements.datalabel_html.getName()
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"44F46292-CA77-4CE4-AEF6-A3B860DE79CD"}
 */
function onDoubleClick_htmlDatalabel(event, dataTarget) {
	textareaDataLabelHtmlDP = 'On double click called from ' + elements.datalabel_html.getName()
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param dataTarget
 *
 * @properties={typeid:24,uuid:"AA7EF2EA-94B4-424D-A882-94EEB4609981"}
 */
function onRightClick_htmlDatalabel(event, dataTarget) {
	textareaDataLabelHtmlDP = 'On right click called from ' + elements.datalabel_html.getName()
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C600203D-EE58-426B-AE17-AAC70ACD0BBD"}
 */
function onAction_toggleEnabled(event) {
	elements.datalabel_html.enabled = !elements.datalabel_html.enabled
	elements.datalabel_text.enabled = !elements.datalabel_text.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"34FE7DFA-D86D-4508-879C-15848B1CBC04"}
 */
function onAction_toggleVisible(event) {
	elements.datalabel_html.visible = !elements.datalabel_html.visible
	elements.datalabel_text.visible = !elements.datalabel_text.visible
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
 * @properties={typeid:24,uuid:"C529B075-38DD-45D6-8BC0-DD0BF0C827BF"}
 */
function onDataChange_imageStyleClass(oldValue, newValue, event) {
	elements.datalabel_html.imageStyleClass = imageStyleClassDP
	elements.datalabel_text.imageStyleClass = imageStyleClassDP
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
 * @properties={typeid:24,uuid:"E6AB15D3-7D1F-49A2-9259-8E7CE047DB63"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.datalabel_html.styleClass = styleClassDP
	elements.datalabel_text.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"ED498138-402B-42E5-8B1E-58809A46706B"}
 */
function onDataChange_styleClassExpression(oldValue, newValue, event) {
	elements.datalabel_html.styleClassExpression = styleClassExpressionDP
	elements.datalabel_text.styleClassExpression = styleClassExpressionDP
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
 * @properties={typeid:24,uuid:"121B6672-CD55-4851-B197-DE322AE7A7FA"}
 */
function onDataChange_trailingImageStyleClass(oldValue, newValue, event) {
	elements.datalabel_html.trailingImageStyleClass = trailingImageStyleClassDP
	elements.datalabel_text.trailingImageStyleClass = trailingImageStyleClassDP
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
 * @properties={typeid:24,uuid:"7AD7273D-AE9C-4C7F-B5FF-9754D5F96BA7"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.datalabel_html.toolTipText = tooltipTextDP
	elements.datalabel_text.toolTipText = tooltipTextDP
	return true
}
