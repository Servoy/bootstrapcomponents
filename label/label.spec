{
	"name": "bootstrapcomponents-label",
	"displayName": "Label",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/label/label.png",
	"definition": "bootstrapcomponents/label/label.js",
	"libraries": [{"name":"bootstrapcomponents-label-css", "version":"1.0", "url":"bootstrapcomponents/label/label.css", "mimetype":"text/css"}],
	"model":
	{
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    	"labelFor" : { "type" : "labelfor", "tags": { "scope" :"design" } },
	    	"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
	    	"imageStyleClass": {"type":"styleclass", "default": "fa", "values":["fa", "far", "fas"]},
	    	"text" : {"type":"tagstring" , "initialValue":"Label", "tags": { "directEdit" : "true" }},
            "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
            "showAs": { "type": "string", "values": ["html", "text", "trusted_html"], "default" : "html", "tags": { "scope" :"design" }},
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
								}, {
						          "name":"dataTarget",
								  "type":"string"
								}
							 ]
	        },
	        "onDoubleClickMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}, {
						          "name":"dataTarget",
								  "type":"string"
								}
							 ]
	        },
	        "onRightClickMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}, {
						          "name":"dataTarget",
								  "type":"string"
								}
							 ]
	        }
	},
	"api":
	{

	}

}
