angular.module('bootstrapcomponentsFormcomponent',['servoy']).directive('bootstrapcomponentsFormcomponent', ['$compile',function($compile) {
    return {
           restrict : 'E',
           scope : {
        	   model: '=svyModel',
        	   api : "=svyApi",
        	   svyServoyapi: "=",
        	   handlers: "=svyHandlers"
           },
           controller: function($scope, $element, $attrs)
           {
        	   function createContent() {
        		   $element.empty();
        		   var newValue = $scope.model.containedForm;
        		   if (newValue) {
        			   var elements = $scope.svyServoyapi.getFormComponentElements("containedForm", newValue);
        			   var height = $scope.model.height;
        			   var width = $scope.model.width;
        			   if ($scope.model.svy_absoluteLayout) {
	        			   if (!height) height = $scope.model.svy_formHeight;
	        			   if (!width) width = $scope.model.svy_formWidth;
        			   }
        			   if (height || width) {
        				   var template = "<div style='position:relative;";
        				   if (height) template += "height:" +height + "px;"
        				   if (width) template += "width:" +width + "px;"
        				   template += "'";
        				   if ($scope.model.styleClass)  template += " class='" +$scope.model.styleClass + "'";
        				   template += "></div>";
        				   var div = $compile(template)($scope);
        				   div.append(elements);
        				   $element.append(div);
        			   }
        			   else $element.append(elements);
        		   }
        		   else {
        			   $element.html("<div>FormComponentContainer, select a form</div>");
        		   }
        	   }
        	   $scope.$watch("model.containedForm", function() { 
        		  createContent();
        	   });
        	   if ($scope.svyServoyapi.isInDesigner()) {
        		   var previousWidth = $scope.model.width;
        		   var previousHeigth = $scope.model.height;
        		   $scope.$watch("model.width", function() { 
        			  if (previousWidth != $scope.model.width) {
	             		  createContent();
	             		  previousWidth = $scope.model.width;
        			  }
             	   });
        		   $scope.$watch("model.height", function() { 
         			  if (previousHeigth != $scope.model.height) {
                  		  createContent();
                  		  previousHeigth = $scope.model.height;
        			  }
              	   });
        	   }
        }
    }
}])