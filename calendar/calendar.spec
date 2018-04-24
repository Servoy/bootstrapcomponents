{
	"name": "bootstrapcomponents-calendar",
	"displayName": "Calendar",
	"version": 1,
	"icon": "bootstrapcomponents/calendar/calendar.png",
	"definition": "bootstrapcomponents/calendar/calendar.js",
	"libraries": [{"name":"moment", "version":"2.19.1", "url": "bootstrapcomponents/calendar/bootstrap-datetimepicker/js/moment-with-locales.min.js", "mimetype":"text/javascript"},{"name":"moment-jdateformatparser", "version":"0.1.1", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/js/moment-jdateformatparser.js", "mimetype":"text/javascript"},{"name":"bootstrap-datetimepicker", "version":"4.7.47", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js", "mimetype":"text/javascript"},{"name":"bootstrap-datetimepicker", "version":"4.7.47", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css", "mimetype":"text/css"},
	{"name":"bootstrap-datetimepicker-servoy-extension", "version":"1.0", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/css/bootstrap-datetimepicker-servoy-extension.css", "mimetype":"text/css"},
	{"name":"bootstrapcomponents-calendar-css", "version":"1.0", "url":"bootstrapcomponents/calendar/calendar.css", "mimetype":"text/css"}
	],
	"model":
	{
	    "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	    "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	     "findmode" : { "type":"findmode", "tags":{"scope":"private"}}, 
	    "format" : {"for":["dataProviderID"] , "type" :"format"},
	    "readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"] },
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default" : "form-control"},
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
