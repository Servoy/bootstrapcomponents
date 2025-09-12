/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A5ED1828-B2EA-4EFC-ACBD-C753099B54F3"}
 */
var typeaheadDP = null;


/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"221AB8F1-A9F7-4022-849D-EE095B11027D"}
 */
function onLoad(event) {
	typeaheadDP = elements.typeahead_demo.valuelist.dataset.getValue(1,1);
	application.output(typeaheadDP);
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
function onDataChange(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
