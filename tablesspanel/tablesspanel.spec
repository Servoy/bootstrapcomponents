{
	"name": "bootstrapcomponents-tablesspanel",
	"displayName": "Tabless Panel",
	"categoryName": "Form Containers",
	"version": 1,
	"icon": "bootstrapcomponents/tabpanel/tab.png",
	"definition": "bootstrapcomponents/tablesspanel/tablesspanel.js",
	"libraries": [{"name":"bootstrapcomponents-tablesspanel-css", "version":"1.0", "url":"bootstrapcomponents/tablesspanel/tablesspanel.css", "mimetype":"text/css"}],
	"keywords": ["container"],
	"deprecated": "This component will be replaced with formcontainer from the Servoy Core package in the 2021.06 version of Servoy.",
	"replacement": "servoycore-formcontainer",
	"model":
	{
			"containedForm": { "type" :"form"},
			"relationName": "relation",
			"waitForData" : { "type" :"boolean", "default":true, "tags": { "doc": "When <code>true</code>, the form is rendered when all its latest data is loaded from the server. When <code>false</code>, the form is rendered faster, but could show stale data (not a problem when the form shown does not show dynamic data)" }},
			"styleClass" : { "type" :"styleclass", "tags": { "doc": "Set the styleclasses that should be applied at to this component" } },
			"height" : {"type":"int", "default":0, "tags": { "doc" : "Minimum height of the tabless panel, should be used for responsive forms."}},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design","doc" : "Tab sequence number of form containers is used for all nested components in the main form." }},
	    "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
	},
	"handlers":
	{
	},
	"api":
	{
	}
}
