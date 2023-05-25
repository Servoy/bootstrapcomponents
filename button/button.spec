{
	"name": "bootstrapcomponents-button",
	"displayName": "Button",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/button/button.png",
	"definition": "bootstrapcomponents/button/button.js",
	"doc": "bootstrapcomponents/button/button_doc.js",
	"libraries": [{"name":"bootstrapcomponents-button-css", "version":"1.0", "url":"bootstrapcomponents/button/button.css", "mimetype":"text/css"}],
	"keywords": ["press", "push"],
	"styleVariantCategory": "button",
	"model":
	{
		"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"], "tags": {"doc": "Whether the component is enabled or not; blocks onAction, onDoubleClick, onRightClick events."} },
	    "imageStyleClass" : { "type" :"styleclass" ,"tags": { "doc" :"For buttons showing as plain text, you can also specify an image styleclass to be displayed to the left. Can be font awesome icons."}},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design", "doc":"Tab sequence index of the form" }}, 
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Button style class, typically one of the bootstrap button classes (e.g. 'btn btn-primary')" },"default": "btn btn-default", "values" :["btn","btn-default","btn-lg","btn-sm","btn-xs"]},
	    "variant" : { "type" :"variant", "tags": { "scope" :"design", "doc": "Sets the variant of this button, this sets a certain set of styleclasses at runtime for which this variant is configured for" }},
	    "text" : {"type":"tagstring" , "initialValue":"Button", "tags": { "directEdit" : "true", "doc": "The text shown for the button (i18n is supported)" }},
	    "size" : {"type" :"dimension",  "default" : {"width":80, "height":30}}, 
        "showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}],"tags": { "doc" :"Option whether button text is shown as plain text, sanitized html or trusted html (as is)."}},
	    "toolTipText" : { "type" : "tagstring", "tags": {"doc": "Tooltip text shown when hovering over the button (i18n is supported)"}}, 
	    "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
	},
	"handlers":
	{
	       "onActionMethodID" : {
                "doc": "Fired when the button is clicked",
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
	        "onDoubleClickMethodID" : {
                "doc": "Fired when the button is double clicked",
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
	        "onRightClickMethodID" : {
                "doc": "Fired when the button is right clicked",
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
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	        }
	}

}
