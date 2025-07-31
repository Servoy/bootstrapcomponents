/**
 * Button Component Demo
 * This file contains event handlers and functionality for the button demo form
 */


/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"1FFB00E0-CD12-4BBB-B447-5E0FD681F017",variableType:-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 * 
 * @properties={typeid:35,uuid:"115F8F11-2F56-49F7-AF11-892B99712D32",variableType:-4}
 */
var enabledDataProvider = true;

/**
 * Helper function to show button events using dialog
 * @param {JSEvent} event - The event that triggered the action
 *
 * @properties={typeid:24,uuid:"b6243e84-a776-4224-b37a-da18b8a8387e"}
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
 * @properties={typeid:24,uuid:"95139e16-56f7-44b2-b4ca-7b4806a5745e"}
 */
function showWarning(message) {
	plugins.dialogs.showWarningDialog('Button Warning', message);
}

/**
 * Show an error dialog
 * @param {String} message - The message to display
 *
 * @properties={typeid:24,uuid:"a5b6c7d8-e9f0-a1b2-c3d4-e5f6a7b8c9d0"}
 */
function showError(message) {
	plugins.dialogs.showErrorDialog('Button Error', message);
}

/**
 * Initialize the form
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"f0c7b7b2-5beb-4e09-bc37-1bc904b8cbcd"}
 */
function onLoad(event) {
	// Form loaded
}

/**
 * Handle click event for the Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"07B2DF69-19C4-4546-9853-C8F14B54802E"}
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
 * @properties={typeid:24,uuid:"FC6D4A81-1AEA-483E-A659-09EA9B75F9B7"}
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
 * @properties={typeid:24,uuid:"1A057D9E-1581-4907-99A7-0CD456C6E660"}
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
 * @properties={typeid:24,uuid:"62f18f9a-a045-4733-b06d-9702482738a8"}
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
 * @properties={typeid:24,uuid:"28401F20-8A17-46C5-9513-E843356068BD"}
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
 * @properties={typeid:24,uuid:"B6280A05-545D-4263-97C1-D4D5FB43871A"}
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
 * @properties={typeid:24,uuid:"91F42342-2E3D-4100-9042-D765830E2BE7"}
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
 * @properties={typeid:24,uuid:"E2D191D9-F932-40F3-B632-F47E4297CDDF"}
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
 * @properties={typeid:24,uuid:"DAF26581-264B-4F12-837A-6CA897BC1B4C"}
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
 * @properties={typeid:24,uuid:"BB556AC6-38CC-43E7-97A9-BFA18FBC8FF4"}
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
 * @properties={typeid:24,uuid:"02B259B0-0C0B-47AF-ACC2-F0F91E288EBA"}
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
