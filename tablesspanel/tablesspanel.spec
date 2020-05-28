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
			"containedForm": { "type" :"form"},
			"relationName": "relation",
			"waitForData" : { "type" :"boolean", "default":true, "tags": { "doc": "When <code>true</code>, the form is rendered when all its latest data is loaded from the server. When <code>false</code>, the form is rendered faster, but could show stale data (not a problem when the form shown does not show dynamic data)" }},
			"styleClass" : { "type" :"styleclass"},
			"height" : {"type":"int", "default":0},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	    	"visible" : "visible"
	},
	"handlers":
	{
	},
	"api":
	{
	}
}
