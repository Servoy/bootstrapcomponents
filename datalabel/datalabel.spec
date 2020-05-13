{
	"name": "bootstrapcomponents-datalabel",
	"displayName": "DataLabel",
	"categoryName": "Text & Buttons",
	"version": 1,
	"icon": "bootstrapcomponents/datalabel/datalabel.png",
	"definition": "bootstrapcomponents/datalabel/datalabel.js",
	"libraries": [{"name":"bootstrapcomponents-datalabel-css", "version":"1.0", "url":"bootstrapcomponents/datalabel/datalabel.css", "mimetype":"text/css"}],
	"model":
	{
			"dataProviderID" : { "type":"dataprovider", "tags": { "scope": "design"}, "resolveValuelist" : true },
			"valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID", "max":1},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
			"format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
			"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}}, 
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
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
