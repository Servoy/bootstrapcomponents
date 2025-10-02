/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6B853648-AA8F-4C4A-808F-C38D47754EAE"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3AF53360-9598-452C-913A-A9D682029A74"}
 */
var containerStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F101340F-5341-4B01-B82E-2A41D326FD27"}
 */
var ouputAccPanelDP = null;

/**
 * Fired after a different tab is selected.
 *
 * @param {Number} previousIndex The previous tab index
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D87C1EA4-97D1-47A7-85CC-FAA8734A3EC9"}
 */
function onChange(previousIndex, event) {
	ouputAccPanelDP = 'Tab ' + previousIndex + ' changed';
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"553A9574-D1BE-4226-B7B0-F65AFA2FCDE5"}
 */
function onAction_toggleVisible(event) {
	elements.accordionpanel_2.visible = !elements.accordionpanel_2.visible
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
 * @properties={typeid:24,uuid:"7A2EB365-F17D-489F-8DCE-92DDDF3F0491"}
 */
function onDataChange_containerStyleClass(oldValue, newValue, event) {
	elements.accordionpanel_2.containerStyleClass = containerStyleClassDP
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
 * @properties={typeid:24,uuid:"744E6F24-14E2-4E2E-AEB0-6EE43D8CADB0"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.accordionpanel_2.styleClass = styleClassDP
	return true
}

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DA5DF854-98D4-4902-83D7-790F4B45CA3E",variableType:4}
 */
var i = 0;
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F4EED482-2061-41E7-ACCD-88D76A0FF058"}
 */
function onAction_addTab(event) {
	i++;
	var index = elements.accordionpanel_2.tabs.length;
	elements.accordionpanel_2.addTab(forms.testingTabBackground, "Test tab " + i, index + 1)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C217E852-59F0-40A2-BBBB-821244089F0D"}
 */
function onAction_getTabAt(event) {
	ouputAccPanelDP = 'Get tab ' + elements.accordionpanel_2.getTabAt(2).name + ' at index ' + 2;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F7B201C3-D615-4C91-9576-6DB679CD1B99"}
 */
function onAction_removeTabAt(event) {
	// TODO Auto-generated method stub

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0E53EFA0-64F7-48C1-9ECB-E402958AB50F"}
 */
function onAction_removeAllTabs(event) {
	// TODO Auto-generated method stub

}
