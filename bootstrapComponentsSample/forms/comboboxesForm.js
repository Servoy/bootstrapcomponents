/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"1C0119F8-9B0D-4A1F-9D62-AE3FC362559F",variableType:-4}
 */
var main_visibl_dp = true;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"2783FCA8-1FAD-4E16-ADCE-BCADD7BC37CF",variableType:-4}
 */
var main_enabled_dp = true;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"83F1FA78-9C55-41EB-BA7E-5A66BCC3BE63"}
 */
var showas_vl_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D5CC7CE4-7483-4120-9E82-35EAFFD73559"}
 */
var size_vl_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7E2AB802-2A60-49E7-A564-928B77039B28"}
 */
var visible_vl_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"132D79E7-8B91-4814-BCA8-1CDA1D0A2222"}
 */
var style_vl_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5159C932-26ED-4211-8CAE-50CC3CA4B373"}
 */
var cb_demo = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1893F05A-1D8F-4330-BE12-4A3F9C21E03A"}
 */
var sample_dp = null;


/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param {String} oldValue
 * @param {String} newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"D1B7FFD1-656C-45EC-9D06-23C016CE0D26"}
 */
function onStyleDataChange(oldValue, newValue, event) {
	elements.cb_main.addStyleClass(newValue);
	return true
}
