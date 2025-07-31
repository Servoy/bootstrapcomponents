/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"1457B35E-8DEE-4EF6-8B9D-C4ED2C49C6A3"}
 */
var footerStatus = '';

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} message
 *
 * @properties={"typeid":24,"uuid":"702E361B-BB17-4549-9E9D-13C874DB3DED"}
 */
function setStatusMessage(message) {
	footerStatus = message;
}

/**
 * @properties={"typeid":24,"uuid":"747CBC5A-A9ED-4632-884C-AB5ACC7361E9"}
 * 
 * @return {String}
 */
function getStatusMessage() {
	return footerStatus;
}
