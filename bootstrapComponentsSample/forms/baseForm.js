/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B3816812-5A41-458A-A564-5051BEBF0F7B"}
 */
function onLoad(event) {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.btn_Button.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Button', 'buttonForm')
	
	loadDemoData();
}

/**
 * Load demo data from JSON media files into in-mem tables.
 *
 * @properties={typeid:24,uuid:"F7629956-C6E5-4D33-AED0-77395030792D"}
 */
function loadDemoData() {
    var files = ['customers.json', 'orders.json', 'order_details.json'];
    
    for (var i = 0; i < files.length; i++) {
        var fileName = files[i];
        var mediaObj = solutionModel.getMedia(fileName);
        if (!mediaObj) {
            application.output("Missing media file: " + fileName);
            continue;
        }
        
        var content = mediaObj.getAsString();
        var data = JSON.parse(content);
        
        // strip .json to get table name
        var tableName = fileName.replace('.json', '');
        var fs = databaseManager.getFoundSet('mem:' + tableName);
        fs.clear();
        
        for (var j = 0; j < data.length; j++) {
            var rec = fs.getRecord(fs.newRecord());
            var row = data[j];
            for (var key in row) {
                if (row[key] != null) {
                    rec[key] = row[key];
                }
            }
        }
        databaseManager.saveData(fs);
        application.output("Loaded " + fs.getSize() + " records into " + tableName);
    }
}
