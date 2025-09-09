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
	if (clickedTabIndex == 2) {//orders
		forms.ordersForm.loadListRecords(scopes.global.customer_id);
	}
	return false;
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
