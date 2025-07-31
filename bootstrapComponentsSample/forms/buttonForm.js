/**
 * Button Component Demo
 * This file contains event handlers and functionality for the button demo form
 */

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"A51EB9D3-72FC-46F6-AEE1-6DAF3368E89D","variableType":-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 * 
 * @properties={"typeid":35,"uuid":"1CB9ADDB-78B2-4E13-87B4-AB36B2CE40AA","variableType":-4}
 */
var enabledDataProvider = true;

/**
 * Helper function to show button events using dialog
 * @param {JSEvent} event - The event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"37411D25-131C-4FEC-B718-F8D11B650192"}
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
 * @properties={"typeid":24,"uuid":"DD5552CD-E02D-40F2-959E-B367CF3C7971"}
 */
function showWarning(message) {
	plugins.dialogs.showWarningDialog('Button Warning', message);
}

/**
 * Show an error dialog
 * @param {String} message - The message to display
 *
 * @properties={"typeid":24,"uuid":"651F49BF-2CD0-42E8-B75B-AB534C12B3E6"}
 */
function showError(message) {
	plugins.dialogs.showErrorDialog('Button Error', message);
}

/**
 * Initialize the form
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"0CE056BC-B9A3-4986-A7C2-9859D4CCCC37"}
 */
function onLoad(event) {
	// Form loaded
}

/**
 * Handle click event for the Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"A681FC65-17F8-45A6-A880-4DEB16BDDA13"}
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
 * @properties={"typeid":24,"uuid":"9EDC3D1B-CA4C-4BD9-A239-71596DE69F4D"}
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
 * @properties={"typeid":24,"uuid":"C0C5AFCB-8C66-46EF-98BE-18D8ADFC621F"}
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
 * @properties={"typeid":24,"uuid":"4C9B87D4-7F13-4C31-96C8-76B7382E11A6"}
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
 * @properties={"typeid":24,"uuid":"6FA04DCF-F699-424D-A3C0-92BC8C0AFA43"}
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
 * @properties={"typeid":24,"uuid":"28810CC8-A3D2-4E55-8259-C54E34A4DFF1"}
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
 * @properties={"typeid":24,"uuid":"E9D9E80D-6F2D-4444-A8FD-308C8A24D2C0"}
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
 * @properties={"typeid":24,"uuid":"87F5F72E-98B8-4648-81CB-C1E8699EF134"}
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
 * @properties={"typeid":24,"uuid":"5460BC87-5439-486D-81A2-76FD06670C52"}
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
 * @properties={"typeid":24,"uuid":"90643D79-40DF-49FF-9AFB-EF631DDAD97E"}
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
 * @properties={"typeid":24,"uuid":"FC1A499B-9EA8-43AD-BE13-F23BDEA30B03"}
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
