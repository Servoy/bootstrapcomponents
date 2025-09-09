/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1F47186E-EB69-4749-A078-82B5C3A563FF",variableType:4}
 */
var cg_int_dp = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"71C8E691-64DF-4871-9EFE-E624D53C1347",variableType:8}
 */
var ns_int_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"14739DCC-3D82-4A3D-B2E2-F4B1F54B2DCE"}
 */
var ns_string_dp = null;


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
 * @properties={typeid:24,uuid:"1BF42D22-F04E-4B9E-90D0-A6FFF111A93D"}
 */
function onStrDataChange(oldValue, newValue, event) {
	application.output('onStrDataChange - called: ' + ns_int_dp);
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
 * @properties={typeid:24,uuid:"00E66263-75B7-4CFA-AAE5-828F0BC71FBE"}
 */
function onIntDataChange(oldValue, newValue, event) {
	application.output('onIntDataChange - called: ' + ns_int_dp);
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
 * @properties={typeid:24,uuid:"63241643-FB83-4851-8373-98046C386460"}
 */
function onCGDataChange(oldValue, newValue, event) {
	application.output('onCGDataChange - called: ' + cg_int_dp);
	return true
}
