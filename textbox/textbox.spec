{
	"name": "bootstrapcomponents-textbox",
	"displayName": "TextBox",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/textbox/textfield.png",
	"definition": "bootstrapcomponents/textbox/textbox.js",
	"doc": "bootstrapcomponents/textbox/textbox_doc.js",
	"serverscript": "bootstrapcomponents/textbox/textbox_server.js",
	"libraries": [{"name":"bootstrapcomponents-textbox-css", "version":"1.0", "url":"bootstrapcomponents/textbox/textbox.css", "mimetype":"text/css"}],
	"keywords": ["content"],
	"model":
	{
			"dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID","callback":"onDataChangeCallback"}},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID","onFocusGainedMethodID","onFocusLostMethodID","onRightClickMethodID"] },
			"format" : {"for":["dataProviderID"] , "type" :"format"}, 
			"inputType" : {"type":"string" , "pushToServer": "allow", "tags": { "scope" :"design", "valuesFieldType":"typeahead" }, "default" : "text",  "values" :["text", "password", "password-with-eye", "email", "tel", "date", "time", "datetime-local", "month", "week", "number", "color","search", "url"]},			
			"readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"private"} },
			"editable" : { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProviderID","onDataChangeMethodID"] },
			"findmode" : { "type":"findmode", "tags":{"scope":"private"}},
			"placeholderText" : "tagstring",
			"size" : {"type" :"dimension",  "default" : {"width":140, "height":30}},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "default": "form-control", "values" :["form-control", "input-sm"]},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"},
	    "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}},	    
	    	"selectOnEnter" : {"type" :"boolean", "tags": { "scope" :"design" }},
	    	"autocomplete" : 
	    		{"type" :"string","tags": { "scope" :"design", "valuesFieldType":"typeahead", "doc" : "Html autocomplete property of the input field."}, "default": "off",
	    			"values" :
	    			[ 
	    				"billing", "shipping", "home", "work", "mobile", "fax", "pager", "name", "given-name", "additional-name", "family-name","nickname", "organization-title", "username", "new-password" , "current-password", "organization", "email", "street-address", "address-level1", 
	    				"address-level2", "address-level3", "address-level4", "country", "country-name", "postal-code", "cc-name", "cc-given-name", "cc-additional-name", "cc-family-name", "cc-number", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-csc", "cc-type", 
	    				"transaction-currency", "transaction-amount", "language", "bday", "bday-day", "bday-month", "bday-year", "sex", "url", "tel", "tel-country-code",  "tel-national","tel-area-code", "tel-local"
	    		    ]
	    	    }
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
