/**
 * @type {String}
 *
 * @properties={"typeid":35,"uuid":"1C99CC23-664D-4D32-BF93-D0A598EF7AF9"}
 */
var footerStatus = '';

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} message
 *
 * @properties={"typeid":24,"uuid":"992FEE18-D3E1-4413-BC9D-FAC7B178568C"}
 */
function setStatusMessage(message) {
	footerStatus = message;
}

/**
 * @properties={"typeid":24,"uuid":"E3FE891D-1E9C-4158-B055-7F8D3B22D9F2"}
 * 
 * @return {String}
 */
function getStatusMessage() {
	return footerStatus;
}
