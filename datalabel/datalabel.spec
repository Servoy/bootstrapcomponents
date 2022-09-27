{
	"name": "bootstrapcomponents-datalabel",
	"displayName": "DataLabel",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/datalabel/datalabel.png",
	"definition": "bootstrapcomponents/datalabel/datalabel.js",
	"libraries": [{"name":"bootstrapcomponents-datalabel-css", "version":"1.0", "url":"bootstrapcomponents/datalabel/datalabel.css", "mimetype":"text/css"}],
	"keywords": ["tag"], 
	"model":
	{
			"dataProviderID" : { "type":"dataprovider", "tags": { "scope": "design"}, "resolveValuelist" : true },
			"valuelistID" : { "type" : "valuelist",  "for": "dataProviderID", "max":1},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
			"format" : {"for":["valuelistID","dataProviderID"] , "type" :"format"},
			"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}}, 
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default": "default-align", "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
            "styleClassExpression" : { "type" :"dataprovider", "tags": { "scope" :"design" }}, 
            "imageStyleClass": {"type":"string", "tags": { "doc": "An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. "}},
            "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
            "showAs": { "type": "string", "values": ["html", "text", "trusted_html"], "default" : "html", "tags": { "scope" :"design","doc" :"Option whether label text (coming from dataprovider) is shown as plain text, sanitized html or trusted html (as is). Inner html elements events can be identified using data-target attribute." }},
	    	"toolTipText" : { "type" : "tagstring"},
	    	"visible" : "visible"
	},
	"handlers":
	{
	        "onActionMethodID" : {
                "doc": "Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)",
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
                "doc": "DoubleClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)",
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
                "doc": "RightClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)",
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
