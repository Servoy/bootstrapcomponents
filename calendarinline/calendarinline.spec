{
	"name": "bootstrapcomponents-calendarinline",
	"displayName": "Calendar Inline",
	"categoryName": "Input Control",
	"version": 1,
	"definition": "bootstrapcomponents/calendarinline/calendarinline.js",
	"icon": "bootstrapcomponents/calendar/calendar.png",
	"libraries": [{"name":"moment", "version":"2.29.3", "url": "bootstrapcomponents/calendar/bootstrap-datetimepicker/js/moment-with-locales.min.js", "mimetype":"text/javascript"},{"name":"moment-jdateformatparser", "version":"0.1.1", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/js/moment-jdateformatparser.js", "mimetype":"text/javascript"},{"name":"bootstrap-datetimepicker", "version":"4.7.47", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js", "mimetype":"text/javascript"},{"name":"bootstrap-datetimepicker", "version":"4.7.47", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css", "mimetype":"text/css"},
	{"name":"bootstrap-datetimepicker-servoy-extension", "version":"1.0", "url":"bootstrapcomponents/calendar/bootstrap-datetimepicker/css/bootstrap-datetimepicker-servoy-extension.css", "mimetype":"text/css"},
	{"name":"bootstrapcomponents-calendar-css", "version":"1.0", "url":"bootstrapcomponents/calendar/calendar.css", "mimetype":"text/css"}
	],
	"keywords": ["agenda", "diary", "day", "month", "year"],
	"model":
	{
		"calendarWeeks" : {"type" :"boolean", "pushToServer": "shallow", "default": true, "tags": { "scope" :"design" }},
	    "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	    "format" : {"for":["dataProviderID"] , "type" :"format", "tags": {"doc": "This format is just used to be able to configure 'use as LocalDateTime'"} },
	    "disabledDates" : {"type":"date[]", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "disabledDays" : {"type":"int[]", "pushToServer": "shallow","tags": { "scope" :"private" }},	    
	    "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	    "maxDate" : {"type":"date", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "minDate" : {"type":"date", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }},
	    "size" : {"type" :"dimension",  "default" : {"width":250, "height":280}},
	    "toolTipText" : { "type" : "tagstring"}, 
	    "visible" : "visible"
	},
	"handlers":
	{
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
	        }
	},
	"api":
	{
	        "disableDates": {
				"parameters":[
						{                                                                 
						"name":"dateArray",
						"type":"date[]"
						}             
				]
            }, 
            "disableDays": {
				"parameters":[
						{                                                                 
						"name":"dayArray",
						"type":"int[]"
						}             
				]
            },
            "setMinMaxDate": {
				"parameters":[
						{                                                                 
                            "name":"minDate",
                            "type":"date"
                        },
                        {                                                                 
                            "name":"maxDate",
                            "type":"date"
						}              
				]
	        }
	}

}