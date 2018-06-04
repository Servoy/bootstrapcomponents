{
	"name": "bootstrapcomponents-textbox",
	"displayName": "TextBox",
	"version": 1,
	"icon": "bootstrapcomponents/textbox/textfield.png",
	"definition": "bootstrapcomponents/textbox/textbox.js",
	"serverscript": "bootstrapcomponents/textbox/textbox_server.js",
	"libraries": [{"name":"bootstrapcomponents-textbox-css", "version":"1.0", "url":"bootstrapcomponents/textbox/textbox.css", "mimetype":"text/css"}],
	"model":
	{
			"dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID","onFocusGainedMethodID","onFocusLostMethodID","onRightClickMethodID"] },
			"format" : {"for":["dataProviderID"] , "type" :"format"}, 
			"inputType" : {"type":"string" , "pushToServer": "allow", "tags": { "scope" :"design" }, "default" : "text",  "values" :["text", "password", "email", "tel", "date", "time", "datetime-local", "month", "week", "number", "color"]},
			"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
			"editable" : { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProviderID","onDataChangeMethodID"] },
			"placeholderText" : "tagstring",
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default": "form-control", "values" :["form-control", "input-sm"]},
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
	    },
	    "setInputType": {
	    	"parameters":[
						 	{
								"name":"inputType",
					 			"type":"string"
							}
						],
			"returns" : "boolean"
	   }
	}

}
