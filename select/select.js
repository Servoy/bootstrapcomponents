angular.module('bootstrapcomponentsSelect',['servoy']).directive('bootstrapcomponentsSelect', ['$log', '$sabloConstants', function($log, $sabloConstants) {
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
			/* 
			 * Using ng-options
			 * <!--ng-options='option.realValue as option.displayValue for option in model.valuelistID track by option.realValue'-->
			 * */
			
			var element = $element.find('select');
			
			Object.defineProperty($scope.model,$sabloConstants.modelChangeNotifier, {configurable:true,value:function(property,value) {
				switch(property) {
					case "dataProviderID":
						element.val(value);
						break;
				}
			}});
			
			var destroyListenerUnreg = $scope.$on("$destroy", function() {
				destroyListenerUnreg();
				delete $scope.model[$sabloConstants.modelChangeNotifier];
				if (observer) {
					observer.disconnect();
				}
			});
			
			// data can already be here, if so call the modelChange function so that it is initialized correctly.
			var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (var key in $scope.model) {
				modelChangeFunction(key,$scope.model[key]);
			}
			
			$scope.onChange = function(event) {
				var value = $element.find('select').val();
				$scope.model.dataProviderID = value;
				$scope.svyServoyapi.apply("dataProviderID");
				$scope.handlers.onActionMethodID(event);
			}

			/**
			 * Set the focus to combobox.
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 */
			$scope.api.requestFocus = function() {
				$element.find('select')[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/select/select.html'
    };
}])
.filter('showDisplayValue', function () { // filter that takes the realValue as an input and returns the displayValue
	return function (input, valuelist) {
		var i = 0;
		var realValue = input;
		if (valuelist) {
			if (input && input.hasOwnProperty("realValue")) {
				realValue = input.realValue;
			}
			//TODO performance upgrade: change the valuelist to a hashmap so that this for loop is no longer needed. 
			//maybe to something like {realValue1:displayValue1, realValue2:displayValue2, ...}
			for (i = 0; i < valuelist.length; i++) {
				if (realValue === valuelist[i].realValue) {
					return getParsedDisplayValue(valuelist[i].displayValue);
				}
			}
			var hasRealValues = false;
			for (var i = 0; i < valuelist.length; i++) {
				var item = valuelist[i];
				if (item.realValue != item.displayValue) {
					hasRealValues = true;
					break;
				}
			}
			if (hasRealValues) {
				var diplayValue = null;
				// this then function will resolve right away if the value is already cached on the client.
				valuelist.getDisplayValue(realValue).then(function(val){
					diplayValue = val;
				})
				return getParsedDisplayValue(diplayValue);
			}
			if (valuelist.length == 0) return null;
		}
		
		function getParsedDisplayValue(value) {
			if (value === undefined || value === null || value === '') {
				return '&nbsp;'
			} else {
				return value;
			}
		}
		
		return input;
	};
});