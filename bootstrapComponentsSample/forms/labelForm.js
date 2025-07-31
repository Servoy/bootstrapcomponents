/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6E613B6F-B799-42E8-8814-5741C0010D8B"}
 */
var styleClassProvider_vl = 'cool';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CEFAF230-BFEC-4FB7-AD64-81BE147BE24B"}
 */
var username_input = 'John Doe';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"D4E5F6A7-B8C9-0D1E-2F3A-4B5C6D7E8F9A",variableType:-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"E5F6A7B8-C9D0-1E2F-3A4B-5C6D7E8F9A0B",variableType:-4}
 */
var enabledDataProvider = true;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"064EC9A5-9FAD-4E89-802B-9BF06F1038ED"}
 */
var styleClassProvider = 'label-primary';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BB8F51C2-B890-4C5F-B48C-D91E25461386"}
 */
var user_comments = 'The Form Association and Accessibility section demonstrates how to properly link labels to form elements using ' + 
	'the labelFor property. This creates proper HTML "for" attributes that associate labels with their corresponding inputs, improving ' +
	'usability and accessibility. When a user clicks on a label, the associated input receives focus, which is especially helpful for small ' +
	'form controls forms more accessible to all users.';


/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"95D3D5D4-7E25-47F0-B68B-E97ECF01B96E"}
 */
var click_event_message = 'Click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9D36AF47-5858-44E0-B5DC-287048C490E5"}
 */
var double_click_event_message = 'Double-click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6C7A3C93-D44A-4931-ACF1-531957208B9B"}
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
 * @properties={typeid:24,uuid:"A4B5C6D7-E8F9-0A1B-2C3D-4E5F6A7B8C9D"}
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
 * @properties={typeid:24,uuid:"B5C6D7E8-F9A0-1B2C-3D4E-05F6A7B8C9D0"}
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
 * @properties={typeid:24,uuid:"C6D7E8F9-A0B1-2C3D-4E5F-06A7B8C9D0E1"}
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
 * @properties={typeid:24,uuid:"1CC152B8-65B5-4C6F-93A9-7113462F9B76"}
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
 * @properties={typeid:24,uuid:"29ADF162-E5BB-45FD-9B05-3DD915C00822"}
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
 * @properties={typeid:24,uuid:"F3A4B5C6-D7E8-9F0A-1B2C-003D4E5F6A7B"}
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
 * @properties={typeid:24,uuid:"A1B2C3D4-E5F6-7A8B-9C0D-1E2F3A4B5C6D"}
 */
function toggleLabelEnabled(label) {
    enabledDataProvider = !enabledDataProvider;
    label.enabled = !label.enabled;
    updateApiStatus('enabled = ' + label.enabled);
}

/**
 * Toggles the visibility of a label
 * 
 * @param {RuntimeWebComponent<bootstrapcomponents-label_abs>} label - the label to change
 * 
 * @properties={typeid:24,uuid:"B2C3D4E5-F6A7-8B9C-0D1E-02F3A4B5C6D7"}
 */
function toggleLabelVisibility(label) {
    visibleDataProvider = !visibleDataProvider;
    label.visible = visibleDataProvider;
    
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
 * @properties={typeid:24,uuid:"C3D4E5F6-A7B8-9C0D-1E2F-03A4B5C6D7E8"}
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
 * @properties={typeid:24,uuid:"265280A5-3F61-4D4F-8DDB-F0EDA0FCB037"}
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
 * @properties={typeid:24,uuid:"DE5AC8BB-65C8-4F9F-966E-1A956A6C6519"}
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
 * @properties={typeid:24,uuid:"005CA2A4-9E3E-4D35-9F8D-6980FCE462DA"}
 */
function onTestAction(event, dataTarget) {
	// TODO Auto-generated method stub
	application.output('Test');

}
