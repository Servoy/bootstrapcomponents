angular.module('bootstrapcomponentsTypeahead', ['servoy']).directive('bootstrapcomponentsTypeahead', ['formatFilterFilter','$svyProperties','$sabloConstants','$formatterUtils', function(formatFilter,$svyProperties, $sabloConstants,$formatterUtils) {
  return {
    restrict: 'E',
    scope: {
      model: "=svyModel",
      svyServoyapi: "=",
      handlers: "=svyHandlers",
      api: "=svyApi"
    },
    link: function($scope, $element) {

      $scope.ngModel = $element.controller('ngModel');
    	
      var resolvingDisplayValue = false;
      
      var hasRealValues = false;

      $scope.$watch('model.isOpened', function(){
      	var bodyElements = document.querySelectorAll('.svy-body,.ui-grid-viewport');
        for(var i = 0; i < bodyElements.length; i++){
        	if($scope.model.isOpened)
        		bodyElements[i].addEventListener('scroll',$scope.fireRecalculating);
			else bodyElements[i].removeEventListener('scroll',$scope.fireRecalculating);
		}
	  })
	
	$scope.$watch('model.valuelistID', function() {
		if (!$scope.model.valuelistID || $scope.model.valuelistID.length == 0) return; // not loaded yet or already filtered
		hasRealValues = false;
		if ($scope.model.valuelistID.hasRealValues)
		{	
			hasRealValues = $scope.model.valuelistID.hasRealValues()
		}
		else
		{
			for (var i = 0; i < $scope.model.valuelistID.length; i++) {
				var item = $scope.model.valuelistID[i];
				if (item.realValue != item.displayValue) {
					hasRealValues = true;
					break;
				}
			}
		}	
	});
		
         
      $scope.$watch('model.dataProviderID', function() {
    	  if (!hasRealValues)
			{
				$scope.value = $scope.model.dataProviderID;
			}
			else
			{
				var found = false;
				for (var i = 0; i < $scope.model.valuelistID.length; i++) {
					var item = $scope.model.valuelistID[i];
					if (item.realValue === $scope.model.dataProviderID) {
						$scope.value = item.displayValue;
						found = true;
						break;
					}
				}
				if(!found)
				{
					$scope.value = null;
					$scope.model.valuelistID.getDisplayValue($scope.model.dataProviderID).then(function(displayValue) {
							$scope.value = displayValue;
					});
				}	
			}	
		});

      $scope.doSvyApply = function(force) {
    	  if (force || angular.element('[uib-typeahead-popup]').attr('aria-hidden') == "true") {
    		  if ($scope.model.valuelistID) {
    			  var hasMatchingDisplayValue = false;
    			  for (var i = 0; i < $scope.model.valuelistID.length; i++) {
    				  if ($scope.value === $scope.model.valuelistID[i].displayValue) {
    					  $scope.model.dataProviderID = $scope.model.valuelistID[i].realValue;
    					  hasMatchingDisplayValue = true;
    					  break;
    				  }
    			  }
    			  if (!hasMatchingDisplayValue) 
    			  {
    				  if (hasRealValues) 
    				  {
    					  $scope.model.dataProviderID = null;
    				  }
    				  else
    				  {
    					  $scope.model.dataProviderID = $scope.value;
    				  }
    			  }
    		  }
    		  else
    		  {
    			  $scope.model.dataProviderID = $scope.value;
    		  }  
    		  $scope.svyServoyapi.apply('dataProviderID');
    	  }
    	  else if (!hasRealValues && ($scope.model.dataProviderID != $scope.value))
    	  {
    		  $scope.model.dataProviderID = $scope.value;
    		  $scope.svyServoyapi.apply('dataProviderID');
    	  }

      }
      
      var tooltipState = null;
      var formatState = null;
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
			  case "format":
					if (formatState)
						formatState(value);
					else formatState = $formatterUtils.createFormatState($element, $scope,$scope.ngModel,true,value);
					break;
			  case "selectOnEnter":
					if (value) $svyProperties.addSelectOnEnter($element);
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
		 * Request the focus to this typeahead.
		 * 
		 * @example %%prefix%%%%elementName%%.requestFocus();
		 * @param mustExecuteOnFocusGainedMethod
		 *            (optional) if false will not execute the onFocusGained
		 *            method; the default value is true
		 */
		$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
			if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
				$element.unbind('focus');
				$element[0].focus();
				$element.bind('focus', $scope.handlers.onFocusGainedMethodID)
			} else {
				$element[0].focus();
			}
		}
    },
    templateUrl: 'bootstrapcomponents/typeahead/typeahead.html',
    replace: true
  };
}])
