{
	
	"name": "bootstrapcomponents-accordion",
	"displayName": "AccordionPanel",
	"categoryName": "Form Containers",
	"version": 1,
	"icon": "bootstrapcomponents/accordion/accordion.png",
	"definition": "bootstrapcomponents/accordion/accordion.js",
	"doc": "bootstrapcomponents/accordion/accordion_doc.js",
	"libraries": [{ "name": "bootstrapcomponents-accordion-css", "version": "1.0", "url": "bootstrapcomponents/accordion/accordion.css", "mimetype": "text/css" }],
	"serverscript": "bootstrapcomponents/accordion/accordion_server.js",
	"keywords": ["container"],
	"model": {
		"containerStyleClass": { "type": "styleclass" ,"tags": { "doc" :"The CSS class(es) to be added to container element - parent of the form element."}},
		"tabs": { "type": "tab[]", "pushToServer": "deep", "droppable": true, "tags": { "allowaccess": "visible", "wizard": "autoshow"}},
		"styleClass": { "type": "styleclass" ,"tags": { "doc" :"The CSS class(es) to be added to accordion element."}},
		"height": { "type": "int", "default": "500", "tags": { "doc" : "Minimum height of the accordion, should be used for responsive forms."} },
		"tabIndex": { "type": "int", "pushToServer": "shallow", "tags": { "scope": "runtime", "allowaccess": "visible" }, "default": 1},
		"tabSeq": { "type": "tabseq", "tags": { "scope": "design" } },
		"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "runtime", "allowaccess": "visible"}, "pushToServer": "shallow"},
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
		    "_id": { "type": "string", "tags": { "scope": "private" }, "pushToServer": "reject" },
			"active": { "type": "boolean", "default": false, "tags": { "scope": "private" } },
			"containedForm": {"type":"form", "tags": {"wizard": {"order": "1", "wizardRelated": "relationName"}}},
			"text": { "type": "tagstring", "tags": { "useAsCaptionInDeveloper" : true, "captionPriority" : 1, "wizard": "3" }, "default":"tab" },
			"relationName": {"type":"relation", "tags": {"wizard": "2"}},
			"name": { "type": "string" },
			"disabled": { "type": "boolean", "default": false }
		}
	}

}