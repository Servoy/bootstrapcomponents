{
	"name": "bootstrapcomponents-checkbox",
	"displayName": "CheckBox",
	"version": 1,
	"icon": "bootstrapcomponents/checkbox/checkbox.png",
	"definition": "bootstrapcomponents/checkbox/checkbox.js",
	"libraries": [{"name":"bootstrapcomponents-checkbox-css", "version":"1.0", "url":"bootstrapcomponents/checkbox/checkbox.css", "mimetype":"text/css"}],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	        "readOnly" : { "type": "protected", "blockingOn": true, "default": false, "for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default":"checkbox"},
	        "text" : { "type" : "tagstring" ,"default": "Checkbox" },
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"selectedValue" : { "type" : "string" },
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
				"code": "return true"
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
