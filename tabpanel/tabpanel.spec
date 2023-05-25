{
	
	"name": "bootstrapcomponents-tabpanel",
	"displayName": "TabPanel",
	"categoryName": "Form Containers",
	"version": 1,
	"icon": "bootstrapcomponents/tabpanel/tab.png",
	"definition": "bootstrapcomponents/tabpanel/tabpanel.js",
	"doc": "bootstrapcomponents/tabpanel/tabpanel_doc.js",
	"libraries": [{ "name": "bootstrapcomponents-tabpanel-css", "version": "1.0", "url": "bootstrapcomponents/tabpanel/tabpanel.css", "mimetype": "text/css" }],
	"serverscript": "bootstrapcomponents/tabpanel/tabpanel_server.js",
	"keywords": ["container"],
	"model": {
		"containerStyleClass": { "type": "styleclass" },
		"closeIconStyleClass" : {"type":"styleclass", "default":"glyphicon glyphicon-remove close-icon", "tags": { "scope" :"design" }, "values":[]},
		"showTabCloseIcon" : { "type": "boolean", "default": false },
		"tabs": { "type": "tab[]", "pushToServer": "deep", "droppable": true, "tags": { "allowaccess": "visible", "wizard": "autoshow"}},
		"styleClass": { "type": "styleclass","tags": { "doc": "Set the styleclasses that should be applied at to this component" } },
		"height": { "type": "string", "default": "500", "tags": { "doc" : "Minimum height of the tabpanel, should be used for responsive forms. Can be 100% (to take parent container height) or a number (in pixels)."} },
		"tabIndex": { "type": "int", "pushToServer": "shallow", "tags": { "scope": "runtime", "allowaccess": "visible" }, "default": 1},
		"tabSeq": { "type": "tabseq", "tags": { "scope": "design","doc" : "Tab sequence number of form containers is used for all nested components in the main form." } },
		"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "private", "allowaccess": "visible"}, "pushToServer": "shallow"},
	"visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
	},
	
	"handlers": { 
		"onChangeMethodID": {
			"doc": "Fired after a different tab is selected",
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
			"doc": "Fired when the user clicks on a tab. When false is returned, the tab switch is prevented",
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
		},
		"onTabCloseMethodID": {
			"doc": "Fired when the user clicks on the tab close icon. When false is returned, the tab close is prevented",
			"returns": "boolean",
			"parameters": [{
				"name": "event",
				"type": "JSEvent",
				"description": "The event that triggered the action"
			}, {
				"name": "clickedTabIndex",
				"type": "int",
				"description": "The index of the tab that was clicked"
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

		},
		"removeAllTabs": {
            "returns": "boolean"
        },
		"selectTabAt": {
			"returns": "boolean",
			"parameters": [{
				"name": "index",
				"type": "int"
			}]

		}
	},
	
	"types": {
		"tab": {
            "_id": { "type": "string", "tags": { "scope": "private" }, "pushToServer": "reject" },
			"active": { "type": "boolean", "default": false, "tags": { "scope": "private" } },
			"containedForm": {"type":"form", "tags": {"wizard": {"order": "1", "wizardRelated": "relationName"}}},
			"imageMediaID": "media",
			"text": { "type": "tagstring", "tags": { "useAsCaptionInDeveloper" : true, "captionPriority" : 1, "wizard": "3" } },
			"relationName": {"type":"relation", "tags": {"wizard": "2"}},
			"name": { "type": "string" },
			"disabled": { "type": "boolean", "default": false },
			"hideCloseIcon" : { "type": "boolean", "default": false },
			"iconStyleClass" : { "type" :"styleclass" },
			"toolTipText" : "tagstring",
			"styleClass": { "type": "styleclass" }
		}
	}

}
