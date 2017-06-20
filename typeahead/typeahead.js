angular.module('bootstrapcomponentsTypeahead', ['servoy']).directive('bootstrapcomponentsTypeahead', ['formatFilterFilter', function(formatFilter) {
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

	$scope.$watch('model.valuelistID', function() {
		if (!$scope.model.valuelistID || $scope.model.valuelistID.length == 0) return; // not loaded yet or already filtered
		hasRealValues = false;
		for (var i = 0; i < $scope.model.valuelistID.length; i++) {
			var item = $scope.model.valuelistID[i];
			if (item.realValue != item.displayValue) {
				hasRealValues = true;
				break;
			}
		}
	});
		
      $scope.formatLabel = function(model) {
        var displayFormat = undefined;
        var type = undefined;
        var displayValue = null;
        if ($scope.model.valuelistID && $scope.model.valuelistID.length > 0 && $scope.model.valuelistID[0].displayValue) {
          var found = false;
          var realValue = typeof $scope.model.valuelistID[0].realValue == "number" && !isNaN(Number($scope.ngModel.$modelValue)) ? Number($scope.ngModel.$modelValue) : $scope.ngModel.$modelValue;
          for (var i = 0; i < $scope.model.valuelistID.length; i++) {
            if (realValue === $scope.model.valuelistID[i].realValue) {
              displayValue = $scope.model.valuelistID[i].displayValue;
              found = true;
              break;
            }
          }
          if (!found && typeof realValue === typeof $scope.model.valuelistID[0].realValue)
          {
        	  if(!resolvingDisplayValue) {
        		  resolvingDisplayValue = true;
	        	  $scope.model.valuelistID.getDisplayValue(realValue).then(function(dispValue){
	        		  $scope.model.valuelistID.push({realValue:realValue, displayValue:dispValue});
	        		  resolvingDisplayValue = false;
	        		  $scope.ngModel.$modelValue = null;//needed to force the format to be applied again
	        	  }, function(reason) {
	        	  	  resolvingDisplayValue = false; 
	        	  });  
        	  }
          }
        } else {
          displayValue = model;
        }
        if ($scope.model.format && $scope.model.format.display) displayFormat = $scope.model.format.display;
        if ($scope.model.format && $scope.model.format.type) type = $scope.model.format.type;
    	return formatFilter(displayValue, displayFormat, type);
      }
      
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
					$scope.value = $scope.model.dataProviderID;
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
      }
      
      /**
		 * Request the focus to this typeahead.
		 * @example %%prefix%%%%elementName%%.requestFocus();
		 */
		$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) { 
			$element[0].focus();
		}
    },
    templateUrl: 'bootstrapcomponents/typeahead/typeahead.html',
    replace: true
  };
}])
