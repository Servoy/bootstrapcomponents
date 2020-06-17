{
	"name": "bootstrapcomponents-combobox",
	"displayName": "Combobox ",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/combobox/combobox.png",
	"definition": "bootstrapcomponents/combobox/combobox.js",
	"libraries": [
		{"name":"bootstrapcomponents-combobox-css", "version":"1.0", "url":"bootstrapcomponents/combobox/combobox.css", "mimetype":"text/css"},
		{"name":"ui-select", "version":"0.8.1", "url":"bootstrapcomponents/combobox/lib/select.js", "mimetype":"text/javascript"},
		{"name":"ui-select", "version":"0.8.0", "url":"bootstrapcomponents/combobox/lib/select.css", "mimetype":"text/css"}
	],
	"keywords": [],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope": "design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}, "displayTagsPropertyName" : "displaysTags"}, 
	        "displaysTags" : { "type" : "boolean", "tags": { "scope" : "design" } }, 
	        "editable" : {"type":"boolean", "default":true}, 
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID","onFocusGainedMethodID","onFocusLostMethodID","onRightClickMethodID"] }, 
	        "findmode" : { "type":"findmode", "tags":{"scope":"private"}, "for" : {"editable":true}}, 
	        "format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
	        "readOnly" : { "type" : "readOnly", "oppositeOf" : "enabled"}, 
	        "size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
	        "showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}]},
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["form-control", "input-sm", "svy-padding-xs", "select2-container-svy-xs"]}, 
	        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
	        "toolTipText" : { "type" : "tagstring", "displayTagsPropertyName" : "displaysTags" }, 
	        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design", "logWhenOverMax":true}, "for": "dataProviderID", "max":500}, 
	        "visible" : "visible" 
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
							 ]
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