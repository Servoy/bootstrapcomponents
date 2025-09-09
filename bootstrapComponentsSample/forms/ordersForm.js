/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D8AC9058-6964-4280-AC34-024846B42929"}
 */
var order_details_dp = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5F365344-5571-4AED-B9C0-1FE7065CBC45"}
 */
var order_dp = null;

/**
 * Load a list of records given an id in the Native Select component of the form
 * 
 * @param {Number} customerId
 *
 * @properties={typeid:24,uuid:"C83BC09C-6102-43E1-AFDF-CB3E154BBE1C"}
 * @AllowToRunInFind
 */
function loadListRecords(customerId) {
    if (foundset.find()) {
        orders_to_customer.customerid = customerId;
        foundset.search();
    }
    if (foundset.getSize() > 0) {
        /** @type {JSDataSet} */
        var ds = databaseManager.createEmptyDataSet();
        ds.addColumn('display');
        ds.addColumn('real');

        for (var i = 1; i <= foundset.getSize(); i++) {
            var r = foundset.getRecord(i);
            // r.orderdate should already be a Date; format it nicely:
            var disp = String(r.orderid) + ' : ' + utils.dateFormat(r.orderdate, 'yyyy-MM-dd HH:mm');
            ds.addRow([disp, r.orderid]); // display, real
        }
        elements.native_select_orders.valuelist.dataset = ds;
//        application.setValueListItems('orders_vl', ds);

     
    }
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
 * @properties={typeid:24,uuid:"0B2EC32F-B2C3-4A04-9111-B33A69EE1F79"}
 * @AllowToRunInFind
 */
function onDataChange(oldValue, newValue, event) {
	application.output('onDataChange called');
	if (foundset.find()) {
		foundset.orderid = newValue; // newValue is numeric (real value from valuelist)
		foundset.search();
	}

	if (foundset.getSize() > 0) {
		var rec = foundset.getRecord(1);
		var lines = [];
		lines.push('Order: ' + rec.orderid);
		lines.push('Customer ID: ' + rec.customerid);
		lines.push('Date: ' + utils.dateFormat(rec.orderdate, 'yyyy-MM-dd HH:mm'));
		if (rec.freight != null) lines.push('Freight: ' + rec.freight);
		if (rec.shipname) lines.push('Ship To: ' + rec.shipname);
		var loc = [];
		if (rec.shipcity) loc.push(rec.shipcity);
		if (rec.shipcountry) loc.push(rec.shipcountry);
		if (loc.length) lines.push('Location: ' + loc.join(', '));
		order_details_dp = lines.join('\n');
	} else {
		order_details_dp = 'Order not found: ' + newValue;
	}
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"EA4143B2-7C05-4352-8061-877D81FB47BD"}
 */
function onAction(event) {
	application.output('is working: ' + order_dp);

}
