{
	"name": "bootstrapcomponents-progressbar",
	"displayName": "Progress Bar",
	"version": 1,
	"definition": "bootstrapcomponents/progressbar/progressbar.js",
	"deprecated": "true",
	"replacement": "bootstrapextracomponents-progressbar",
	"libraries": [{"name":"bootstrapcomponents-progressbar-css", "version":"1.0", "url":"bootstrapcomponents/progressbar/progressbar.css", "mimetype":"text/css"}],
	"icon": "bootstrapcomponents/progressbar/progress_bar.png",
	"model":
	{
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "default" : "progress-striped" , "values" :["progress-striped", "progress-striped active"]},
			"value": "float",
			"type": {"type": "string", "default":"info","values":["info", "success", "warning", "danger"]},
			"animate": {"type":"boolean", "default":true},
			"showValue" : {"type":"boolean", "default":true},
			"max" : {"type":"int", "default":100},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"},
	    "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
	},
	"handlers":
	{

	},
	"api":
	{

	}

}
