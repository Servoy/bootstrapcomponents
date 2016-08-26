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
      $scope.doSvyApply = function() {
         if (angular.element('[typeahead-popup]').attr('aria-hidden') == "true") {
          if ($scope.model.valuelistID && $scope.model.valuelistID.length > 0 && $scope.model.valuelistID[0].displayValue) {
            var hasMatchingDisplayValue = false;
            for (var i = 0; i < $scope.model.valuelistID.length; i++) {
              if ($element.val() === $scope.model.valuelistID[i].displayValue) {
            	$scope.model.dataProviderID = $scope.model.valuelistID[i].realValue;
                hasMatchingDisplayValue = true;
                break;
              }
            }
            if (!hasMatchingDisplayValue) {
            	$scope.model.dataProviderID = null;
            }
          }
          $scope.svyServoyapi.apply('dataProviderID');
        }
      }
    },
    templateUrl: 'bootstrapcomponents/typeahead/typeahead.html',
    replace: true
  };
}])
