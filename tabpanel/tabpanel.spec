{
	"name": "bootstrapcomponents-tabpanel",
	"displayName": "TabPanel",
	"version": 1,
	"icon": "bootstrapcomponents/tabpanel/tab.png",
	"definition": "bootstrapcomponents/tabpanel/tabpanel.js",
	"libraries": [{"name":"bootstrapcomponents-tabpanel-css", "version":"1.0", "url":"bootstrapcomponents/tabpanel/tabpanel.css", "mimetype":"text/css"}],
	"serverscript": "bootstrapcomponents/tabpanel/tabpanel_server.js",
	"model":
	{
			"containerStyleClass" : { "type" :"styleclass"},
			"tabs" : {"type":"tab[]", "pushToServer": "allow","droppable":true},
			"styleClass" : { "type" :"styleclass"},
			"height" : {"type":"int", "default":"500"},
			"tabIndex" : {"type":"int", "pushToServer": "shallow", "tags": { "scope" :"runtime" },"default":1},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "runtime" }, "pushToServer": "shallow" },
	    	"visible" : "visible"
	},
	"handlers":
	{

	},
	"api":
	{
 		"addTab": {
	            "returns": "tab",
				"parameters":[
								{                                                                 
 								"name":"form",
								"type":"form"
			                	},
             					{                                                                 
 								"name":"tabText",
								"type":"tagstring"
			            		},
             					{                                                                 
 								"name":"index",
								"type":"int",
			            		"optional":true
			            		}             
							 ]
	
	        },
	      "getTabAt": {
	            "returns": "tab",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },   
	     "removeTabAt": {
	            "returns": "boolean",
				"parameters":[
								{                                                                 
 								"name":"index",
								"type":"int"
			                	}             
							 ]
	
	        }
	},
	"types": {
  	 "tab": {
  	 	"active": {"type":"boolean","default": false,"tags": { "scope" :"private" }},
  		"containedForm": "form",
  		"imageMediaID": "media",
  		"text": {"type":"tagstring","default":"tab"},
  		"relationName": "relation"
  		}
	}

}
