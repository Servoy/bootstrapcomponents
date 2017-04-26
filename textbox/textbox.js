angular.module('bootstrapcomponentsTextbox',['servoy']).directive('bootstrapcomponentsTextbox', function($formatterUtils) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	api: "=svyApi",
       	handlers: "=svyHandlers"
      },
      link: function($scope, $element, $attrs) {
    	  
    	  var formatState = null;
    	  var child = $element.children();
    	  var ngModel = child.controller("ngModel");
			
				if($scope.model.inputType == "text") {
					$scope.$watch('model.format', function(){
						if ($scope.model.format)
						{
							if (formatState)
							formatState(value);
							else formatState = $formatterUtils.createFormatState($element, $scope, ngModel,true,$scope.model.format);
						}	  
					})
				}
    	  
    	  /**
	    	* Request the focus to this text field.
	    	* @example %%prefix%%%%elementName%%.requestFocus();
	    	*/
			$scope.api.requestFocus = function() { 
    		  $element.find('input')[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/textbox/textbox.html'
    };
  })
  
  
  
