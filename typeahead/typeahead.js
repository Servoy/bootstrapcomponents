angular.module('bootstrapcomponentsTypeahead', ['servoy']).directive('bootstrapcomponentsTypeahead', ['formatFilterFilter','$q', function(formatFilter,$q) {
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
        	  $scope.model.valuelistID.getDisplayValue(realValue).then(function(dispValue){
        		  displayValue = dispValue;
        	  });       	  
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
