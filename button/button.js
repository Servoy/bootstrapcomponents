angular.module('bootstrapcomponentsButton',['servoy']).directive('bootstrapcomponentsButton', function($svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	handlers: "=svyHandlers",
        api: "=svyApi",
        servoyApi: "=svyServoyapi"
      },
      link:  function($scope, $element, $attrs) {
          $scope.isTrustedHTML = function() {
              if($scope.servoyApi.trustAsHtml() || $scope.model.showAs === 'trusted_html') {
                  return true;
              }
              return false;
          }
      },
      controller: function($scope, $element, $attrs) {
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
			 * Set the focus to this button.
			 * 
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 */
			$scope.api.requestFocus = function() {
				$element.find('button')[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/button/button.html'
    };
  })
  
  
  
