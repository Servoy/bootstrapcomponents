{
	"name": "bootstrapcomponents-imagemedia",
	"displayName": "Image",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapcomponents/imagemedia/media.png",
	"definition": "bootstrapcomponents/imagemedia/imagemedia.js",
	"libraries": [{"name":"bootstrapcomponents-imagemedia-css", "version":"1.0", "url":"bootstrapcomponents/imagemedia/imagemedia.css", "mimetype":"text/css"}],
	"keywords": ["picture", "video"],
	"model":
	{
			"alternate" : { "type" : "tagstring", "tags": { "doc" :"Value to be filled in alt html attribute of the img tag."}},
			"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] }, 
			"editable" : { "type": "protected", "blockingOn": false, "default": false, "for": ["dataProviderID","onDataChangeMethodID"] },
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope" :"design", "typeName": "mediaDataprovider" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	        "media" : { "type" :"media"},
	        "readOnly" : { "type": "protected", "blockingOn": true, "default": false, "for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"private"} },
	        "size" : {"type" :"dimension",  "default" : {"width":140, "height":80}},
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "values" :["img-responsive","img-rounded","img-circle", "img-thumbnail","media-object"]},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"}, 
	       "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}}
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
							 ],
				"code": "return true",
				"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)"
	        }
	},
	"api":
	{

	}

}
