/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2CE6F323-401D-4711-8668-F3604409442C"}
 */
var passwordTextBoxDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"137AA78A-874D-43B4-9872-A33B63FA2D7C"}
 */
var formatTextBoxDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"63B9508A-90E1-4358-A3F5-8903AF03CDDE"}
 */
var textTextboxDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C1201651-2C6C-4428-AB61-BEE5B4FD0C3B"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4D4FA8A7-FD96-45AD-A6F7-51B639D1A49F"}
 */
var placeholderTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D315F9D6-6A19-40FA-BA26-B941377D912C"}
 */
var outputFocusDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AD2F46D4-B6E0-437B-8AE3-8519CFFAB241"}
 */
var outputDataChangeDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"25F21E9D-7122-43C3-B42F-0E9BB23CEC90"}
 */
var outputActionDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"85E932C7-E24E-4038-A5BF-2583D04D87FC"}
 */
var select_dp = 'Click for select';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FCEC85F-1F00-4A0A-8167-A6E2D1E091C5"}
 */
var readOnly_dp = 'This is a read only text';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"52AC2489-1A5D-41B2-83E0-743267727A56",variableType:93}
 */
var tb_week_dp = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"CBFBCAEF-5424-4046-AD2C-7CD15C2C4346",variableType:93}
 */
var tb_time_dp = new Date();

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"29DE7F70-8E83-4587-8EC9-74F85E403641",variableType:93}
 */
var tb_month_dp = new Date();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F512ECD8-16F2-4DF4-83A2-BEABB3BF5214"}
 */
var tb_date_message = null;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"3EBF15F2-61D2-4A8E-B733-B2DFC462014F",variableType:93}
 */
var tb_date_dp = new Date();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BF63DF26-98FE-4D45-9B81-B9691E9AB114"}
 */
var base_txt_msg = null;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C9AAC131-85B9-41AF-B062-8E9161A227CB"}
 */
