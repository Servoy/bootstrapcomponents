{
	"name": "bootstrapcomponents-combobox",
	"displayName": "Combobox",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/combobox/combobox.png",
	"definition": "bootstrapcomponents/combobox/combobox.js",
	"doc": "bootstrapcomponents/combobox/combobox_doc.js",
	"libraries": [
		{"name":"bootstrapcomponents-combobox-css", "version":"1.0", "url":"bootstrapcomponents/combobox/combobox.css", "mimetype":"text/css"},
		{"name":"ui-select", "version":"0.8.1", "url":"bootstrapcomponents/combobox/lib/select.js", "mimetype":"text/javascript"},
		{"name":"ui-select", "version":"0.8.0", "url":"bootstrapcomponents/combobox/lib/select.css", "mimetype":"text/css"}
	],
	"keywords": [],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope": "design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}, "displayTagsPropertyName" : "displaysTags"},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID","onFocusGainedMethodID","onFocusLostMethodID","onRightClickMethodID"] }, 
			"format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
			"placeholderText" : "tagstring",
	        "readOnly" : { "type" : "readOnly", "oppositeOf" : "enabled", "tags":{"scope":"private"}}, 
	        "size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
	        "showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}]},
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "values" :["form-control", "input-sm", "svy-padding-xs", "select2-container-svy-xs"]}, 
	        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
	        "toolTipText" : { "type" : "tagstring" }, 
	        "valuelistID" : { "type" : "valuelist", "tags": { "logWhenOverMax":true}, "for": "dataProviderID", "max":500}, 
	       "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}},
			"appendToBody" : {"type" :"boolean",  "default" : true}
	},
	"handlers":
	{
	        "onActionMethodID" : {
	         	
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        }, 
	        "onDataChangeMethodID" : {
	          "returns": "boolean", 
	         	
	        	"parameters":[
								{
						          "name":"oldValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"newValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ],
		    "code": "return true",
			"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)"				 
	        }, 
	        "onFocusGainedMethodID" : {
	         	
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        }, 
	        "onFocusLostMethodID" : {
	         	
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        }, 
	        "onRightClickMethodID" : {
	         	
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        } 
	},
	"api":
	{
	        "requestFocus": {
				"parameters":[
								{                                                                 
 								"name":"mustExecuteOnFocusGainedMethod",
								"type":"boolean",
			            		"optional":true
			            		}             
							 ],
				"delayUntilFormLoads": true,
			"discardPreviouslyQueuedSimilarCalls": true

	        }
	}
	 
}