/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"85E932C7-E24E-4038-A5BF-2583D04D87FC"}
 */
var select_dp = 'Click for select';

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"4FCEC85F-1F00-4A0A-8167-A6E2D1E091C5"}
 */
var readOnly_dp = 'This is a read only text';

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"52AC2489-1A5D-41B2-83E0-743267727A56","variableType":93}
 */
var tb_week_dp = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"CBFBCAEF-5424-4046-AD2C-7CD15C2C4346","variableType":93}
 */
var tb_time_dp = new Date();

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"29DE7F70-8E83-4587-8EC9-74F85E403641","variableType":93}
 */
var tb_month_dp = new Date();

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"F512ECD8-16F2-4DF4-83A2-BEABB3BF5214"}
 */
var tb_date_message = null;

/**
 * @type {Date}
 *
 * @properties={"typeid":35,"uuid":"3EBF15F2-61D2-4A8E-B733-B2DFC462014F","variableType":93}
 */
var tb_date_dp = new Date();

/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"BF63DF26-98FE-4D45-9B81-B9691E9AB114"}
 */
var base_txt_msg = null;

/**
 * @param {JSEvent} event
 *
 * @properties={"typeid":24,"uuid":"C9AAC131-85B9-41AF-B062-8E9161A227CB"}
 */
function onBaseFocusGained(event) {
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
 * @properties={"typeid":24,"uuid":"DFEABC88-E196-40B8-90F3-188621679A0B"}
 */
function onLoad(event) {
	// TODO Auto-generated method stub
}
