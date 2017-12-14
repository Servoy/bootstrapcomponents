{
	"name": "bootstrapcomponents-select",
	"displayName": "Combobox",
	"version": 1,
	"icon": "bootstrapcomponents/select/combobox.png",
	"definition": "bootstrapcomponents/select/select.js",
	"libraries": [{"name":"bootstrapcomponents-select-css", "version":"1.0", "url":"bootstrapcomponents/select/select.css", "mimetype":"text/css"}],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider","pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	       	"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
	       	"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default" : "form-control"},
	        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID", "max":500},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
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
