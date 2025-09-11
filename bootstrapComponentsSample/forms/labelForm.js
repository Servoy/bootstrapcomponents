/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0322A083-0C3B-4E84-83E0-1DB22C2EC175"}
 */
var styleClassProvider_vl = 'cool';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7BCDE460-C950-413B-A77E-7D84DE54F03E"}
 */
var username_input = 'John Doe';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"91A532CA-2D3E-4997-B572-E134F693C075"}
 */
var styleClassProvider = 'label-primary';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AE380ECA-0CE4-4FC4-8636-D6EFE18ED32D"}
 */
var user_comments = 'The Form Association and Accessibility section demonstrates how to properly link labels to form elements using ' + 
	'the labelFor property. This creates proper HTML "for" attributes that associate labels with their corresponding inputs, improving ' +
	'usability and accessibility. When a user clicks on a label, the associated input receives focus, which is especially helpful for small ' +
	'form controls forms more accessible to all users.';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04935289-9D16-4A5A-8F33-A2AE4F28C82D"}
 */
var click_event_message = 'Click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9124F483-FC00-480A-8D66-B7C53FF5E74D"}
 */
var double_click_event_message = 'Double-click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DCA5574C-6CC2-4121-9616-020AE61690A4"}
 */
var right_click_event_message = 'Right-click a label to see event details here';

/**
 * Handle click event on interactive labels
 * 
 * @param {JSEvent} event the event that triggered the action
 * @param {String} dataTarget data-target attribute of the clicked element when showAs is html
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"474BBA37-1784-4DCE-8A22-387A3BD9DEB1"}
 */
function onLabelClick(event, dataTarget) {
    
    var timestamp = new Date().toLocaleTimeString();
	var message = timestamp + ': ' + event.getType() + ' event on ' + event.getElementName();
	scopes.global.setStatusMessage(message);
    scopes.global.setStatusMessage(click_event_message)
}

/**
 * Handle double-click event on interactive labels
 * 
 * @param {JSEvent} event the event that triggered the action
 * @param {String} dataTarget data-target attribute of the clicked element when showAs is html
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"392A87D4-3821-4EBC-94D8-2B49036887B5"}
 */
function onLabelDoubleClick(event, dataTarget) {
    var source = event.getSource();
    var elementName = source.getName();
    
    // Update the double-click event message with details
    double_click_event_message = 'Double-click event detected!\n' +
                               'Label: ' + elementName + '\n' +
                               'Event type: ' + event.getType() + '\n' +
                               'Timestamp: ' + new Date().toLocaleTimeString();
}

/**
 * Handle right-click event on interactive labels
 * 
 * @param {JSEvent} event the event that triggered the action
 * @param {String} dataTarget data-target attribute of the clicked element when showAs is html
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4388C885-986D-458B-9EA1-C52FA55AFA60"}
 */
function onLabelRightClick(event, dataTarget) {
    var source = event.getSource();
    var elementName = source.getName();
    
    // Update the right-click event message with details
    right_click_event_message = 'Right-click event detected!\n' +
                              'Label: ' + elementName + '\n' +
                              'Event type: ' + event.getType() + '\n' +
                              'Timestamp: ' + new Date().toLocaleTimeString();
    event.stopPropagation();
}

/**
 * Updates the status label with the current state of the target label
 * @private
 *
 * @properties={typeid:24,uuid:"98AC92BC-B631-4275-BC55-23E5128CE161"}
 */
function updateApiStatus(message) {
    var statusText = 'Status: ' + message;
    elements.lbl_api_status.text = statusText;
}

/**
 * Cycles through predefined text options for a label
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 *
 * @properties={typeid:24,uuid:"A26E65F3-8F01-43F8-A915-66467BF17807"}
 */
function cycleLabelText(label) {
    var textOptions = ['Hello World', 'Click Me!', 'Target Label'];
    var currentIndex = textOptions.indexOf(label.text);
    var nextIndex = (currentIndex + 1) % textOptions.length;
    label.text = textOptions[nextIndex];
    updateApiStatus('changed text to "' + label.text + '"');
}

