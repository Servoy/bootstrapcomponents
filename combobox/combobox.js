angular.module('bootstrapcomponentsCombobox', ['servoy', 'ui.select'])
.directive('bootstrapcomponentsCombobox', ['$timeout', '$apifunctions','$sabloConstants','$svyProperties','$applicationService', '$animate', function ($timeout, $apifunctions,$sabloConstants,$svyProperties,$applicationService,$animate) {
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			api: "=svyApi",
			handlers: "=svyHandlers",
			svyServoyapi: "="
		},
		controller: function ($scope) {
			$scope.style = {
					height: '100%',
					width: '100%'
			};

			$scope.findMode = false;
			var enableFilter = $applicationService.getUIProperty('Combobox.enableFilter');
			$scope.enablefilter = enableFilter !== undefined && enableFilter != null ? enableFilter : true;
		},
		link: function (scope, element, attrs) {
			// workaround for ui-select issue, that sets the select items formatter (scope.$$childHead.$select.parserResult) too late 
			if(scope.$$childHead && scope.$$childHead.$select && (scope.$$childHead.$select.parserResult == undefined)) {
				scope.$$childHead.$select.parserResult = { source: function() { return undefined }};	
			} 
			
			scope.$watch("model.format", function (newVal) {
				if (newVal && newVal["text-transform"]) {
					scope.style["text-transform"] = newVal["text-transform"];
				}
			});

			
			var skipFocusGained = false;
			/**
	    	* Request the focus to this combobox.
	    	* @example %%prefix%%%%elementName%%.requestFocus();
	    	* @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
	    	*/
			scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) { 
				var input = element.find('.ui-select-focusser');
				skipFocusGained = mustExecuteOnFocusGainedMethod === false && scope.handlers.onFocusGainedMethodID;
				input[0].focus();
			}
			if (scope.handlers.onFocusGainedMethodID || scope.handlers.onFocusLostMethodID) {
				var dereg = scope.$watch(function() {
					return element.find('.ui-select-search')[0];
				}, function(value) {
					if (!value) return;
					dereg();
					var hasFocus = false;
					var searchBox = element.find('.ui-select-search');
					var focusElement = element.find('.ui-select-focusser');
					if (scope.handlers.onFocusGainedMethodID) {
						function focus(e) {
							if (!hasFocus) {
								hasFocus = true;
								if (!skipFocusGained) scope.handlers.onFocusGainedMethodID(e);
							}
							skipFocusGained = false;
						}
						searchBox.on('focus', focus);
						focusElement.on('focus', focus);
					}
					if (scope.handlers.onFocusLostMethodID) {
						function blur(e) {
							var currentElement = $(document.activeElement);
							if (currentElement.is('body'))
							{
								// we are not sure if focus is really lost or just temporarily transfered to body, we need to wait a bit
								$timeout(function () {
									var currentElement = $(document.activeElement)
									if (currentElement.parents(".ui-select-container,.ui-select-choices").length == 0) {
										hasFocus = false;
										scope.handlers.onFocusLostMethodID(e);
									}
								},200);
							}
							else
							{
								if (currentElement.parents(".ui-select-container,.ui-select-choices").length == 0) {
									hasFocus = false;
									scope.handlers.onFocusLostMethodID(e);
								}
							}	
						}
						searchBox.on('blur', blur);
						focusElement.on('blur', blur);
					}
				})
			} 	

			var storedTooltip = false;
			scope.api.onDataChangeCallback = function(event, returnval) {
				var ngModel = element.children().controller("ngModel");
				var stringValue = (typeof returnval === 'string' || returnval instanceof String);
				if (returnval === false || stringValue) {
					element[0].focus();
					ngModel.$setValidity("", false);
					if (stringValue) {
						if (storedTooltip === false) { 
							storedTooltip = scope.model.toolTipText; 
						}
						scope.model.toolTipText = returnval;
					}
				}
				else {
					ngModel.$setValidity("", true);
					if (storedTooltip !== false) scope.model.toolTipText = storedTooltip;
					storedTooltip = false;
				}
			};

			scope.onItemSelect = function (event) {
				$timeout(function () {
					scope.svyServoyapi.apply('dataProviderID');
					if (scope.handlers.onActionMethodID) {
						scope.handlers.onActionMethodID(event?event:$.Event("click"));
					}
				}, 0);
			};
		},
		templateUrl: 'bootstrapcomponents/combobox/combobox.html'
	};
}])
.filter('emptyOrNull', function () {
	return function (item) {
		if (item === null || item === '') {return '&nbsp;'; }
		return item;
	};
})
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
				if ((realValue + '') === (valuelist[i].realValue + '')) {
					return valuelist[i].displayValue;
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
				return diplayValue;
			}
			if (valuelist.length == 0) return null;
		}
		return input;
	};
});
