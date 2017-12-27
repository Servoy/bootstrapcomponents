angular.module('bootstrapcomponentsFormcomponent',['servoy']).directive('bootstrapcomponentsFormcomponent', ['$compile', '$sabloConstants',function($compile, $sabloConstants) {
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
        			   if (newValue.absoluteLayout) {
	        			   if (!height) height = newValue.formHeight;
	        			   if (!width) width = newValue.formWidth;
        			   }
        			   if (height || width) {
        				   var template = "<div style='position:relative;";
        				   if (height) template += "height:" +height + "px;"
        				   if (width) template += "width:" +width + "px;"
        				   template += "'";
        				   if ($scope.model.styleClass)  template += " class='svy-formcomponent " +$scope.model.styleClass + "'";
        				   template += "></div>";
        				   var div = $compile(template)($scope);
        				   div.append(elements);
        				   $element.append(div);
        			   }
        			   // FIXME styleClass is not applied to responsive forms
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
        },
		link:  function($scope, $element, $attrs) {
			
			var className = $scope.model.styleClass;
			Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "styleClass":
								// TODO does not work for responsive forms
								var div = $element.children()[0];
								if (div) {
									var wrapper = $(div);
									if (wrapper.hasClass('svy-formcomponent')) {
										if (className) wrapper.removeClass(className);
										className = 'svy-formcomponent ' + value;
										if (className) wrapper.addClass(className);
									}
								}
								break;
							}
						}
					});
			var destroyListenerUnreg = $scope.$on("$destroy", function() {
				destroyListenerUnreg();
				delete $scope.model[$sabloConstants.modelChangeNotifier];
			});
			
			// data can already be here, if so call the modelChange function so that it is initialized correctly.
			var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (var key in $scope.model) {
				modelChangeFunction(key,$scope.model[key]);
			}
		}
    }
}])