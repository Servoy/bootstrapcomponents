/**
 * Button Component Demo
 * This file contains event handlers and functionality for the button demo form
 *
 * @properties={typeid:35,uuid:"f2a3b4c5-d6e7-f8a9-b0c1-d2e3f4a5b6c7"}
 */

/**
 * Helper function to show button events using dialog
 * @param {JSEvent} event - The event that triggered the action
 *
 * @properties={typeid:24,uuid:"b6243e84-a776-4224-b37a-da18b8a8387e"}
 */
function showButtonEvent(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + ' event on ' + event.getElementName();
	plugins.dialogs.showInfoDialog('Button Event', message);
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
	showButtonEvent(event, 'Click');
}

/**
 * Handle double click event for the Double Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FC6D4A81-1AEA-483E-A659-09EA9B75F9B7"}
 */
function onButtonDoubleClick(event) {
	showButtonEvent(event, 'Double Click');
}

/**
 * Handle right click event for the Right Click Me button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1A057D9E-1581-4907-99A7-0CD456C6E660"}
 */
function onButtonRightClick(event) {
	showButtonEvent(event, 'Right Click');
}

/**
 * Updates the status label with the current state of the target button
 * @private
 *
 * @properties={typeid:24,uuid:"62f18f9a-a045-4733-b06d-9702482738a8"}
 */
function updateApiStatus(message) {
	var targetBtn = elements.btn_api_target;
	var statusText = 'Status: ' + message;
	
	// Update the status label
	elements.lbl_api_status.text = statusText;
}

/**
 * Change the text of the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D3927054-F127-4E9C-813E-898BAD76EA5C"}
 */
function onChangeText(event) {
	var targetBtn = elements.btn_api_target;
	var currentText = targetBtn.text;
	
	// Toggle between different text values
	if (currentText === 'Target Button') {
		targetBtn.text = 'Hello World';
	} else if (currentText === 'Hello World') {
		targetBtn.text = 'Click Me!';
	} else {
		targetBtn.text = 'Target Button';
	}
	
	// Update status display
	updateApiStatus('changed text to Hello World');
}

/**
 * Change the style class of the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8D5BA85F-2B56-403F-8D2B-DBC743BF2BF3"}
 */
function onChangeStyle(event) {
	/**
	 * @type {RuntimeWebComponent<bootstrapcomponents-button_abs>}
	 */
	var targetBtn = elements.btn_api_target;
	// Cycle through Bootstrap button styles
	if (targetBtn.hasStyleClass('btn-outline-primary')) {
		targetBtn.removeStyleClass('btn-outline-primary');
		targetBtn.addStyleClass('btn-primary');
		updateApiStatus('changed style to btn-primary');
		
	} else if (targetBtn.hasStyleClass('btn-primary')) {
		targetBtn.removeStyleClass('btn-primary');
		targetBtn.addStyleClass('btn-success');
		updateApiStatus('changed style to btn-success');
		
	} else if (targetBtn.hasStyleClass('btn-success')) {
		targetBtn.removeStyleClass('btn-success');
		targetBtn.addStyleClass('btn-warning');
		updateApiStatus('changed style to btn-warning');
		
	} else if (targetBtn.hasStyleClass('btn-warning')) {
		targetBtn.removeStyleClass('btn-warning');
		targetBtn.addStyleClass('btn-danger');
		updateApiStatus('changed style to btn-danger');
		
	} else if (targetBtn.hasStyleClass('btn-danger')) {
		targetBtn.removeStyleClass('btn-danger');
		targetBtn.addStyleClass('btn-info');
		updateApiStatus('changed style to btn-info');
		
	} else if (targetBtn.hasStyleClass('btn-info')) {
		targetBtn.removeStyleClass('btn-info');
		targetBtn.addStyleClass('btn-outline-primary');
		updateApiStatus('changed style to btn-outline-primary');
		
	} else {
		targetBtn.addStyleClass('btn btn-outline-primary');
		updateApiStatus('added style btn-outline-primary');
	}
}

/**
 * Toggle the enabled state of the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E47E8660-CF2B-427A-AFF7-C381CD87E7A3"}
 */
function onToggleEnabled(event) {
	var targetBtn = elements.btn_api_target;
	
	// Toggle enabled state
	targetBtn.enabled = !targetBtn.enabled;
	
	// Update status display
	updateApiStatus('enabled = ' + targetBtn.enabled);
}

/**
 * Toggle the visibility of the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BCB3650A-66C8-4521-933C-963D55F71E6C"}
 */
function onToggleVisibility(event) {
	var targetBtn = elements.btn_api_target;
	
	// Toggle visibility
	targetBtn.visible = !targetBtn.visible;
	
	// Update status display
	updateApiStatus('visible = ' + targetBtn.visible);
	
	// If button is now invisible, show a message
	if (!targetBtn.visible) {
		plugins.dialogs.showInfoDialog('Button Hidden', 'The target button is now hidden. Click "Toggle Visibility" again to show it.');
	}
}

/**
 * Toggle the icon of the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E4649CCF-B2F7-42F2-A47C-767D228072FC"}
 */
function onToggleIcon(event) {
	var targetBtn = elements.btn_api_target;
	var currentIcon = targetBtn.imageStyleClass;
	
	// Cycle through different Font Awesome icons
	if (!currentIcon && !targetBtn.trailingImageStyleClass) {
		// Add leading icon (star)
		targetBtn.imageStyleClass = 'fas fa-star';
		elements.btn_api_icon.text = 'Change Icon';
		updateApiStatus('added leading icon: fas fa-star');
		
	} else if (currentIcon === 'fas fa-star') {
		// Change to heart icon
		targetBtn.imageStyleClass = 'fas fa-heart';
		updateApiStatus('changed leading icon to: fas fa-heart');
		
	} else if (currentIcon === 'fas fa-heart') {
		// Move to trailing position with cog icon
		targetBtn.imageStyleClass = null;
		targetBtn.trailingImageStyleClass = 'fas fa-cog';
		updateApiStatus('moved to trailing icon: fas fa-cog');
		
	} else if (targetBtn.trailingImageStyleClass === 'fas fa-cog') {
		// Remove all icons
		targetBtn.imageStyleClass = null;
		targetBtn.trailingImageStyleClass = null;
		elements.btn_api_icon.text = 'Add Icon';
		updateApiStatus('removed all icons');
	}
	
}

/**
 * Request focus for the target button
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A7FAAD2A-9CD9-40BB-9A86-CE0426B51748"}
 */
function onRequestFocus(event) {
	updateApiStatus('Focus is on the target button. Press \'Space\' to verify');
	
	// Request focus for the target button
	elements.btn_api_target.requestFocus();
}
/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5320DF2E-F048-4A24-9B01-57C2070F6AF8"}
 */
function onTargetBtnAction(event) {
	var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + ' event on ' + event.getElementName();
	updateApiStatus(message);

}
