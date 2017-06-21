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
