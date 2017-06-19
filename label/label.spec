{
	"name": "bootstrapcomponents-label",
	"displayName": "Label",
	"version": 1,
	"icon": "servoydefault/label/label.png",
	"definition": "bootstrapcomponents/label/label.js",
	"libraries": [{"name":"bootstrapcomponents-label-css", "version":"1.0", "url":"bootstrapcomponents/label/label.css", "mimetype":"text/css"}],
	"model":
	{
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    	"labelFor" : { "type" : "labelfor", "tags": { "scope" :"design" } },
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
	    	"text" : {"type":"tagstring" , "initialValue":"Label", "tags": { "directEdit" : "true" }},
	    	"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
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
