/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"88EA5C91-AA14-4A2C-86E0-A3019E5AC6D7"}
 */
var style_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"15E85322-B729-4FAF-9877-3064F512067E"}
 */
var my_test_dp = null;


/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"09334E2D-CE0D-4DF0-BFAD-5C0B0BA71676",variableType:-4}
 */

// Format names with their display text
var formatNames = [
	'Date (DD/MM/YYYY)',
	'IPv4 (###.###.###.###)',
	'License Plate (UU-####-U)'
];

// Format patterns corresponding to the names
/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"C0506199-D8CB-4991-9CE4-0B896FC1C6EA",variableType:-4}
 */
var formatPatterns = [
	'##/##/####',
	'###.###.###.###',
	'UU-####-U'
];

// Explanations for each format
/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"5C62C3AF-2471-41CA-BEFB-6A23445C325C",variableType:-4}
 */
var formatExplanations = [
	'Two digits for day, slash, two digits for month, slash, four digits for year (e.g., 05/09/2025).',
	'Four groups of three digits separated by dots (format only; not range‑validated).',
	'Two uppercase letters, dash, four digits, dash, one uppercase letter (e.g., TX-8921-B).'
];

// Sample data for Date format
/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"2BC48B16-0EDB-4513-B30D-CC6A9D10EC57",variableType:-4}
 */
var dateFormatSamples = [
	'01/01/2025',
	'15/03/2025',
	'22/07/2025',
	'30/09/2025',
	'25/12/2025',
	'14/02/2026',
	'31/10/2026'
];

// Sample data for IPv4 format
/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"62CC9B6A-1AB1-4A94-901E-169FCF6E4ACE",variableType:-4}
 */
var ipv4FormatSamples = [
	'192.168.001.001',
	'010.000.000.001',
	'172.016.000.001',
	'127.000.000.001',
	'255.255.255.000',
	'008.008.008.008',
	'104.018.033.120'
];

// Sample data for License Plate format
/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"8D9499A0-3E76-4E73-9D9A-02A96CE8F44B",variableType:-4}
 */
var licensePlateFormatSamples = [
	'TX-1234-A',
	'NY-5678-B',
	'CA-9012-C',
	'FL-3456-D',
	'WA-7890-E',
	'IL-2345-F',
	'PA-6789-G'
];

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2ABC400D-6B67-4401-A0B0-CA29263AEAF3"}
 */
var message_dp = 'Select an action and check the result in \`Demo combobox\`\nSelect Demo combobox and type for \'Search...\'';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"14FA186F-BD16-44EA-B394-0462E7C681A4"}
 */
var demo_combo_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"79293AAF-0D4D-438F-A923-12FF16D3375D"}
 */
var format_dp = 'Normal text';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"32C741F2-23E2-443B-BFBF-2AC9DB4A3E48"}
 */
var placeholder_dp = 'Select an item ...';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F9EC21AD-52DE-4812-B9BE-0A96D16F0C6F"}
 */
var tooltip_dp = 'Combobox demo tooltip ...';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"60639C03-DB92-417A-A488-F95133B8C751"}
 */
