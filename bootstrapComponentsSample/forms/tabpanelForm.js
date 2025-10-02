/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6B8D1915-DE52-4706-BA64-5BCA568B212B"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2453A2CA-DDEF-46A0-907C-28E94A374B16"}
 */
var containerStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"13F478E1-519A-4E58-BD9C-7AD7A7D9C249"}
 */
var closeIconStyleClassDP = 'glyphicon glyphicon-remove close-icon';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6B209B08-8CC9-46D1-A869-6A89DAB91603"}
 */
var tabpanelStateDP = null;

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0658FA36-4EC5-4D5A-A470-060447A058FD"}
 */
function onToggleCloseable(event) {
	elements.tabpanel.showTabCloseIcon = !elements.tabpanel.showTabCloseIcon;
	if (elements.tabpanel.showTabCloseIcon) {
		elements.btn_hide_closeable.enabled = true;
		elements.btn_hide_closeable.removeStyleClass('btn-outline-primary');
		elements.btn_hide_closeable.addStyleClass('btn-primary');
		//disabled is not visible enough on btn-primary so change also the style
	} else {
		elements.btn_hide_closeable.removeStyleClass('btn-primary');
		elements.btn_hide_closeable.addStyleClass('btn-outline-primary');
		elements.btn_hide_closeable.enabled = false;
	}
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B0016B84-9DE3-413D-961A-857CC9F1CE95"}
 */
function onHideCloseable(event) {
	elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].hideCloseIcon = !elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].hideCloseIcon;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"73662D8F-4596-431E-9F12-C1B550D0A1B2"}
 */
function onToggleBg(event) {
	if (elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].imageMediaID) {
		elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].imageMediaID = null;
		elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].text = elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].text.trim();
	} else {
		elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].imageMediaID = 'small_logo.png'
		elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].text = '  ' + elements.tabpanel.tabs[elements.tabpanel.tabIndex - 1].text
	}

}

/**
 * Fired when the user clicks on a tab. When false is returned, the tab switch is prevented.
 *
 * @param {JSEvent} event The event that triggered the action
 * @param {Number} clickedTabIndex The index of the tab that was clicked
 * @param {String} dataTarget The value of the closest data-target attribute when found
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"4948A253-1F8C-4AE5-932D-A8639CE9EA28"}
 */
function onTabClicked(event, clickedTabIndex, dataTarget) {
	application.output('onTabClicked: ' + clickedTabIndex);
	elements.tabpanel.tabIndex = clickedTabIndex;
	return true;
}

/**
 * Fired after a different tab is selected.
 *
 * @param {Number} previousIndex The previous tab index
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"AF349144-9D8B-4AEB-8D13-B7C3A8930A75"}
 */
function onChange(previousIndex, event) {
	application.output('onChange - previous index: ' + previousIndex);

}

/**
 * Fired when the user clicks on the tab close icon. When false is returned, the tab close is prevented.
 *
 * @param {JSEvent} event The event that triggered the action
 * @param {Number} clickedTabIndex The index of the tab that was clicked
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"13BCEA20-0471-4353-BF72-590CCAD1D1AB"}
 */
function onTabClose(event, clickedTabIndex) {

	application.output('onTabClose: ' + clickedTabIndex);
	return true;
}

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"49841EB8-4C57-4832-947F-A63C97AED7C2",variableType:4}
 */
var i = 0
	/**
	 * Fired when the button is clicked.
	 *
	 * @param {JSEvent} event
	 *
	 * @properties={typeid:24,uuid:"F406CBCA-6A11-41D6-997A-26661A232005"}
	 */
function onAction_addTab(event) {
	i++
	var index = elements.tabpanel.tabs.length;
	elements.tabpanel.addTab(forms.ImageTab, "Tab text" + i, index + 1);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0B5A36CC-1D11-4EE3-8C60-15F4F2E4D519"}
 */
function onAction_getTabAt(event) {
	tabpanelStateDP = 'Tab at index 2 is ' + elements.tabpanel.getTabAt(2).name;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"094BB1AE-4C29-4AA4-B0A1-BBB1252BB347"}
 */
function onAction_removeTabAt(event) {
	tabpanelStateDP = 'Remove Tab at index 2'
	elements.tabpanel.removeTabAt(2)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5CDBB10E-63C4-406D-AFB0-7DA280821EDD"}
 */
function onAction_removeAllTabs(event) {
	tabpanelStateDP = 'Remove All Tabs'
	elements.tabpanel.removeAllTabs()
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7F9EBC00-EFED-4AF4-9FF8-981871ADBDB6"}
 */
function onToggleVisible(event) {
	elements.tabpanel.visible = !elements.tabpanel.visible
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
 * @properties={typeid:24,uuid:"3158F294-5D3F-4E40-B545-19B916CD81EA"}
 */
function onDataChange_closeIconStyleClass(oldValue, newValue, event) {
	elements.tabpanel.closeIconStyleClass = closeIconStyleClassDP;
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
 * @properties={typeid:24,uuid:"9410AA74-95DD-49E3-B23B-B214DF501296"}
 */
function onDataChange_containerStyleClass(oldValue, newValue, event) {
	elements.tabpanel.containerStyleClass = containerStyleClassDP
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
 * @properties={typeid:24,uuid:"5FC76881-3FBA-431F-B57F-635024A33194"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.tabpanel.styleClass = styleClassDP
	return true
}
