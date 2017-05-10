angular.module('bootstrapcomponentsList',['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsList', ['$log', '$sabloConstants', '$filter', '$utils', function($log, $sabloConstants, $filter, $utils) {
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
			var inputEl = $element.find('input');

			function updateDataprovider() {
				var listValue = inputEl.val();

				if($scope.model.valuelistID) {
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						var displayValue = $scope.model.valuelistID[i].displayValue;
						if (displayValue === undefined || displayValue === null || displayValue === '') {
							displayValue = ' ';
						}
						if (listValue === displayValue) {
							listValue = $scope.model.valuelistID[i].realValue;
							break;
						}
					}
				}

				$scope.model.dataProviderID = listValue;
				$scope.svyServoyapi.apply("dataProviderID");
			}

			inputEl.on("keydown", function(event) {
				if($utils.testEnterKey(event)) {
					updateDataprovider();
				}
			});

			$scope.$watch('model.dataProviderID', function(newValue, oldValue) { 
				var listValue = newValue;

				if($scope.model.valuelistID) {
					var showDisplayValueFilter = $filter("showDisplayValue");
					listValue = showDisplayValueFilter(listValue, $scope.model.valuelistID, true);
				}

				inputEl.val(listValue);
			})

			$scope.onBlur = function(event) {
				updateDataprovider();
			}

			/**
			 * Set the focus to the list input
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 */
			$scope.api.requestFocus = function() {
				inputEl[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/list/list.html'
    };
}]);