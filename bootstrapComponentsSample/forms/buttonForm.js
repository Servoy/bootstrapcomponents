/**
 * Button Component Demo
 * This file contains event handlers and functionality for the button demo form
 */

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"6A79D878-3C1E-4182-8846-D6B55AFD9706","variableType":-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 * 
 * @properties={"typeid":35,"uuid":"CBC3AAE8-C41A-4BFA-A7B7-D6F57FAC6B9A","variableType":-4}
 */
var enabledDataProvider = true;

/**
 * Helper function to show button events using dialog
 * @param {JSEvent} event - The event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"0958C486-E060-4626-9001-A10C7C9EFB4B"}
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
 * @properties={"typeid":24,"uuid":"E6B4ECF8-5175-46F7-BF00-7D25CD0BBD56"}
 */
function showWarning(message) {
	plugins.dialogs.showWarningDialog('Button Warning', message);
}

/**
 * Show an error dialog
 * @param {String} message - The message to display
 *
 * @properties={"typeid":24,"uuid":"3B9D157D-70A6-4357-A089-D1681B14102D"}
 */
function showError(message) {
	plugins.dialogs.showErrorDialog('Button Error', message);
}

/**
 * Initialize the form
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"8CAD03DB-B554-4F77-B597-58E29E548C04"}
 */
function onLoad(event) {
	// Form loaded
}

/**
 * Handle click event for the Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"73EDAF90-0F85-4D86-B15A-D0E1F09EE9F1"}
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
 * @properties={"typeid":24,"uuid":"96738DA0-80B6-4522-A896-045456EECE16"}
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
 * @properties={"typeid":24,"uuid":"88606D19-989B-44E8-9747-4EB71631912D"}
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
 * @properties={"typeid":24,"uuid":"A4EA97B2-4F8D-43E8-B9D2-9848FE6A053A"}
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
 * @properties={"typeid":24,"uuid":"A2716108-1A04-4BE5-88A6-CEFE942A5C29"}
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
 * @properties={"typeid":24,"uuid":"A7DE36C7-70E2-4E8B-A000-963369AAD58F"}
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
 * @properties={"typeid":24,"uuid":"C4B08FE1-590A-40EC-9B6F-4D19D612A9FC"}
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
 * @properties={"typeid":24,"uuid":"D5BB304C-B6B8-43FB-932F-799D8D6E7B8A"}
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
 * @properties={"typeid":24,"uuid":"113BE037-9982-48E9-A931-3416A0F176F9"}
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
 * @properties={"typeid":24,"uuid":"EFB817E2-236E-467E-B6EA-71D8E6EF84B9"}
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
 * @properties={"typeid":24,"uuid":"8D0096F5-DDF1-4236-A569-21539AF0B770"}
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
