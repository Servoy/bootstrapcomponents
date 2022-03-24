{
	"name": "bootstrapcomponents-label",
	"displayName": "Label",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/label/label.png",
	"definition": "bootstrapcomponents/label/label.js",
	"libraries": [{"name":"bootstrapcomponents-label-css", "version":"1.0", "url":"bootstrapcomponents/label/label.css", "mimetype":"text/css"}],
	"styleVariantCategory": "label",
	"keywords": ["tag"],
	"model":
	{
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    	"labelFor" : { "type" : "labelfor", "tags": { "scope" :"design","doc" :"Name of an input field - 'for' html attribute will be filled in." } },
	    	"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default": "default-align", "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
	    	"styleClassExpression" : { "type" :"dataprovider", "tags": { "scope" :"design" }},
	    	"imageStyleClass": {"type":"string", "tags": { "doc": "An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. "}},
            "text" : {"type":"tagstring" , "initialValue":"Label", "tags": { "directEdit" : "true" }},
            "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
            "showAs": { "type": "string", "values": ["html", "text", "trusted_html"], "default" : "html", "tags": { "scope" :"design","doc" :"Option whether label text is shown as plain text, sanitized html or trusted html (as is)." }},
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
