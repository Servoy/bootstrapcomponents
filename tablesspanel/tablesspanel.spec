{
	"name": "bootstrapcomponents-tablesspanel",
	"displayName": "Tabless Panel",
	"categoryName": "Form Containers",
	"version": 1,
	"icon": "bootstrapcomponents/tabpanel/tab.png",
	"definition": "bootstrapcomponents/tablesspanel/tablesspanel.js",
	"libraries": [{"name":"bootstrapcomponents-tablesspanel-css", "version":"1.0", "url":"bootstrapcomponents/tablesspanel/tablesspanel.css", "mimetype":"text/css"}],
	"keywords": ["container"],
	"model":
	{
			"animation" : {"type" : "string", "values": [{"NONE": "none"},{"SLIDE-TOP": "slide-top"},{"SLIDE-BOTTOM": "slide-bottom"},{"SLIDE-LEFT": "slide-left"},{"SLIDE-RIGHT": "slide-right"}], "default": "none"},
			"containedForm": { "type" :"form"},
			"relationName": "relation",
			"waitForData" : { "type" :"boolean", "default":true, "tags": { "doc": "When <code>true</code>, the form is rendered when all its latest data is loaded from the server. When <code>false</code>, the form is rendered faster, but could show stale data (not a problem when the form shown does not show dynamic data)" }},
			"styleClass" : { "type" :"styleclass"},
			"height" : {"type":"int", "default":0, "tags": { "doc" : "Minimum height of the tabless panel, should be used for responsive forms."}},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design","doc" : "Tab sequence number of form containers is used for all nested components in the main form." }},
	    	"visible" : "visible"
	},
	"handlers":
	{
	},
	"api":
	{
	}
}