function onLoad(event) {
	// Set basic properties
	elements.cb_demo.toolTipText = tooltip_dp;
	elements.cb_demo.placeholderText = placeholder_dp;
	
	// Initialize the format combobox with the first format
	if (formatNames.length > 0) {
		// Set the initial format
		format_dp = formatNames[0];
		
		// Get the corresponding format pattern and explanation
		var formatPattern = formatPatterns[0];
		
		// Set the format on the demo combobox
		elements.cb_demo.format = formatPattern;
		
		// Initialize the valuelist with sample data for the first format
		var dataset = databaseManager.createEmptyDataSet();
		dataset.addColumn('displayvalue', 1, 255);
		dataset.addColumn('realvalue', 2, 255);
		
		// Add each sample as both display and real value
		for (var i = 0; i < dateFormatSamples.length; i++) {
			dataset.addRow([dateFormatSamples[i], dateFormatSamples[i]]);
		}
		
		// Set the dataset as the valuelist for the demo combobox
		elements.cb_demo.valuelist.dataset = dataset;
		
	}
	
	scopes.global.setStatusMessage(event.getElementName() + ' form loaded');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D40AD537-995E-4F00-8006-E16008AAEA68"}
 */
function onTooltip(event) {
	elements.cb_demo.toolTipText = tooltip_dp;
	scopes.global.setStatusMessage(event.getElementName() + ' click');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6FC19C2E-6345-436F-AF53-7BB9BEED3AAB"}
 */
function onPlaceholder(event) {
	elements.cb_demo.placeholderText = tooltip_dp;
	scopes.global.setStatusMessage(event.getElementName() + ' click');

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
 * @properties={typeid:24,uuid:"625F8EE4-081E-4D0D-BCA0-9B72E63054C4"}
 */
function onDataChange(oldValue, newValue, event) {
	// Find the index of the selected format in the names array
	var index = formatNames.indexOf(newValue);
	
	if (index !== -1) {
		// Get the corresponding format pattern and explanation
		var formatPattern = formatPatterns[index];
		var explanation = formatExplanations[index];
		
		// Update the message and set the format
		message_dp = explanation;
		elements.cb_demo.format = formatPattern;
		
		// Create a dataset with the appropriate sample data based on the selected format
		var sampleData;
		switch(newValue) {
			case 'Date (DD/MM/YYYY)':
				sampleData = dateFormatSamples;
				break;
			case 'IPv4 (###.###.###.###)':
				sampleData = ipv4FormatSamples;
				break;
			case 'License Plate (UU-####-U)':
				sampleData = licensePlateFormatSamples;
				break;
			default:
				sampleData = [];
		} 
		
		// Create a JSDataSet from the sample data array
		var dataset = databaseManager.createEmptyDataSet();
		dataset.addColumn('displayvalue', 1, 255);
		dataset.addColumn('realvalue', 2, 255);
		
		// Add each sample as both display and real value
		for (var i = 0; i < sampleData.length; i++) {
			dataset.addRow([sampleData[i], sampleData[i]]);
		}
		
		// Set the dataset as the valuelist for the demo combobox
		elements.cb_demo.valuelist.dataset = dataset;
		
		message_dp = explanation + '\n\nLoaded ' + sampleData.length + ' sample items for this format.';
	} else {
		// No format selected or invalid selection
		message_dp = 'No format selected';
		elements.cb_demo.format = null;
		
		// Clear the valuelist
		var emptyDataset = databaseManager.createEmptyDataSet();
		emptyDataset.addColumn('displayvalue', 1, 255);
		emptyDataset.addColumn('realvalue', 2, 255);
		elements.cb_demo.valuelist.dataset = emptyDataset;
		
		message_dp = 'No format selected. Please choose a format.';
	}
	
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6A6C4426-4E46-4377-BA5F-AD3BBBA16A64"}
 */
function onReset(event) {
	placeholder_dp = 'Select an item ...';
	tooltip_dp = 'Combobox demo tooltip ...';
	elements.cb_demo.placeholderText = placeholder_dp;
	elements.cb_demo.toolTipText = tooltip_dp;
	elements.cb_demo.format = null;
	message_dp = 'Select an action and check the result in \`Demo combobox\`\nSelect Demo combobox and type for \'Search...\'';
	scopes.global.setStatusMessage(event.getElementName() + ' click');
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
 * @properties={typeid:24,uuid:"652273B5-1A7F-43FA-A705-898FE9C9C922"}
 */
function onStyleChange(oldValue, newValue, event) {
	
	// Define all possible style classes
	var styleClasses = [
		'combobox-red-border',
		'combobox-blue',
		'combobox-green',
		'combobox-dark',
		'combobox-rounded'
	];
	
	// Remove all existing style classes first from the demo combobox
	for (var i = 0; i < styleClasses.length; i++) {
		if (elements.cb_styleclass.hasStyleClass(styleClasses[i])) {
			elements.cb_styleclass.removeStyleClass(styleClasses[i]);
		}
	}
	
	// Add the new style class if one is selected
	if (newValue) {
		elements.cb_styleclass.addStyleClass(newValue);
		
		if (!elements.cb_styleclass.hasStyleClass(newValue)) {
			application.output('ERROR: not found ->' + newValue );
		}
		
		// Update message to show which style is applied
		message_dp = 'Style "' + newValue + '" has been applied to the Demo combobox';
	} else {
		message_dp = 'Style has been removed from the Demo combobox';
	}
	scopes.global.setStatusMessage(event.getElementName() + ' click');
	return true;
}
