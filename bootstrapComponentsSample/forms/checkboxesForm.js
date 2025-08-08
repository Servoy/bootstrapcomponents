/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"8229F48E-C5BF-4C50-B7B7-89621F307381",variableType:-4}
 */
var checkbox_dp = true;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"17F90A3A-D962-4804-9D16-B525B21B70A5"}
 */
var demo_log_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A7F90A3A-D962-4804-9D16-B525B21B70A6"}
 */
var html_combobox_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B7F90A3A-D962-4804-9D16-B525B21B70A7"}
 */
var trusted_html_combobox_dp = null;

/**
 * List of available style classes for the checkbox
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"B6FD2079-C74A-43CB-A6CA-D3FB3F42DB09",variableType:-4}
 */
var styleClasses = [
	'checkbox-primary',
	'checkbox-success',
	'checkbox-warning',
	'checkbox-danger',
	'checkbox-dark'
];

/**
 * Index to track current style
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D5BA3052-0493-4625-8E15-98A441423A13",variableType:8}
 */
var currentStyleIndex = -1;


/**
 * @type {Boolean}
 * @properties={typeid:35,uuid:"50680EB6-8D81-48BD-8FBF-43FCB05ECEE9",variableType:-4}
 */
var toggleBorder = false;


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"90F48A83-5FD3-4391-ABF9-707D0C64A62A"}
 */
function onStyleChange(event) {
	
	elements.cb_demo.showAs = null;
	checkbox_dp = 'Demo checkbox';
	// Remove previous style if any
	if (currentStyleIndex >= 0) {
		elements.cb_demo.removeStyleClass(styleClasses[currentStyleIndex]);
	}
	
	// Move to next style
	currentStyleIndex = (currentStyleIndex + 1) % styleClasses.length;
	
	// Add new style
	elements.cb_demo.addStyleClass(styleClasses[currentStyleIndex]);
	
	demo_log_dp = 'Style changed to "' + styleClasses[currentStyleIndex] + '"';	
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"BE54CE10-1BFB-4F89-95E5-73FA4C0D2678"}
 */
function onToggleBorder(event) {
	// Check for default border class first
	var hasDefaultBorder = elements.cb_demo.hasStyleClass('border') && elements.cb_demo.hasStyleClass('border-primary');
	
	// Check for fancy borders
	var hasFancyBorder = elements.cb_demo.hasStyleClass('border-fancy') ||
		elements.cb_demo.hasStyleClass('border-fancy-primary') ||
		elements.cb_demo.hasStyleClass('border-fancy-success') ||
		elements.cb_demo.hasStyleClass('border-fancy-warning') ||
		elements.cb_demo.hasStyleClass('border-fancy-danger') ||
		elements.cb_demo.hasStyleClass('border-fancy-dark');
	
	// Get current style class to match border with style
	var currentStyle = '';
	
	// Check which style is currently applied
	for (var i = 0; i < styleClasses.length; i++) {
		if (elements.cb_demo.hasStyleClass(styleClasses[i])) {
			currentStyle = styleClasses[i];
			break;
		}
	}
	
	// Remove all possible border classes first
	elements.cb_demo.removeStyleClass('border');
	elements.cb_demo.removeStyleClass('border-primary');
	elements.cb_demo.removeStyleClass('border-fancy');
	elements.cb_demo.removeStyleClass('border-fancy-primary');
	elements.cb_demo.removeStyleClass('border-fancy-success');
	elements.cb_demo.removeStyleClass('border-fancy-warning');
	elements.cb_demo.removeStyleClass('border-fancy-danger');
	elements.cb_demo.removeStyleClass('border-fancy-dark');
	
	// Toggle border
	if (!hasDefaultBorder && !hasFancyBorder) {
		// If we have a custom style, use matching fancy border
		if (currentStyle) {
			var fancyBorderClass = 'border-fancy-' + currentStyle.replace('checkbox-', '');
			elements.cb_demo.addStyleClass(fancyBorderClass);
			demo_log_dp = '\nBorder added: ' + fancyBorderClass;
		} else {
			// Use default border if no style is applied
			elements.cb_demo.addStyleClass('border border-primary');
			demo_log_dp = '\nDefault border added: border border-primary';
		}
	} else {
		demo_log_dp = '\nBorder removed';
	}
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E6B6F4AE-FF47-440F-9BAF-3570E7328217"}
 */
function onReset(event) {
	for (var i = 0; i < styleClasses.length; i++) {
		elements.cb_demo.removeStyleClass(styleClasses[i]);
	}
	
	// Reset currentStyleIndex
	currentStyleIndex = -1;
	
	// Remove all border classes
	elements.cb_demo.removeStyleClass('border');
	elements.cb_demo.removeStyleClass('border-primary');
	elements.cb_demo.removeStyleClass('border-fancy');
	elements.cb_demo.removeStyleClass('border-fancy-primary');
	elements.cb_demo.removeStyleClass('border-fancy-success');
	elements.cb_demo.removeStyleClass('border-fancy-warning');
	elements.cb_demo.removeStyleClass('border-fancy-danger');
	elements.cb_demo.removeStyleClass('border-fancy-dark');
	
	// Reset showAs to default
	elements.cb_demo.showAs = 0; // Plain text
	
	// Reset checked state
	checkbox_dp = true;
	
	// Log the reset action
	demo_log_dp = 'Checkbox reset to default state';
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"A1C3BA9D-6685-4403-BA1C-EB5BD84D3890"}
 */
function onDataChange(oldValue, newValue, event) {
	if (checkbox_dp)
		demo_log_dp = '\nCheckbox is checked';
	else 
		demo_log_dp = '\nCheckbox is unchecked';
	return true
}

/**
 * Handle HTML combobox data change
 * 
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 * 
 * @return {Boolean}
 * 
 * @properties={typeid:24,uuid:"E7F90A3A-D962-4804-9D16-B525B21B70AA"}
 */
function onHtmlComboChange(oldValue, newValue, event) {
	elements.cb_html_demo.text = newValue;
	demo_log_dp = '\nHTML checkbox changed to: \n' + newValue;
	
	return true;
}

/**
 * Handle trusted HTML combobox data change
 * 
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 * 
 * @return {Boolean}
 * 
 * @properties={typeid:24,uuid:"F7F90A3A-D962-4804-9D16-B525B21B70AB"}
 */
function onTrustedHtmlComboChange(oldValue, newValue, event) {
	elements.cb_trusted_html_demo.text = newValue;
	demo_log_dp = '\nTrusted HTML checkbox changed to: \n' + newValue;
	
	return true;
}
