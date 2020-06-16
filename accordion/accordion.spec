{
	
	"name": "bootstrapcomponents-accordion",
	"displayName": "AccordionPanel",
	"categoryName": "Form Containers",
	"version": 1,
	"icon": "bootstrapcomponents/accordion/accordion.png",
	"definition": "bootstrapcomponents/accordion/accordion.js",
	"libraries": [{ "name": "bootstrapcomponents-accordion-css", "version": "1.0", "url": "bootstrapcomponents/accordion/accordion.css", "mimetype": "text/css" }],
	"serverscript": "bootstrapcomponents/tabpanel/accordion_server.js",
	"keywords": ["container"],
	"model": {
		"containerStyleClass": { "type": "styleclass" },
		"tabs": { "type": "tab[]", "pushToServer": "deep", "droppable": true, "tags": { "allowaccess": "visible"}},
		"styleClass": { "type": "styleclass" },
		"height": { "type": "int", "default": "500" },
		"tabIndex": { "type": "int", "pushToServer": "shallow", "tags": { "scope": "runtime", "allowaccess": "visible" }, "default": 1},
		"tabSeq": { "type": "tabseq", "tags": { "scope": "design" } },
		"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "runtime", "allowaccess": "visible"}, "pushToServer": "shallow"},
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
			"active": { "type": "boolean", "default": false, "tags": { "scope": "private" } },
			"containedForm": "form",
			"text": { "type": "tagstring", "tags": { "useAsCaptionInDeveloper" : true, "captionPriority" : 1 } },
			"relationName": "relation",
			"name": { "type": "string" },
			"disabled": { "type": "boolean", "default": false }
		}
	}

}