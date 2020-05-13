{
	"name": "bootstrapcomponents-formcomponent",
	"displayName": "FormComponentContainer",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/formcomponent/formcomponent.png",
	"definition": "bootstrapcomponents/formcomponent/formcomponent.js", 
	"libraries": [],
	"deprecated" : "true",
	"replacement": "servoycore-formcomponent",	
	"model":
	{
		"containedForm": "formcomponent",
		"styleClass" : { "type" :"styleclass","default": "svy-formcomponent"},
		"width" : {"type" :"int", "tags": { "scope" :"design" }},
		"height" :{"type" :"int", "tags": { "scope" :"design" }}
	}
}