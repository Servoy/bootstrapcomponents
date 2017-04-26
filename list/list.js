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
						if (listValue === $scope.model.valuelistID[i].displayValue) {
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
					var displayValue = showDisplayValueFilter(listValue, $scope.model.valuelistID);
					if(displayValue !== '&nbsp;') {
						listValue = displayValue;
					}
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