/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"8A6363FA-7660-4CFE-9518-5A7D68BFC58D"}
 */
var styleClassProvider_vl = 'cool';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"CB54CBC5-95B3-4279-A525-7298E3188799"}
 */
var username_input = 'John Doe';

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"D1A6C16B-50B6-40FD-AD5D-6FCCF74EE93C","variableType":-4}
 */
var visibleDataProvider = true;

/**
 * @type {Boolean}
 *
 * @properties={"typeid":35,"uuid":"239B83F6-B845-4FA0-B76E-85C411AF34C0","variableType":-4}
 */
var enabledDataProvider = true;

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"7FF1F8A2-C090-4C38-916D-3D53B9DBC8C5"}
 */
var styleClassProvider = 'label-primary';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"0EFEDB9B-B753-4D88-BF6A-A9381DE4D311"}
 */
var user_comments = 'The Form Association and Accessibility section demonstrates how to properly link labels to form elements using ' + 
	'the labelFor property. This creates proper HTML "for" attributes that associate labels with their corresponding inputs, improving ' +
	'usability and accessibility. When a user clicks on a label, the associated input receives focus, which is especially helpful for small ' +
	'form controls forms more accessible to all users.';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"0DD611E7-4347-42E0-947B-D8B7DCCA84BE"}
 */
var click_event_message = 'Click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"BC36D908-BC7A-45AC-B441-6CAEA1F53DD4"}
 */
var double_click_event_message = 'Double-click a label to see event details here';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"559AAA46-0E79-4F36-B43E-845D29A7E491"}
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
 * @properties={"typeid":24,"uuid":"6C2B9CBE-0886-4BEF-8413-17E53FE00800"}
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
 * @properties={"typeid":24,"uuid":"BD602D3C-76B9-446B-9AB1-8F7014DC4876"}
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
 * @properties={"typeid":24,"uuid":"79BC6684-DBDE-42BC-AE98-4812411CF61D"}
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
 * @properties={"typeid":24,"uuid":"546634E5-C8CD-4C97-849A-49DC56E12743"}
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
 * @properties={"typeid":24,"uuid":"1DAC6AE5-B70C-4395-8843-1B4BC4267E1D"}
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
 * @properties={"typeid":24,"uuid":"92FA9FF2-46D9-441E-8F3E-37F34E3B1535"}
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
 * @properties={"typeid":24,"uuid":"2BD80652-4C44-4654-88EA-88B6BAFAB8A9"}
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
 * @properties={"typeid":24,"uuid":"D9A6F223-7F7D-42AF-B577-34B3FF21CCF1"}
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
 * @properties={"typeid":24,"uuid":"4A973AA5-8EB5-49C7-9917-61941203FEA2"}
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
 * @properties={"typeid":24,"uuid":"4AB3F978-5F19-44FA-92B7-3EEF5EA58DDC"}
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
 * @properties={"typeid":24,"uuid":"3697AA14-328F-4278-9D7E-C2840D92EDAD"}
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
 * @properties={"typeid":24,"uuid":"7EF561BE-6785-446B-988A-D47119714CA8"}
 */
function onTestAction(event, dataTarget) {
	// TODO Auto-generated method stub
	application.output('Test');

}
