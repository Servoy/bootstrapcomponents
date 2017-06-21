angular.module('bootstrapcomponentsList',['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsList', ['$log', '$sabloConstants', '$filter', '$utils', '$timeout', function($log, $sabloConstants, $filter, $utils, $timeout) {
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

			function updateInput(listValue) {
				if($scope.model.valuelistID) {
					var showDisplayValueFilter = $filter("bcShowDisplayValue");
					listValue = showDisplayValueFilter(listValue, $scope.model.valuelistID, true, true);
				}

				inputEl.val(listValue);				
			}

			function updateDataprovider() {
				if(!isFakeListSelection()) {
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

					if($scope.model.dataProviderID !== listValue) {
						$scope.model.dataProviderID = listValue;
						$scope.svyServoyapi.apply("dataProviderID");
					}
					else {
						updateInput(listValue);
					}
				}
			}


			$scope.$watch('model.dataProviderID', function(newValue, oldValue) { 
				updateInput(newValue);
			})

			inputEl.on("keydown", function(event) {
				if($utils.testEnterKey(event)) {
					updateDataprovider();
				}
			});

			$scope.onBlur = function(event) {
				updateDataprovider();
			}

			var polyFillFakeList = null;

			$scope.renderFinished = function() {
				$timeout(function() {
					polyFillFakeList = DatalistPolyFill.apply(inputEl.get(0));
				});
			}

			function isFakeListSelection() {
				if(polyFillFakeList && (polyFillFakeList.style.display != 'none')) {
					var fakeItems = polyFillFakeList.childNodes;
					for( var i = 0; i < fakeItems.length; i++ ) {
						if (fakeItems[i].className == DatalistPolyFill.ACTIVE_CLASS) {
							return true;
						}
					}
				}
				return false;
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