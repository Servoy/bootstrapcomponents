{
	"name": "bootstrapcomponents-list",
	"displayName": "Data List",
	"version": 1,
	"icon": "bootstrapcomponents/list/listbox.png",
	"definition": "bootstrapcomponents/list/list.js",
	"libraries": [
		{"name":"bootstrapcomponents-list-css", "version":"1.0", "url":"bootstrapcomponents/list/list.css", "mimetype":"text/css"},
		{"name":"purejs-datalist-polyfill-js", "version":"1.0", "url":"bootstrapcomponents/list/lib/purejs-datalist-polyfill/datalist.polyfill.js", "mimetype":"text/javascript"},
		{"name":"purejs-datalist-polyfill-css", "version":"1.0", "url":"bootstrapcomponents/list/lib/purejs-datalist-polyfill/style.css", "mimetype":"text/css"}
		],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider","pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	       	"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
					"editable" : { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProviderID","onDataChangeMethodID"] },
	       	"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default" : "form-control"},
	        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID"},
	        "placeholderText" : "tagstring",
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
