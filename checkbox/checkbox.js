angular.module('bootstrapcomponentsCheckbox',['servoy']).directive('bootstrapcomponentsCheckbox', function($svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
        name: "=",
        model: "=svyModel",
        handlers: "=svyHandlers",
        api: "=svyApi",
        svyServoyapi: "="
      },
      link: function($scope, $element, $attrs) {

    	  $scope.isTrustedHTML = function() {
              if($scope.svyServoyapi.trustAsHtml() || $scope.model.showAs === 'trusted_html') {
                  return true;
              }
              return false;
          }
    	  
          $scope.selection = false;
          
          $scope.$watch('model.dataProviderID', function() 
          {
        	  var value = {}
        	  value.value = getSelectionFromDataprovider();
        	  // see "always include a dot in your ngmodel" issue
        	  $scope.selection = value;
          })
          
          $scope.checkBoxClicked = function()
          {
        	  if ($scope.model.selectedValue) 
        	  {
					$scope.model.dataProviderID = $scope.model.dataProviderID == $scope.model.selectedValue ? null : $scope.model.selectedValue;
			  } 
        	  else if (angular.isString($scope.model.dataProviderID))
        	  {
        		  $scope.model.dataProviderID = $scope.model.dataProviderID == "1" ? "0" : "1";
        	  }
        	  else
        	  {
        		  $scope.model.dataProviderID = $scope.model.dataProviderID > 0 ?  0 :  1;
        	  }
        	  $scope.svyServoyapi.apply('dataProviderID')
          }
          
          function getSelectionFromDataprovider()
          {
              if(!$scope.model.dataProviderID) return false;
              if ($scope.model.selectedValue) 
              {
					return $scope.model.dataProviderID == $scope.model.selectedValue;
              }
              if (angular.isString($scope.model.dataProviderID))
        	  {
        		 return $scope.model.dataProviderID == "1";
        	  }
        	  else
        	  {
        		  return $scope.model.dataProviderID > 0;
        	  }
          }
          
          var tooltipState = null;
          Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
        	  configurable: true,
        	  value: function(property, value) {
        		  switch (property) {
        		  case "toolTipText":
        			  if (tooltipState)
        				  tooltipState(value);
        			  else
        				  tooltipState = $svyProperties.createTooltipState($element, value);
        			  break;
        		  }
        	  }
          });
          var destroyListenerUnreg = $scope.$on("$destroy", function() {
        	  destroyListenerUnreg();
        	  delete $scope.model[$sabloConstants.modelChangeNotifier];
          });
          // data can already be here, if so call the modelChange function so
          // that it is initialized correctly.
          var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
          for (key in $scope.model) {
        	  modelChangFunction(key, $scope.model[key]);
          }

		/**
		 * Request the focus to this checkbox.
		 * 
		 * @example %%prefix%%%%elementName%%.requestFocus();
		 * @param mustExecuteOnFocusGainedMethod
		 *            (optional) if false will not execute the onFocusGained
		 *            method; the default value is true
		 */
		$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
			var input = $element.find('input');
			if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
				input.unbind('focus');
				input[0].focus();
				input.bind('focus', $scope.handlers.onFocusGainedMethodID)
			} else {
				input[0].focus();
			}
		}
      },
      templateUrl: 'bootstrapcomponents/checkbox/checkbox.html'
    };
})