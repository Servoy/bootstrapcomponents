{
	"name": "bootstrapcomponents-choicegroup",
	"displayName": "Choice Group",
	"categoryName": "Input Control",
	"version": 1,
	"definition": "bootstrapcomponents/choicegroup/choicegroup.js",
	"doc": "bootstrapcomponents/choicegroup/choicegroup_doc.js",
	"libraries": [{"name":"bootstrapcomponents-choicegroup-css", "version":"1.0", "url":"bootstrapcomponents/choicegroup/choicegroup.css", "mimetype":"text/css"}],
	"icon": "bootstrapcomponents/choicegroup/radiobutton.png",
	"keywords": ["select", "multiple", "options", "choices"],
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	        "readOnly" : { "type": "protected", "blockingOn": true, "default": false, "for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"private"} },
	        "inputType" : {"type" : "string" , "default" : "checkbox" ,"tags": { "scope" :"design" }, "values" : ["checkbox","radio"]},
	        "size" : {"type" :"dimension",  "default" : {"width":140, "height":80}},
	        "showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}],"tags": { "doc" :"Option whether choice text is shown as plain text, sanitized html or trusted html (as is)."}},
	        "styleClass" : { "type" :"styleclass", "default" : "checkbox" , "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "values" :["checkbox", "radio"]},
	        "valuelistID" : { "type" : "valuelist", "max":300},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"},
			"findmode" : { "type":"findmode", "tags":{"scope":"private"}, "for" : {"editable":true}}, 
	       "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}},
	        "alignment": {"type": "string", "default": "vertical", "tags": {"scope": "design"}, "values" : ["vertical","horizontal"]}
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
