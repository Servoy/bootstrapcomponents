angular.module('bootstrapcomponentsSelect',['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsSelect', ['$log', '$sabloConstants', function($log, $sabloConstants) {
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
				if($scope.handlers.onActionMethodID) $scope.handlers.onActionMethodID(event);
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
}]);