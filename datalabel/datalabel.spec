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
			"dataProviderID" : { "type":"dataprovider", "tags": { "scope": "design", "doc":"The column or variable to provide the data for this label."}, "resolveValuelist" : true },
			"valuelistID" : { "type" : "valuelist",  "for": "dataProviderID", "max":1, "tags": { "doc":"The value list which is used to get a display value for the actual columns real value like id -> name"}},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"],"tags": {"doc": "Whether the component is enabled or not; blocks onAction, onDoubleClick, onRightClick events."} },
			"format" : {"for":["valuelistID","dataProviderID"] , "type" :"format", "tags": { "doc":"A format to format the data shown"}},
			"size" : {"type" :"dimension",  "default" : {"width":80, "height":30}, "tags": { "doc":"Deprecated"}}, 
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design","doc":"CSS style class for this component"}, "default": "default-align", "values" :["label","label-default","label-primary","label-success","label-info","label-warning","label-danger"]},
            "styleClassExpression" : { "type" :"dataprovider", "tags": { "scope" :"design","doc":"A column or calculation that provides the CSS style class for this component" }}, 
            "imageStyleClass": {"type":"string", "tags": { "doc": "An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. "}},
            "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design","doc":"Tab sequence index of the form" }},
            "showAs": { "type": "string", "values": ["html", "text", "trusted_html"], "default" : "html", "tags": { "scope" :"design","doc" :"Option whether label text (coming from dataprovider) is shown as plain text, sanitized html or trusted html (as is). Inner html elements events can be identified using data-target attribute." }},
	    	"toolTipText" : { "type" : "tagstring", "tags": { "doc":"Tooltip text shown when hovering over the component (i18n is supported)"}},
	    	"visible" : {"type" : "visible", "tags": {"doc": "Whether the label is visible or not"}}
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
