{
	"name": "bootstrapcomponents-select",
	"displayName": "Native Select",
	"categoryName": "Mobile",
	"version": 1,
	"icon": "bootstrapcomponents/select/combobox.png",
	"definition": "bootstrapcomponents/select/select.js",
	"libraries": [{"name":"bootstrapcomponents-select-css", "version":"1.0", "url":"bootstrapcomponents/select/select.css", "mimetype":"text/css"}],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider","pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	       	"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
	       	"size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
	       	"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default" : "form-control"},
	        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID", "max":500},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"},
	        "visible" : "visible",
	        "placeholderText" : { "type" : "tagstring", "displayTagsPropertyName" : "displaysTags" },
			"selectSize" : {"type" :"int", "default": 1, "tags": { "scope" :"design" }},
			"multiselect" : { "type" : "boolean", "tags": { "scope" : "design" }, "default": false }
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
