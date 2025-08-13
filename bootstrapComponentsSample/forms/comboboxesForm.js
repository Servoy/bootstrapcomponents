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
 * @properties={typeid:35,uuid:"09334E2D-CE0D-4DF0-BFAD-5C0B0BA71676",variableType:-4}
 */
var catalog = {
		'All (no format)': {
			format: null,
			explanation: 'No formatting is applied. All items are shown regardless of content.'
		},

		'Date (DD/MM/YYYY)': {
			format: '##/##/####',
			explanation: 'Two digits for day, slash, two digits for month, slash, four digits for year (e.g., 05/09/2025).'
		},

		'Time (HH:MM)': {
			format: '##:##',
			explanation: '24‑hour time with two digits for hours, colon, two digits for minutes (e.g., 14:30).'
		},

		'US Phone ((###) ###-####)': {
			format: '(###) ###-####',
			explanation: 'US phone number: area code in parentheses, space, three digits, dash, four digits (e.g., (415) 555-0198).'
		},

		'Invoice ID (UUU-####)': {
			format: 'UUU-####',
			explanation: 'Three uppercase letters, dash, four digits (e.g., INV-2045).'
		},

		'License Plate (UU-####-U)': {
			format: 'UU-####-U',
			explanation: 'Two uppercase letters, dash, four digits, dash, one uppercase letter (e.g., TX-8921-B).'
		},

		'Airport + Flight (UUU ####)': {
			format: 'UUU ####',
			explanation: 'Three-letter IATA code in uppercase, space, four digits (e.g., SFO 1033).'
		},

		'IPv4 (###.###.###.###)': {
			format: '###.###.###.###',
			explanation: 'Four groups of three digits separated by dots (format only; not range‑validated).'
		},

		'HEX Color (#HHHHHH)': {
			format: "'#HHHHHH",
			explanation: 'Literal # followed by six hexadecimal characters; lowercase hex will be converted to uppercase (e.g., #1A3F9C).'
		},

		'MAC Address (HH:HH:HH:HH:HH:HH)': {
			format: 'HH:HH:HH:HH:HH:HH',
			explanation: 'Six pairs of hexadecimal characters separated by colons; output normalized to uppercase (e.g., AA:BB:0C:1D:2E:3F).'
		},

		'Name (U??? U???)': {
			format: 'U??? U???',
			explanation: 'First and last name: each begins with an uppercase letter (U) followed by three alphabetic characters (?), space‑separated (e.g., John Doe).'
		},

		'RO Postal (RO ######)': {
			format: 'RO ######',
			explanation: "Literal 'RO' then a space and six digits (e.g., RO 030167)."
		}
	};

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
	elements.cb_demo.toolTipText = tooltip_dp;
	elements.cb_demo.placeholderText = placeholder_dp;
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
	
	var byMask = {};
	for (var label in catalog) {
		byMask[catalog[label].format] = catalog[label];
	}

	var entry = catalog[newValue] || byMask[newValue] || catalog['All (no format)'];

	message_dp = entry.explanation;
	elements.cb_demo.format = entry.format; 

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
	
	application.output(newValue)
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
