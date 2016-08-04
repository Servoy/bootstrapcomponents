{
	"name": "bootstrapcomponents-table",
	"displayName": "Table",
	"version": 1,
	"icon": "servoycore/portal/portal.gif",
	"definition": "bootstrapcomponents/table/table.js",
	"libraries": [{"name":"bootstrapcomponents-table-css", "version":"1.0", "url":"bootstrapcomponents/table/table.css", "mimetype":"text/css"}],
	"model":
	{
		"columns":  { "type":"column[]", "droppable": true },
		"currentPage":  { "type":"int", "default" : 1, "tags": { "scope": "runtime" } },
		"foundset": { "type": "foundset", "pushToServer": "allow" },
		"pageSize" : { "type":"int", "default" : 20},
		"styleClass" : { "type": "styleclass", "tags": { "scope": "design" }, "default": "table", "values": ["table", "table-striped", "table-bordered", "table-hover", "table-condensed"] },
		"selectionClass" : { "type": "styleclass", "default": "table-bootstrapcomponent-selected "},
		"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	 	"visible" : "visible"
	},
	"types":
	{
		"column":
		{
			"dataprovider": {	"type": "dataprovider",	"forFoundset": "foundset" },
			"format" : {"for":["valuelist","dataprovider"] , "type" :"format"},
			"headerStyleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }}, 
			"headerText": {"type" :"string", "initialValue" : "header", "tags": { "showInOutlineView" :true }},
			"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }},
			"valuelist" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataprovider"}
		}
	},
	"handlers":
	{
		"onCellClick" : {
			"description": "Called when the mouse is clicked on a row/cell (row and column are given) or\nwhen the ENTER key is used then only the selected row is given",
        	"parameters":[
				{
					"name":"row",
					"type":"int"
				},
				{
					"name":"column",
					"type":"int",
					"optional":true
				}
			]
	},
		"onHeaderClick" : {
	        	"parameters":[
					{
						"name":"column",
						"type":"int"
					}
				]
		}
	}
}
