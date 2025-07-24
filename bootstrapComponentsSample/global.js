/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AE3CC0AE-883C-4509-A150-4A61CD52DAB2"}
 */
var footerStatus;

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} message
 *
 * @properties={typeid:24,uuid:"5A523287-6158-4262-A6A3-1A4DFF524D07"}
 */
function setStatusMessage(message) {
	footerStatus = message;
}

/**
 * @properties={typeid:24,uuid:"1AAAE083-C8E9-462B-B6FF-2C4975669BF5"}
 * 
 * @return {String}
 */
function getStatusMessage() {
	return footerStatus;
}