{
	
	"name": "bootstrapcomponents-tabpanel",
	"displayName": "TabPanel",
	"version": 1,
	"icon": "bootstrapcomponents/tabpanel/tab.png",
	"definition": "bootstrapcomponents/tabpanel/tabpanel.js",
	"libraries": [{ "name": "bootstrapcomponents-tabpanel-css", "version": "1.0", "url": "bootstrapcomponents/tabpanel/tabpanel.css", "mimetype": "text/css" }],
	"serverscript": "bootstrapcomponents/tabpanel/tabpanel_server.js",
	
	"model": {
		"containerStyleClass": { "type": "styleclass" },
		"tabs": { "type": "tab[]", "pushToServer": "allow", "droppable": true },
		"styleClass": { "type": "styleclass" },
		"height": { "type": "int", "default": "500" },
		"tabIndex": { "type": "int", "pushToServer": "shallow", "tags": { "scope": "runtime" }, "default": 1 },
		"tabSeq": { "type": "tabseq", "tags": { "scope": "design" } },
		"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "runtime" }, "pushToServer": "shallow" },
		"visible": "visible"
	},
	
	"handlers": { 
		"onChangeMethodID": {
			"description": "Fired after a different tab is selected",
			"parameters": [{
				"name": "previousIndex",
				"type": "int",
				"description": "The previous tab index"
			}, {
				"name": "event",
				"type": "JSEvent"
			}]
		},
		"onTabClickedMethodID": {
			"description": "Fired when the user clicks on a tab. When false is returned, the tab switch is prevented",
			"returns": "boolean",
			"parameters": [{
				"name": "event",
				"type": "JSEvent",
				"description": "The event that triggered the action"
			}, {
				"name": "clickedTabIndex",
				"type": "int",
				"description": "The index of the tab that was clicked"
			}, {
				"name": "dataTarget",
				"type": "string",
				"description": "The value of the closest data-target attribute when found"
			}]
		}
	},
	
	"api": {
		"addTab": {
			"returns": "tab",
			"parameters": [{
				"name": "form",
				"type": "form"
			}, {
				"name": "tabText",
				"type": "tagstring"
			}, {
				"name": "index",
				"type": "int",
				"optional": true
			}]

		},
		"getTabAt": {
			"returns": "tab",
			"parameters": [{
				"name": "i",
				"type": "int"
			}]

		},
		"removeTabAt": {
			"returns": "boolean",
			"parameters": [{
				"name": "index",
				"type": "int"
			}]

		}
	},
	
	"types": {
		"tab": {
			"active": { "type": "boolean", "default": false, "tags": { "scope": "private" } },
			"containedForm": "form",
			"imageMediaID": "media",
			"text": { "type": "tagstring", "tags": { "useAsCaptionInDeveloper" : true, "captionPriority" : 1 } },
			"relationName": "relation",
			"name": { "type": "string" },
			"disabled": { "type": "boolean", "default": false }
		}
	}

}