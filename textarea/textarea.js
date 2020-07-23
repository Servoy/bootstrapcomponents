angular.module('bootstrapcomponentsTextarea',['servoy']).directive('bootstrapcomponentsTextarea', function($svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	api: "=svyApi",
       	handlers: "=svyHandlers"
      },
      controller: function($scope, $element, $attrs) {
    	  var tooltipState = null;
    	  Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
    		  configurable: true,
    		  value: function(property, value) {
    			  switch (property) {
    			  case "toolTipText":
    				  registerTooltip(value);
    				  break;
    			  }
    		  }
    	  });
    	  
    	  function registerTooltip(value) {
    		  if (tooltipState)
				  tooltipState(value);
			  else
				  tooltipState = $svyProperties.createTooltipState($element, value);
    	  }
    	  
    	  var storedTooltip = false;
    	  
    	  $scope.api.onDataChangeCallback = function(event, returnval) {
    		  	var ngModel = $element.children().controller("ngModel");
				var stringValue = typeof returnval == 'string'
				if (returnval === false || stringValue) {
					ngModel.$setValidity("", false);
					if (stringValue) {
						if (storedTooltip == false)
							storedTooltip = $scope.model.toolTipText;
						registerTooltip(returnval);
					}
				} else {
					ngModel.$setValidity("", true);
					if (storedTooltip !== false)
						$scope.model.toolTipText = storedTooltip;
					storedTooltip = false;
					registerTooltip($scope.model.toolTipText );
				}
			}
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
		 * Request the focus to this textarea.
		 * @example %%prefix%%%%elementName%%.requestFocus();
		 * @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
		 */
		$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
			var inputEl = $element.find('textarea');
			if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID)
			{
				inputEl.unbind('focus');
				inputEl[0].focus();
				inputEl.bind('focus', $scope.handlers.onFocusGainedMethodID)
			}
			else
			{
				inputEl[0].focus();
			}			  
		}

      },
      templateUrl: 'bootstrapcomponents/textarea/textarea.html'
    };
  })
  
  
  
