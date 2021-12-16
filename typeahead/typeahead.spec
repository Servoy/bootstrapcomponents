{
	"name": "bootstrapcomponents-typeahead",
	"displayName": "Type Ahead ",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/typeahead/typeahead.png",
	"definition": "bootstrapcomponents/typeahead/typeahead.js",
	"libraries": [{"name":"bootstrapcomponents-typeahead-css", "version":"1.0", "url":"bootstrapcomponents/typeahead/typeahead.css", "mimetype":"text/css"}],
	"keywords": ["suggestion", "auto complete"],
	"model":
	{
	    "dataProviderID" : { "type":"dataprovider","pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	    "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	    "format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
		"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
		"editable" : { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProviderID","onDataChangeMethodID"] },
		"size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default" : "form-control"},
	    "placeholderText" : "tagstring",
        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design", "logWhenOverMax": false}, "for": "dataProviderID", "default":"autoVL", "pushToServer": "allow", "max":100},
        "showAs": { "type": "string", "values": ["html", "text"], "default" : "html", "tags": { "scope" :"design","doc" :"Option typeahead options are shown as plain text or sanitized html." }},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	    "toolTipText" : { "type" : "tagstring"},
	    "visible" : "visible",
	    "selectOnEnter" : {"type" :"boolean", "tags": { "scope" :"design" }},
		"appendToBody" : {"type" :"boolean",  "default" : true},
		"filteringDebounce" : {"type" :"int",  "default" : 500},
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
