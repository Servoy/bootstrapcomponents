/**
 * Button Component Demo
 * This file contains event handlers and functionality for the button demo form
 */

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"3C66B78C-8227-444F-8CE3-07B75C6B6A53","variableType":-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 * 
 * @properties={"typeid":35,"uuid":"0CE2B86A-DAE8-41C0-A5AC-553DC3501D17","variableType":-4}
 */
var enabledDataProvider = true;

/**
 * Helper function to show button events using dialog
 * @param {JSEvent} event - The event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"F7AC07F8-7632-4CF2-842A-664810ED60DF"}
 */
function showButtonEvent(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + ' event on ' + event.getElementName();
	scopes.global.setStatusMessage(message);
}

/**
 * Show a warning dialog
 * @param {String} message - The message to display
 *
 * @properties={"typeid":24,"uuid":"5C319759-3CAE-4AC8-9B2A-9080B0ECBC14"}
 */
function showWarning(message) {
	plugins.dialogs.showWarningDialog('Button Warning', message);
}

/**
 * Show an error dialog
 * @param {String} message - The message to display
 *
 * @properties={"typeid":24,"uuid":"50F95C46-CF35-477F-838A-4CBFA120DAC8"}
 */
function showError(message) {
	plugins.dialogs.showErrorDialog('Button Error', message);
}

/**
 * Initialize the form
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"227237CA-3419-46E6-A0D1-A6C91AF080A1"}
 */
function onLoad(event) {
	// Form loaded
}

/**
 * Handle click event for the Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"89C0D0CB-0549-4DBD-B975-5F4C53E21624"}
 */
function onButtonClick(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + 'ButtonClick event on ' + event.getElementName();
	scopes.global.setStatusMessage(message);
}

/**
 * Handle double click event for the Double Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"AFAC3A1E-C8D9-4EB6-8B89-03EDFFAEC93E"}
 */
function onButtonDoubleClick(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + 'ButtonDoubleClick event on ' + event.getElementName();
	scopes.global.setStatusMessage(message);
}

/**
 * Handle right click event for the Right Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"7343DD9C-054B-436F-87C8-1714B0480BEA"}
 */
function onButtonRightClick(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + 'ButtonRightClick event on ' + event.getElementName();
	scopes.global.setStatusMessage(message);
}

/**
 * Updates the status label with the current state of the target button
 * @private
 *
 * @properties={"typeid":24,"uuid":"AAA8596E-1112-420A-A4B9-B7C87DD086AC"}
 */
function updateApiStatus(message) {
	var statusText = 'Status: ' + message;
	elements.lbl_api_status.text = statusText;
}

/**
 * Cycles through predefined text options for a button
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 *
 * @properties={"typeid":24,"uuid":"93090638-0E39-4A9E-8C9D-69A6AE066936"}
 */
function cycleButtonText(button) {
	var textOptions = ['Target Button', 'Hello World', 'Click Me!'];
	var currentIndex = textOptions.indexOf(button.text);
	var nextIndex = (currentIndex + 1) % textOptions.length;
	button.text = textOptions[nextIndex];
	updateApiStatus('changed text to "' + button.text + '"');
}

/**
 * Toggles between outline and solid button styles
 * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 *
 * @properties={"typeid":24,"uuid":"DCEC654A-51D9-4337-B0D4-BC1F4F27FF53"}
 */
function toggleButtonStyle(button) {
	if (button.hasStyleClass('btn-outline-primary')) {
		button.removeStyleClass('btn-outline-primary');
		button.addStyleClass('btn-primary');
		updateApiStatus('changed style to btn-primary');
	} else if (button.hasStyleClass('btn-primary')) {
		button.removeStyleClass('btn-primary');
		button.addStyleClass('btn-success');
		updateApiStatus('changed style to btn-success');
	} else if (button.hasStyleClass('btn-success')) {
		button.removeStyleClass('btn-success');
		button.addStyleClass('btn-outline-primary');
		updateApiStatus('changed style to btn-outline-primary');
	} else {
		button.addStyleClass('btn btn-outline-primary');
		updateApiStatus('added style btn-outline-primary');
	}
}

/**
 * Toggles the enabled state of a button
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 *
 * @properties={"typeid":24,"uuid":"617A3CF2-2B1A-441A-9933-8FB6616B0F27"}
 */
function toggleButtonEnabled(button) {
	enabledDataProvider = !enabledDataProvider;
	updateApiStatus('enabled = ' + button.enabled);
}

/**
 * Toggles the visibility of a button
 * 
 * * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 * 
 * @properties={"typeid":24,"uuid":"AF246B2C-B55E-4648-8617-9DBB01813A1D"}
 */
function toggleButtonVisibility(button) {
	
	visibleDataProvider = !visibleDataProvider
	
	// Update status display
	updateApiStatus('visible = ' + button.visible);
	
	// If button is now invisible, show a message
	if (!button.visible) {
		updateApiStatus('visible = false: the button is now hidden. Click "Toggle Visibility" again to show it.');
	}
}

/**
 * Cycles through icon options for a button
 * 
 * * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 *
 * @properties={"typeid":24,"uuid":"F6539EE5-2EC5-4A3F-87DF-661F71E614D1"}
 */
function toggleButtonIcon(button) {
	var currentIcon = button.imageStyleClass;
	
	if (!currentIcon && !button.trailingImageStyleClass) {
		// Add leading icon (star)
		button.imageStyleClass = 'fas fa-star';
		elements.btn_api_icon.text = 'Change Icon';
		updateApiStatus('added leading icon: fas fa-star');
		
	} else if (currentIcon === 'fas fa-star') {
		// Change to heart icon
		button.imageStyleClass = 'fas fa-heart';
		updateApiStatus('changed leading icon to: fas fa-heart');
		
	} else if (currentIcon === 'fas fa-heart') {
		// Move to trailing position with cog icon
		button.imageStyleClass = null;
		button.trailingImageStyleClass = 'fas fa-cog';
		updateApiStatus('moved to trailing icon: fas fa-cog');
		
	} else if (button.trailingImageStyleClass === 'fas fa-cog') {
		// Remove all icons
		button.imageStyleClass = null;
		button.trailingImageStyleClass = null;
		elements.btn_api_icon.text = 'Add Icon';
		updateApiStatus('removed all icons');
	}
}

/**
 * Sets focus on the target button
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-button_abs>} button - the button to change
 *
 * @properties={"typeid":24,"uuid":"F0395ACA-BD23-4CE4-BDD2-E2E9E318FBD7"}
 */
function setButtonFocus(button) {
	updateApiStatus('Focus is on the button. Press \'Space\' to verify');
	button.requestFocus();
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"55F3AD0D-7A5D-4376-B812-851891A73A7B"}
 */
function onAPIAction(event) {
	var targetBtn = elements.btn_api_target;
	var elementName = event.getElementName();
	
	switch (elementName) {
		case 'btn_api_text':
			cycleButtonText(targetBtn);
			break;
			
		case 'btn_api_style':
			toggleButtonStyle(targetBtn);
			break;
			
		case 'btn_api_enabled':
			toggleButtonEnabled(targetBtn);
			break;
			
		case 'btn_api_visible':
			toggleButtonVisibility(targetBtn);
			break;
			
		case 'btn_api_icon':
			toggleButtonIcon(targetBtn);
			break;
			
		case 'btn_api_focus':
			setButtonFocus(targetBtn);
			break;
	}
	
	scopes.global.setStatusMessage(elementName + ' clicked');
}