/**
 * Toggles between different label styles
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 *
 * @properties={typeid:24,uuid:"D91CA909-5C37-4676-BDF9-2C657848582C"}
 */
function toggleLabelStyle(label) {
    if (label.hasStyleClass('label-default')) {
        label.removeStyleClass('label-default');
        label.addStyleClass('label-primary');
        updateApiStatus('changed style to label-primary');
    } else if (label.hasStyleClass('label-primary')) {
        label.removeStyleClass('label-primary');
        label.addStyleClass('label-success');
        updateApiStatus('changed style to label-success');
    } else if (label.hasStyleClass('label-success')) {
        label.removeStyleClass('label-success');
        label.addStyleClass('label-default');
        updateApiStatus('changed style to label-default');
    } else {
        label.addStyleClass('label-default');
        updateApiStatus('added style label-default');
    }
}

/**
 * Toggles the enabled state of a label
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 *
 * @properties={typeid:24,uuid:"3439B6C9-33DD-4065-A236-B5E06D28385A"}
 */
function toggleLabelEnabled(label) {
    label.enabled = !label.enabled;
    updateApiStatus('enabled = ' + label.enabled);
}

/**
 * Toggles the visibility of a label
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 * 
 * @properties={typeid:24,uuid:"D0F64A08-A794-40F3-A00D-9FC36F35A6C2"}
 */
function toggleLabelVisibility(label) {
    label.visible = !label.visible;
    
    // Update status display
    updateApiStatus('visible = ' + label.visible);
    
    // If label is now invisible, show a message
    if (!label.visible) {
        updateApiStatus('visible = false: the label is now hidden. Click "Toggle Visibility" again to show it.');
    }
}

/**
 * Toggles HTML rendering mode for a label
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 *
 * @properties={typeid:24,uuid:"E53EB91D-5572-48AB-A957-CBC6050413A6"}
 */
function toggleLabelHtmlMode(label) {
    var htmlContent = '<div style="display: flex; align-items: center;">' +
                      '<i class="fas fa-star" style="color: #ff6600; margin-right: 8px;"></i>' +
                      '<span style="font-weight: bold;">HTML</span>' +
                      '<span style="margin: 0 4px;">Content</span>' +
                      '</div>';
    
    var plainText = 'Plain Text Label';
    
    if (label.showAs === 'html' || label.showAs === 'trusted_html') {
        label.showAs = null;
        label.text = plainText;
        updateApiStatus('changed to plain text mode');
    } else {
        label.showAs = 'trusted_html';
        label.text = htmlContent;
        updateApiStatus('changed to trusted HTML mode');
    }
}

/**
 * Fired when a label API action button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CCE3B25A-C1BB-4D4A-9813-73842EE2B14E"}
 */
function onLabelAPIAction(event) {
    var targetLabel = elements.lbl_api_target;
    var elementName = event.getElementName();
    
    switch (elementName) {
        case 'btn_api_text':
            cycleLabelText(targetLabel);
            break;
            
        case 'btn_api_style':
            toggleLabelStyle(targetLabel);
            break;
            
        case 'btn_api_enabled':
            toggleLabelEnabled(targetLabel);
            break;
            
        case 'btn_api_visible':
            toggleLabelVisibility(targetLabel);
            break;
    }
    
    scopes.global.setStatusMessage(elementName + ' clicked');
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"BD0D271F-7B53-4960-82C0-76B0BC5E4998"}
 */
function onDataChange(oldValue, newValue, event) {
	switch (newValue) {
		case 'cool':
			styleClassProvider = 'label-primary border border-round border-primary';
			break;
		case 'warm':
			styleClassProvider = 'label-success border border-round border-success';
			break;
		case 'toasty':
			styleClassProvider = 'label-warning border border-round border-warning';
			break;
		case 'hot':
			styleClassProvider = 'label-danger border border-round border-danger';
			break;
	}
	return true;
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"CE353514-1BD7-41FB-BF29-AA64D4022986"}
 */
function onTestAction(event, dataTarget) {
	// TODO Auto-generated method stub
	application.output('Test');

}
