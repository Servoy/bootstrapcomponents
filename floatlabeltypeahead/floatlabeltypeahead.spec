{
	"name": "bootstrapcomponents-floatlabeltypeahead",
	"displayName": "FloatLabel Type Ahead",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/floatlabeltypeahead/typeahead.png",
	"doc": "bootstrapcomponents/typeahead/typeahead_doc.js",
	"keywords": ["suggestion", "auto complete"],
	"model":
	{
	    "dataProviderID" : { "type":"dataprovider","pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	    "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	    "format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
		"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"private"} },
		"editable" : { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProviderID","onDataChangeMethodID"] },
		"findmode" : { "type":"findmode", "tags":{"scope":"private"}},
		"size" : {"type" :"dimension",  "default" : {"width":140, "height":50}},
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "default" : "form-control"},
	    "floatLabelText" : "tagstring",
        "valuelistID" : { "type" : "valuelist", "tags": {  "logWhenOverMax": false}, "for": "dataProviderID", "default":"autoVL", "pushToServer": "allow", "max":100},
        "showAs": { "type": "string", "values": ["html", "text"], "default" : "html", "tags": { "scope" :"design","doc" :"Option typeahead options are shown as plain text or sanitized html." }},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	    "toolTipText" : { "type" : "tagstring"},
	   "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}},
	    "selectOnEnter" : {"type" :"boolean", "tags": { "scope" :"design" }},
		"appendToBody" : {"type" :"boolean",  "default" : true},
		"filteringDebounce" : {"type" :"int",  "default" : 500}
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
