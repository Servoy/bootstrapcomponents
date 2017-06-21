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
			});
			
			// data can already be here, if so call the modelChange function so that it is initialized correctly.
			var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (var key in $scope.model) {
				modelChangeFunction(key,$scope.model[key]);
			}
			
			function updateDataprovider() {
				if($scope.model.valuelistID) {
					var selectComp = $element.find('select');
					var selectedText = selectComp.find("option:selected").text();
					var value = null;
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						if($scope.model.valuelistID[i].displayValue == selectedText) {
							value = $scope.model.valuelistID[i].realValue;
							break;
						}
					}

					if($scope.model.dataProviderID != value) {
						$scope.model.dataProviderID = value;
						$scope.svyServoyapi.apply("dataProviderID");
						return true;
					}
				}
				return false;
			}

			$scope.onChange = function(event) {
				if(updateDataprovider() && $scope.handlers.onActionMethodID) {
					$scope.handlers.onActionMethodID(event);
				}
			}

			$scope.isDPInValueList = function() {
				var isDPInValueList = false;
				if($scope.model.valuelistID) {
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						if($scope.model.dataProviderID == $scope.model.valuelistID[i].realValue) {
							isDPInValueList = true;
							break;
						}
					}
				}
				return isDPInValueList;
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