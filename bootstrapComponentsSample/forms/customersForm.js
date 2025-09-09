/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"52530629-89AA-4BA6-9CFB-601CC1ED3E62",variableType:4}
 */
var test_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E35B6BE2-FAC0-4AF5-93A6-030C3E5FDD2B"}
 */
var customerdetails_dp = null;

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"3E9C4686-07EA-4215-8910-7853F4211112"}
 */
function onDataChange(oldValue, newValue, event) {
//	var fs = databaseManager.getFoundSet('mem:customers');
////	var fs = foundset;
//	if (fs.find()) {
//		companyname = newValue;
//		fs.search();
//	}
//	if (fs.getSize() > 0) {
//		var rec = fs.getRecord(1);
//		var details = 'Company: ' + rec.companyname;
//		if (rec.contactname) details += '\nContact: ' + rec.contactname;
//		if (rec.city || rec.country) details += '\nLocation: ' + [rec.city, rec.country].join(', ');
//		if (rec.phone) details += '\nPhone: ' + rec.phone;
//
//		customerdetails_dp = details;
//		
//		forms.ordersForm.loadListRecords(rec.customerid);
//		
//		scopes.global.customer_dp = rec.companyname;
//	} else {
//		application.output('No records found for: ' + newValue);
//	}
	
	if (foundset.find()) {
		companyname = newValue;
		foundset.search();
	}
	if (foundset.getSize() > 0) {
		var rec = foundset.getRecord(1);
		var details = 'Company: ' + rec.companyname;
		if (rec.contactname) details += '\nContact: ' + rec.contactname;
		if (rec.city || rec.country) details += '\nLocation: ' + [rec.city, rec.country].join(', ');
		if (rec.phone) details += '\nPhone: ' + rec.phone;

		customerdetails_dp = details;
		
		forms.ordersForm.loadListRecords(rec.customerid);
		
		scopes.global.customer_dp = rec.companyname;
	}
	return true;
}