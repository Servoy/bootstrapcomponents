{
	"name": "bootstrapcomponents-checkbox",
	"displayName": "CheckBox",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/checkbox/checkbox.png",
	"definition": "bootstrapcomponents/checkbox/checkbox.js",
	"libraries": [{"name":"bootstrapcomponents-checkbox-css", "version":"1.0", "url":"bootstrapcomponents/checkbox/checkbox.css", "mimetype":"text/css"}],
	"keywords": ["verify"],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	        "readOnly" : { "type": "protected", "blockingOn": true, "default": false, "for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
	        "size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default":"checkbox"},
	        "text" : { "type" : "tagstring" ,"default": "Checkbox" },
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"selectedValue" : { "type" : "string", "tags": { "doc" :"The value returned when the checkbox is checked (default is 1)" } },
			"showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}],"tags": { "doc" :"Option whether checkbox text is shown as plain text, sanitized html or trusted html (as is)."}},
			"toolTipText" : { "type" : "tagstring"}, 
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
