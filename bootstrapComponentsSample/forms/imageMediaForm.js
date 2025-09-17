/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CC167235-5E39-4AC1-A404-B7F1319B17A8"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DB4D88BA-C1F7-4235-888F-77BE520525DE"}
 */
var outputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AE26B7C5-C65E-444A-B085-E88652960D8D"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"848FF3DA-6F80-47B0-94C2-7F40EDC6A3E6"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"79F880E1-BBEF-472E-96EC-4DB7FF3E3E10"}
 */
var mediaDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"48368274-AAA6-4089-81A2-1B7E4EC8D327"}
 */
var imageMediaDP = null;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C723D157-E959-48C5-9176-2BC4F2DBCBCC"}
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
 * @properties={typeid:24,uuid:"096469D2-975F-4530-B1DC-D650D14E5137"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7348B77D-C00E-4EF2-8D2D-44560A62FE95"}
 */
function onAction_toggleEditable(event) {
	elements.image_7.editable = !elements.image_7.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"69F761C5-FA72-40D5-8211-1DE3B4BB32B9"}
 */
function onAction_toggleEnabled(event) {
	elements.image_7.enabled = !elements.image_7.enabled	
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A0D9C67D-6611-4E80-A72D-ECF16E978DA4"}
 */
function onAction_toggleVisible(event) {
	elements.image_7.visible = !elements.image_7.visible	
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
 * @properties={typeid:24,uuid:"716AEA81-B03F-4932-950E-424892403980"}
 */
function onDataChange_media(oldValue, newValue, event) {
	elements.image_7.media = mediaDP
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
 * @properties={typeid:24,uuid:"951E1257-0516-4827-8AA2-3B961B53C92D"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.image_7.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"CA7CDC2B-28C6-4867-A1C7-12BB97179D77"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.image_7.toolTipText = tooltipTextDP
	return true
}
