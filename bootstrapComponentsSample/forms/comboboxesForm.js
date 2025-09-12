/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"967716BF-3753-4C04-822F-0E464A318375"}
 */
var message_dataChange_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EC77D483-225C-49B2-BA80-1236975A4876"}
 */
var cb_demo_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8780C871-0EE7-4672-AC85-85C6904329DA"}
 */
var message_focus_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1CC50C50-8D7A-4678-AD69-E035AA5293C5"}
 */
var message_actions_dp = null;

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
function onDataChange_format(oldValue, newValue, event) {

	var byMask = { };
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
	var styleClasses = ['combobox-red-border',
		'combobox-blue',
		'combobox-green',
		'combobox-dark',
		'combobox-rounded'];

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
			application.output('ERROR: not found ->' + newValue);
		}

		// Update message to show which style is applied
		message_dp = 'Style "' + newValue + '" has been applied to the Demo combobox';
	} else {
		message_dp = 'Style has been removed from the Demo combobox';
	}
	scopes.global.setStatusMessage(event.getElementName() + ' click');
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C39038CE-3F14-4E4A-BB82-18F524CDD674"}
 */
function onAction_toggleAppendToBody(event) {
	elements.cb_demo.appendToBody = !elements.cb_demo.appendToBody;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"497EA38F-2508-4995-BB14-80DFA8CD14C8"}
 */
function onAction_toggleEnabled(event) {
	elements.cb_demo.enabled = !elements.cb_demo.enabled;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"98E545B3-1E92-4F8E-B91A-95D9386B5C83"}
 */
function onAction_toggleVisible(event) {
	elements.cb_demo.visible = !elements.cb_demo.visible;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"707FADE8-67E5-4A36-B632-48F7D32B6564"}
 */
function onAction_requestFocusTrue(event) {
	elements.cb_demo.requestFocus(true);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4F5C3E9C-9461-44E4-AA47-BBB5958CBBA8"}
 */
function onAction_requestFocusFalse(event) {
	elements.cb_demo.requestFocus(false);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F84BA404-BA5C-4875-A666-E20A2B700988"}
 */
function onAction(event) {
	message_actions_dp = "Action on combobox"
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A95DD728-57DB-4854-AC34-2160BA59ACED"}
 */
function onFocusGained(event) {
	message_focus_dp = "Focus gained on combobox"
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5C4175A2-2E25-482C-A060-134CB80DA6C7"}
 */
function onFocusLost(event) {
	message_focus_dp = "Focus lost on combobox"
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DBC4CF41-0608-4732-A58F-F7C00CE72758"}
 */
function onRightClick(event) {
	message_actions_dp = "Right click on combobox"
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
 * @properties={typeid:24,uuid:"1F942560-11D4-475A-82BF-EE23D0334ECE"}
 */
function onDataChange(oldValue, newValue, event) {
	message_dataChange_dp = "On data change from: " + oldValue + ' to: ' + newValue
	return true
}
