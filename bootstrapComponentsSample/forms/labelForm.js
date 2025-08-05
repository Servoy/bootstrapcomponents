/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"3668EEDE-ED22-4633-92C4-CA94B9A978DB"}
 */
var styleClassProvider_vl = 'cool';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"1C6808BC-192C-4FDE-82AC-2635054DEC52"}
 */
var username_input = 'John Doe';

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"FF9FF5B7-4813-485C-AA32-177BBEF5C828","variableType":-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"4424A5B4-B247-4BC6-8192-3BC9889B1CBB","variableType":-4}
 */
var enabledDataProvider = true;

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"2F2DB234-9D75-42F4-8560-3BD04D6F613F"}
 */
var styleClassProvider = 'label-primary';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"0AA6DB5D-07AA-447B-A787-CCEC4AC6D18C"}
 */
var user_comments = 'The Form Association and Accessibility section demonstrates how to properly link labels to form elements using ' + 
	'the labelFor property. This creates proper HTML "for" attributes that associate labels with their corresponding inputs, improving ' +
	'usability and accessibility. When a user clicks on a label, the associated input receives focus, which is especially helpful for small ' +
	'form controls forms more accessible to all users.';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"59B33549-A7AF-4EEB-A168-595C3A148327"}
 */
var click_event_message = 'Click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"0E74B52D-F05D-4C9E-ACE0-0491E99B21E7"}
 */
var double_click_event_message = 'Double-click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"08925CD8-8FF5-4993-A2C6-3B6E94F0087B"}
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
 * @properties={"typeid":24,"uuid":"09F46AE4-83DB-495C-B558-484890B0541D"}
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
 * @properties={"typeid":24,"uuid":"CBF0C07E-785A-43CC-9EBA-E45EDD104669"}
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
 * @properties={"typeid":24,"uuid":"224A9C0E-F7C4-4765-9E7B-5A4AEBF07DFD"}
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
 * @properties={"typeid":24,"uuid":"0A84C150-E267-41B1-B154-037E339ECF28"}
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
 * @properties={"typeid":24,"uuid":"D2699F59-2AD2-441F-B270-7459A6724DA2"}
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
 * @properties={"typeid":24,"uuid":"838A66C6-7AE0-4DFF-AB3C-9B030A1B9B15"}
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
 * @properties={"typeid":24,"uuid":"D9CCD84F-95AE-43DF-8DC5-B562F2F6747F"}
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
 * @properties={"typeid":24,"uuid":"0E21E462-BD03-4B9B-9C82-8ED07E63102A"}
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
 * @properties={"typeid":24,"uuid":"CEAA320A-BC29-4E8F-9177-9F28DE20C566"}
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
 * @properties={"typeid":24,"uuid":"9DB52887-DAEC-4F0B-8A3E-B02A2EBCE463"}
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
 * @properties={"typeid":24,"uuid":"06F1026F-656A-4753-83AA-BC1A4278E670"}
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
 * @properties={"typeid":24,"uuid":"E8B9ADD8-394D-46B1-929A-A5D54C7CA033"}
 */
function onTestAction(event, dataTarget) {
	// TODO Auto-generated method stub
	application.output('Test');

}
