/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"135A0AD7-157F-4AE6-BFCF-245BDE24E926"}
 */
var footerStatus = '';

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} message
 *
 * @properties={"typeid":24,"uuid":"DCC7306B-6E29-496E-9C72-3CAB83285135"}
 */
function setStatusMessage(message) {
	footerStatus = message;
}

/**
 * @properties={"typeid":24,"uuid":"65145F7A-FB64-4A6B-8B1B-497907A9DC5C"}
 * 
 * @return {String}
 */
function getStatusMessage() {
	return footerStatus;
}
