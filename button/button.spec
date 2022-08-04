{
	"name": "bootstrapcomponents-button",
	"displayName": "Button",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/button/button.png",
	"definition": "bootstrapcomponents/button/button.js",
	"libraries": [{"name":"bootstrapcomponents-button-css", "version":"1.0", "url":"bootstrapcomponents/button/button.css", "mimetype":"text/css"}],
	"keywords": ["press", "push"],
	"styleVariantsCategory": "button",
	"model":
	{
		"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    "imageStyleClass" : { "type" :"styleclass" ,"tags": { "doc" :"For buttons showing as plain text, you can also specify an image styleclass to be displayed to the left. Can be font awesome icons."}},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" },"default": "btn btn-default", "values" :["btn","btn-default","btn-lg","btn-sm","btn-xs"]},
	    "text" : {"type":"tagstring" , "initialValue":"Button", "tags": { "directEdit" : "true" }},
	    "size" : {"type" :"dimension",  "default" : {"width":80, "height":30}}, 
        "showAs": { "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}],"tags": { "doc" :"Option whether button text is shown as plain text, sanitized html or trusted html (as is)."}},
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
			"requestFocus": {
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	        }
	}

}
