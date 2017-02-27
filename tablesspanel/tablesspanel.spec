{
	"name": "bootstrapcomponents-tablesspanel",
	"displayName": "Tabless Panel",
	"version": 1,
	"icon": "servoydefault/tabpanel/tabs.gif",
	"definition": "bootstrapcomponents/tablesspanel/tablesspanel.js",
	"libraries": [{"name":"bootstrapcomponents-tablesspanel-css", "version":"1.0", "url":"bootstrapcomponents/tablesspanel/tablesspanel.css", "mimetype":"text/css"}],
	"model":
	{
			"containedForm": { "type" :"form"},
			"relationName": "relation",
			"waitForData" : "boolean",
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
