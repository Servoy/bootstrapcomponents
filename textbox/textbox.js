angular.module('bootstrapcomponentsTextbox',['servoy']).directive('bootstrapcomponentsTextbox', function($formatterUtils) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	api: "=svyApi",
       	handlers: "=svyHandlers",
		svyServoyapi: '=svyServoyapi'
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
							else formatState = $formatterUtils.createFormatState(child, $scope, ngModel,true,$scope.model.format);
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
			
	    	/**
	    	* Reset the dataProvider to null and change the inputType of the textbox.<br/>
	    	* <b>Note:</b> the value of the dataProvider bound to this field will be automatically set to null
	    	* @param {String} inputType allowed values for inputType are <i>text, tel, date, time, datetime-local, month, week, number, color</i>
	    	* @example %%prefix%%%%elementName%%.inputType("tel");
	    	*/
			$scope.api.setInputType = function(inputType) {
				var types = ["text", "tel", "date", "time", "datetime-local", "month", "week", "number", "color"];
				
				if (types.indexOf(inputType) > -1) {
					$scope.model.dataProviderID = null;
					$scope.model.inputType = inputType;
					$scope.svyServoyapi.apply('dataProviderID');
					$scope.svyServoyapi.apply('inputType');
					return true;
				} else {
					return false;
				}
			}
      },
      templateUrl: 'bootstrapcomponents/textbox/textbox.html'
    };
  })
  
  
  
