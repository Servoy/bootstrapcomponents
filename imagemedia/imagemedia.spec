{
	"name": "bootstrapcomponents-imagemedia",
	"displayName": "Image Media",
	"version": 1,
	"icon": "bootstrapcomponents/imagemedia/IMG16.png",
	"definition": "bootstrapcomponents/imagemedia/imagemedia.js",
	"libraries": [{"name":"bootstrapcomponents-imagemedia-css", "version":"1.0", "url":"bootstrapcomponents/imagemedia/imagemedia.css", "mimetype":"text/css"}],
	"model":
	{
			"alternate" : { "type" : "tagstring" },
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] }, 
	        "dataProviderID" : { "type":"dataprovider", "tags": { "scope" :"design", "typeName": "mediaDataprovider" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["img-responsive","img-rounded","img-circle", "img-thumbnail","media-object"]},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	        "visible" : "visible"
	},
	"handlers":
	{
			"onActionMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
	        "onDataChangeMethodID" : {
	          "returns": "boolean",

	        	"parameters":[
								{
						          "name":"oldValue",
								  "type":"${dataproviderType}"
								},
								{
						          "name":"newValue",
								  "type":"${dataproviderType}"
								},
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        }
	},
	"api":
	{

	}

}
