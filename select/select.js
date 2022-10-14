angular.module('bootstrapcomponentsSelect',['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsSelect', ['$log', '$svyProperties', '$sabloConstants','$filter', '$http', '$templateCache','$compile', function($log, $svyProperties, $sabloConstants,$filter,$http,$templateCache,$compile) {
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

			var isMultiSelect = $scope.model.multiselect;
			var templateUrl = isMultiSelect ? "bootstrapcomponents/select/select_multiple.html" : "bootstrapcomponents/select/select.html";
			$http.get(templateUrl, {cache: $templateCache}).then(function(result) {
				$element.html(result.data);
				$compile($element.contents())($scope);

			/* 
			 * Using ng-options
			 * <!--ng-options='option.realValue as option.displayValue for option in model.valuelistID track by option.realValue'-->
			 * */
			
			$scope.showPlaceholder = function(listValue){
				if(!$scope.model.placeholderText || $scope.model.placeholderText.length === 0) 
					return false;			
				var showDisplayValueFilter = $filter("bcShowDisplayValue");
				var displayValue = showDisplayValueFilter($scope.model.dataProviderID, $scope.model.valuelistID, true, true);
				return displayValue == null || (displayValue == "" && $scope.model.dataProviderID === null);
			}	
			
			var element = $element.find('select');
			var tooltipState = null;
			Object.defineProperty($scope.model,$sabloConstants.modelChangeNotifier, {configurable:true,value:function(property,value) {
				switch(property) {
					case "dataProviderID":
						element.val(value);
						!$scope.showPlaceholder() ? $element.removeClass('placeholder') : $element.addClass('placeholder'); 
						break;
					case "toolTipText":
	    				  if (tooltipState)
	    					  tooltipState(value);
	    				  else
	    					  tooltipState = $svyProperties.createTooltipState($element, value);
	    				  break;
					case "placeholderText":
						!$scope.showPlaceholder() ? $element.removeClass('placeholder') : $element.addClass('placeholder');
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

					var items = selectComp.find("option:selected").map(function() {
						return $(this).text();
					}).get();


					var value = null;
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						if(items.indexOf($scope.model.valuelistID[i].displayValue) != -1) {
							if(isMultiSelect) {
								if(value == null) value = [];
								value.push($scope.model.valuelistID[i].realValue);
							}
							else {
								value = $scope.model.valuelistID[i].realValue;
								break;
							}
						}
					}

					if(isMultiSelect && value) {
						value = value.join('\n');
					}

					if(($scope.model.dataProviderID +'') != (value +'')) {
						$scope.model.dataProviderID = value;
						$scope.svyServoyapi.apply("dataProviderID");
						return true;
					}
				}
				return false;
			}

			$scope.onChange = function(event) {
				$element.removeClass('placeholder');
				if(updateDataprovider() && $scope.handlers.onActionMethodID) {
					$scope.handlers.onActionMethodID(event);
				}
			}

			$scope.isDPInValueList = function() {
				var isDPInValueList = false;
				if ($scope.model.dataProviderID == null && $scope.hasValueListEmptyValue()) return true;
				if($scope.model.valuelistID) {
					for (var i = 0; i < $scope.model.valuelistID.length; i++) {
						if($scope.model.dataProviderID == $scope.model.valuelistID[i].realValue) {
							isDPInValueList = true;
							break;
						}
					}
				}
				return isDPInValueList;
			}
			
			$scope.hasValueListEmptyValue = function () {
				var allowEmptyValue = false;
				if ($scope.model.valuelistID) {
					// Checking for empty value at position 0. Shall i iterate the whole valuelist to search the empty value instead ?
					var item = $scope.model.valuelistID[0];
					if (item && (item.realValue === null || item.realValue === '')) {
						return true;
					}
				}
				return allowEmptyValue;
			}

			/**
			 * Set the focus to combobox.
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 * @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
			 */
			$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
				var inputEl = $element.find('select');
				if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID)
				{
					inputEl.unbind('focus');
					inputEl[0].focus();
					inputEl.bind('focus', $scope.handlers.onFocusGainedMethodID)
				}
				else
				{
					inputEl[0].focus();
				}			  
			}
		});
      },
      replace: true
    };
}]);