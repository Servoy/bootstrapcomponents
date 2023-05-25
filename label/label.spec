{
	"name": "bootstrapcomponents-label",
	"displayName": "Label",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/label/label.png",
	"definition": "bootstrapcomponents/label/label.js",
	"libraries": [{"name":"bootstrapcomponents-label-css", "version":"1.0", "url":"bootstrapcomponents/label/label.css", "mimetype":"text/css"}],
	"keywords": ["tag"],
	"styleVariantCategory": "label",
	"model":
	{
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    	"labelFor" : { "type" : "labelfor", "tags": { "scope" :"design","doc" :"Name of an input field - 'for' html attribute will be filled in." } },
	    	"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "default": "default-align", "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
	    	"styleClassExpression" : { "type" :"dataprovider", "tags": { "scope" :"design" }},
	    	"variant" : { "type" :"variant", "tags": { "scope" :"design", "doc": "Sets the variant of this button, this sets a certain set of styleclasses at runtime for which this variant is configured for" }},
	    	"imageStyleClass": {"type":"string", "tags": { "doc": "An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. "}},
            "text" : {"type":"tagstring" , "initialValue":"Label", "tags": { "directEdit" : "true" }},
            "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
            "showAs": { "type": "string", "values": ["html", "text", "trusted_html"], "default" : "html", "tags": { "scope" :"design","doc" :"Option whether label text is shown as plain text, sanitized html or trusted html (as is). Inner html elements events can be identified using data-target attribute." }},
	    	"toolTipText" : { "type" : "tagstring"},
	    "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
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