function onBaseFocusGained(event) {
	outputFocusDP = 'Focus gained'
	var elementName = event.getElementName();

	switch (elementName) {
	case 'txt_search':
		base_txt_msg = "Search Input Type\n\nThis is a search input field that displays a search icon in most browsers.\nIt's styled with text-primary and border-primary classes.\nUse for search functionality within forms and applications.";
		break;

	case 'txt_text':
		base_txt_msg = "Text Input Type\n\nThis is the standard text input field.\nIt accepts any text input and is the default type for textboxes.\nUse for general text entry like names, descriptions, etc.";
		break;

	case 'txt_number':
		base_txt_msg = "Number Input Type\n\nThis field only accepts numerical input.\nMost browsers will show increment/decrement controls.\nUse for any numeric data entry.";
		break;

	case 'txt_email':
		base_txt_msg = "Email Input Type\n\nSpecialized for email address entry.\nProvides email validation in most browsers.\nMobile devices will show optimized keyboard layouts for email entry.";
		break;

	case 'txt_password':
		base_txt_msg = "Password Input Type\n\nMasks input characters for security.\nUse for password entry fields.\nText is displayed as dots or asterisks.";
		break;

	case 'txt_password_eye':
		base_txt_msg = "Password with Eye Icon\n\nPassword field with visibility toggle.\nClicking the eye icon shows/hides the password.\nCombines security with user convenience.";
		break;

	case 'txt_tel':
		base_txt_msg = "Telephone Input Type\n\nOptimized for phone number entry.\nMobile devices will show a numeric keypad.\nCan be combined with format patterns for consistent entry.";
		break;

	case 'txt_url':
		base_txt_msg = "URL Input Type\n\nSpecialized for web address entry.\nSome browsers provide basic URL validation.\nMobile keyboards optimize for URL entry (showing '.com' keys etc).";
		break;

	case 'txt_color':
		base_txt_msg = "Color Input Type\n\nProvides a color picker interface.\nReturns color values in hexadecimal format.\nUse for any color selection functionality.";
		break;

	case 'txt_format':
		base_txt_msg = "Format Mask Example\n\nThis textbox uses a format mask: ###-##-####\nFormat masks ensure consistent data entry.\nPlaceholders guide users on expected format.";
		break;
	default:
		base_txt_msg = "Bootstrap Textbox Component\n\nClick on different textbox examples to see descriptions of their features.\nThis form demonstrates various input types, styling options, and behaviors.";
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DFEABC88-E196-40B8-90F3-188621679A0B"}
 */
function onLoad(event) {
	// TODO Auto-generated method stub
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1BA5529B-48AE-4267-B37B-092AA4D711E6"}
 */
function onAction_toggleEditable(event) {
	elements.txt_base_msgs.editable = !elements.txt_base_msgs.editable
	elements.txt_color.editable = !elements.txt_color.editable
	elements.txt_datetime.editable = !elements.txt_datetime.editable
	elements.txt_default.editable = !elements.txt_default.editable
	elements.txt_disabled.editable = !elements.txt_disabled.editable
	elements.txt_email.editable = !elements.txt_email.editable
	elements.txt_error.editable = !elements.txt_error.editable
	elements.txt_format.editable = !elements.txt_format.editable
	elements.txt_month.editable = !elements.txt_month.editable
	elements.txt_number.editable = !elements.txt_number.editable
	elements.txt_password.editable = !elements.txt_password.editable
	elements.txt_password_eye.editable = !elements.txt_password_eye.editable
	elements.txt_readonly.editable = !elements.txt_readonly.editable
	elements.txt_search.editable = !elements.txt_search.editable
	elements.txt_selectonenter.editable = !elements.txt_selectonenter.editable
	elements.txt_small.editable = !elements.txt_small.editable
	elements.txt_success.editable = !elements.txt_success.editable
	elements.txt_tel.editable = !elements.txt_tel.editable
	elements.txt_text.editable = !elements.txt_text.editable
	elements.txt_time.editable = !elements.txt_time.editable
	elements.txt_url.editable = !elements.txt_url.editable
	elements.txt_warning.editable = !elements.txt_warning.editable
	elements.txt_week.editable = !elements.txt_week.editable
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A677A3FA-AD6E-44B8-AAA7-EB55A81223FF"}
 */
function onAction_toggleEnabled(event) {
	elements.txt_base_msgs.enabled = !elements.txt_base_msgs.enabled
	elements.txt_color.enabled = !elements.txt_color.enabled
	elements.txt_datetime.enabled = !elements.txt_datetime.enabled
	elements.txt_default.enabled = !elements.txt_default.enabled
	elements.txt_disabled.enabled = !elements.txt_disabled.enabled
	elements.txt_email.enabled = !elements.txt_email.enabled
	elements.txt_error.enabled = !elements.txt_error.enabled
	elements.txt_format.enabled = !elements.txt_format.enabled
	elements.txt_month.enabled = !elements.txt_month.enabled
	elements.txt_number.enabled = !elements.txt_number.enabled
	elements.txt_password.enabled = !elements.txt_password.enabled
	elements.txt_password_eye.enabled = !elements.txt_password_eye.enabled
	elements.txt_readonly.enabled = !elements.txt_readonly.enabled
	elements.txt_search.enabled = !elements.txt_search.enabled
	elements.txt_selectonenter.enabled = !elements.txt_selectonenter.enabled
	elements.txt_small.enabled = !elements.txt_small.enabled
	elements.txt_success.enabled = !elements.txt_success.enabled
	elements.txt_tel.enabled = !elements.txt_tel.enabled
	elements.txt_text.enabled = !elements.txt_text.enabled
	elements.txt_time.enabled = !elements.txt_time.enabled
	elements.txt_url.enabled = !elements.txt_url.enabled
	elements.txt_warning.enabled = !elements.txt_warning.enabled
	elements.txt_week.enabled = !elements.txt_week.enabled
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"98CC9E5A-3E9E-41D7-AD41-49DDD0B4E0F8"}
 */
function onAction_toggleVisible(event) {
	elements.txt_base_msgs.visible = !elements.txt_base_msgs.visible
	elements.txt_color.visible = !elements.txt_color.visible
	elements.txt_datetime.visible = !elements.txt_datetime.visible
	elements.txt_default.visible = !elements.txt_default.visible
	elements.txt_disabled.visible = !elements.txt_disabled.visible
	elements.txt_email.visible = !elements.txt_email.visible
	elements.txt_error.visible = !elements.txt_error.visible
	elements.txt_format.visible = !elements.txt_format.visible
	elements.txt_month.visible = !elements.txt_month.visible
	elements.txt_number.visible = !elements.txt_number.visible
	elements.txt_password.visible = !elements.txt_password.visible
	elements.txt_password_eye.visible = !elements.txt_password_eye.visible
	elements.txt_readonly.visible = !elements.txt_readonly.visible
	elements.txt_search.visible = !elements.txt_search.visible
	elements.txt_selectonenter.visible = !elements.txt_selectonenter.visible
	elements.txt_small.visible = !elements.txt_small.visible
	elements.txt_success.visible = !elements.txt_success.visible
	elements.txt_tel.visible = !elements.txt_tel.visible
	elements.txt_text.visible = !elements.txt_text.visible
	elements.txt_time.visible = !elements.txt_time.visible
	elements.txt_url.visible = !elements.txt_url.visible
	elements.txt_warning.visible = !elements.txt_warning.visible
	elements.txt_week.visible = !elements.txt_week.visible
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E10C95F1-B3EC-4A00-8DAF-DF5CBADB1C0A"}
 */
function onActio_requestFocusTrue(event) {
	elements.txt_time.requestFocus(true);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"56F3BAE9-0EAB-46DA-BB73-AD87A4A641A1"}
 */
function onActio_requestFocusFalse(event) {
	elements.txt_time.requestFocus(false);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"32EBB3C9-3927-447B-8E2D-DB8ABF3ABBB2"}
 */
function onAction(event) {
	outputActionDP = 'On Action called'
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
 * @properties={typeid:24,uuid:"48F67A16-5CA2-4EFC-8278-3FE33DCC5E57"}
 */
function onDataChange(oldValue, newValue, event) {
	outputDataChangeDP = 'On data change from ' + oldValue + ' to ' + newValue
	return true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A67C911E-E7E9-4999-B3A9-6A3DF54AFEB9"}
 */
function onFocusLost(event) {
	outputFocusDP = 'Focus lost'
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"3606AD8D-0158-41FC-BABA-15ACF89F684B"}
 */
function onRightClick(event) {
	outputActionDP = 'Right click called'
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
 * @properties={typeid:24,uuid:"6F95A2BE-0988-4559-9A09-41BD7A473D55"}
 */
function onDataChange_placeholderText(oldValue, newValue, event) {
	elements.txt_base_msgs.placeholderText = placeholderTextDP
	elements.txt_color.placeholderText = placeholderTextDP
	elements.txt_datetime.placeholderText = placeholderTextDP
	elements.txt_default.placeholderText = placeholderTextDP
	elements.txt_disabled.placeholderText = placeholderTextDP
	elements.txt_email.placeholderText = placeholderTextDP
	elements.txt_error.placeholderText = placeholderTextDP
	elements.txt_format.placeholderText = placeholderTextDP
	elements.txt_month.placeholderText = placeholderTextDP
	elements.txt_number.placeholderText = placeholderTextDP
	elements.txt_password.placeholderText = placeholderTextDP
	elements.txt_password_eye.placeholderText = placeholderTextDP
	elements.txt_readonly.placeholderText = placeholderTextDP
	elements.txt_search.placeholderText = placeholderTextDP
	elements.txt_selectonenter.placeholderText = placeholderTextDP
	elements.txt_small.placeholderText = placeholderTextDP
	elements.txt_success.placeholderText = placeholderTextDP
	elements.txt_tel.placeholderText = placeholderTextDP
	elements.txt_text.placeholderText = placeholderTextDP
	elements.txt_time.placeholderText = placeholderTextDP
	elements.txt_url.placeholderText = placeholderTextDP
	elements.txt_warning.placeholderText = placeholderTextDP
	elements.txt_week.placeholderText = placeholderTextDP
	return true
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
 * @properties={typeid:24,uuid:"2101B66F-059F-455F-AAC4-0123FEEA25C3"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.txt_base_msgs.toolTipText = tooltipTextDP
	elements.txt_color.toolTipText = tooltipTextDP
	elements.txt_datetime.toolTipText = tooltipTextDP
	elements.txt_default.toolTipText = tooltipTextDP
	elements.txt_disabled.toolTipText = tooltipTextDP
	elements.txt_email.toolTipText = tooltipTextDP
	elements.txt_error.toolTipText = tooltipTextDP
	elements.txt_format.toolTipText = tooltipTextDP
	elements.txt_month.toolTipText = tooltipTextDP
	elements.txt_number.toolTipText = tooltipTextDP
	elements.txt_password.toolTipText = tooltipTextDP
	elements.txt_password_eye.toolTipText = tooltipTextDP
	elements.txt_readonly.toolTipText = tooltipTextDP
	elements.txt_search.toolTipText = tooltipTextDP
	elements.txt_selectonenter.toolTipText = tooltipTextDP
	elements.txt_small.toolTipText = tooltipTextDP
	elements.txt_success.toolTipText = tooltipTextDP
	elements.txt_tel.toolTipText = tooltipTextDP
	elements.txt_text.toolTipText = tooltipTextDP
	elements.txt_time.toolTipText = tooltipTextDP
	elements.txt_url.toolTipText = tooltipTextDP
	elements.txt_warning.toolTipText = tooltipTextDP
	elements.txt_week.toolTipText = tooltipTextDP
	return true
}
