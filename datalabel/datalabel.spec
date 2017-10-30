{
	"name": "bootstrapcomponents-datalabel",
	"displayName": "DataLabel",
	"version": 1,
	"icon": "bootstrapcomponents/datalabel/datalabel.png",
	"definition": "bootstrapcomponents/datalabel/datalabel.js",
	"libraries": [{"name":"bootstrapcomponents-datalabel-css", "version":"1.0", "url":"bootstrapcomponents/datalabel/datalabel.css", "mimetype":"text/css"}],
	"model":
	{
			"dataProviderID" : { "type":"dataprovider", "tags": { "scope": "design" }}, 
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
			"format" : {"for":["dataProviderID"] , "type" :"format"},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
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
	        "onDoubleClickMethodID" : {

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

	}

}
