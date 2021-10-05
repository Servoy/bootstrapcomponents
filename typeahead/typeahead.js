angular.module('bootstrapcomponentsTypeahead', ['servoy']).directive('bootstrapcomponentsTypeahead', ['formatFilterFilter','$svyProperties','$sabloConstants','$formatterUtils', '$timeout', function(formatFilter,$svyProperties, $sabloConstants,$formatterUtils, $timeout) {
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			svyServoyapi: "=",
			handlers: "=svyHandlers",
			api: "=svyApi"
		},
		link: function($scope, $element) {
            $scope.autoCompleteValue = function() {
                if(window.navigator.userAgent.match(/chrome/i)) {
                    return 'chrome-off';
                } else {
                    return 'off';
                }
            }
			// add custom class to the popup, needed by ng-grids (ag-grid) so it can be used in form editors (popups)
			$timeout(function() {
				var ariaOwns = $element.attr("aria-owns");
				$("#" + ariaOwns).addClass("ag-custom-component-popup");
			}, 0, false);

            $scope.getCorrectMatchTemplate = function() {
                if($scope.model.showAs == 'text') {
                    return 'bootstrapcomponents/typeahead/typeahead-match.html';
                } else {
                    //Return the bootstrap angular-ui default template
                    return 'uib/template/typeahead/typeahead-match.html';
                }
            }
            
			$scope.onFocus = function(){
				$scope.startedTyping = false;
				angular.element("[move-in-progress]").css("min-width",$element.outerWidth()+"px");
				return true;
			};

			$element.on('keydown', function(evt) {
				if (evt.which != 9)
				{
					$scope.startedTyping = true;
				}	
			});
			
			$scope.ngModel = $element.controller('ngModel');

			var resolvingDisplayValue = false;

			var hasRealValues = undefined;

			function getParentFormName() {
				var parentForm = $scope.$parent;

				while(parentForm && !parentForm.hasOwnProperty('formname')) {
					parentForm = parentForm.$parent;
				}

				return parentForm ? parentForm['formname'] : null;
			}

			$scope.$watch('model.isOpened', function(){
				var bodyElements = document.querySelectorAll('.svy-body,.ui-grid-viewport');
				for(var i = 0; i < bodyElements.length; i++){
					if($scope.model.isOpened)
						bodyElements[i].addEventListener('scroll',$scope.fireRecalculating);
					else bodyElements[i].removeEventListener('scroll',$scope.fireRecalculating);
				}
			})

			$scope.$watch('model.valuelistID', function() {
				if (!$scope.model.valuelistID) return; // not loaded yet or already filtered
				hasRealValues = false;
				if ($scope.model.valuelistID.hasRealValues)
				{	
					hasRealValues = $scope.model.valuelistID.hasRealValues()
				}
				else
				{
					for (var i = 0; i < $scope.model.valuelistID.length; i++) {
						var item = $scope.model.valuelistID[i];
						if (item.realValue != item.displayValue) {
							hasRealValues = true;
							break;
						}
					}
				}	
			});

			$scope.$watch('model.dataProviderID', function() {
				$timeout(function() { 
					if (!hasRealValues)
					{
						$scope.value = $scope.model.dataProviderID;
					}
					else
					{
						var found = false;
						for (var i = 0; i < $scope.model.valuelistID.length; i++) {
							var item = $scope.model.valuelistID[i];
							if ((item.realValue + '') === ($scope.model.dataProviderID + '')) {
								$scope.value = item.displayValue;
								found = true;
								break;
							}
						}
						if(!found)
						{
							$scope.value = null;
							// getDisplayValue does not need parentFormName starting from Servoy 2020.09
							$scope.model.valuelistID.getDisplayValue($scope.model.dataProviderID, getParentFormName()).then(function(displayValue) {
								$scope.value = displayValue;
							});
						}	
					}	
				}, 50, true);
			});

			$scope.doSvyApply = function(force, event) {
				// when there is no input, we add a &nbsp;, see the template, that we just remove here,
				// to have the correct value;
				if($scope.value && $scope.value.length == 1) {
					$scope.value = $scope.value.trim();
				}
				if (force ||  !$scope.model.isOpened) {  // when drodown list is not shown
					if ($scope.model.valuelistID) {
						var hasMatchingDisplayValue = false;
						for (var i = 0; i < $scope.model.valuelistID.length; i++) {
							if ($scope.value === $scope.model.valuelistID[i].displayValue) {
								if (($scope.model.dataProviderID + '') === ($scope.model.valuelistID[i].realValue+''))
								{
									// same value, do not send again to server
									return;
								}
								$scope.model.dataProviderID = $scope.model.valuelistID[i].realValue;
								hasMatchingDisplayValue = true;
								break;
							}
						}
						if (!hasMatchingDisplayValue) 
						{
							if (hasRealValues) 
							{
								searchSelection();
								return;
							}
							else
							{
								$scope.model.dataProviderID = $scope.value;
							}
						}
					}
					else
					{
						$scope.model.dataProviderID = $scope.value;
					}  
					$scope.svyServoyapi.apply('dataProviderID');
				}
				else if (!hasRealValues && ($scope.model.dataProviderID != $scope.value)) // when valuelist has no realValues apply the change to the dataprovider
				{
                    var apply = true;
                    if (event && event.originalEvent && event.originalEvent.relatedTarget) {
                        apply = !event.originalEvent.relatedTarget.parentElement.classList.contains("uib-typeahead-match");
                    }
                    if (apply) {
                        $scope.model.dataProviderID = $scope.value;
                        $scope.svyServoyapi.apply('dataProviderID');
                    } else {
                        $timeout(function(triggerValue){
                            if (triggerValue == $scope.value) {
                                $scope.doSvyApply(true);
                            }
                        },100,true,$scope.value)
                    }
				} else if (hasRealValues) { // when valuelist has realValues and the user focus out from typeahead without clicking on a dropdown item
			
					if ($scope.model.valuelistID) {

						// check if the selected value is in valuelist
						var found = false;
						// search for displayValue in valuelist
						for (var i = 0; i < $scope.model.valuelistID.length; i++) {
							if ($scope.value === $scope.model.valuelistID[i].displayValue) {
								$scope.model.dataProviderID = $scope.model.valuelistID[i].realValue;
								found = true;
								break;
							}
						}
						
						// if no displayValue is found search serverside
						if(!found) {
							searchSelection();
						} else {
							$scope.svyServoyapi.apply('dataProviderID');
						}
					} else {	// if there is no valuelist
						$scope.model.dataProviderID = $scope.value;
						$scope.svyServoyapi.apply('dataProviderID');
					}  
				}
				
				// revert selection to last value
				function searchSelection() {
					
					// check if the typed value exists serverside before reverting
					$scope.model.valuelistID.filterList($scope.value).then(function(list) {
						
						// check if the value exists serverside
						var hasMatchingDisplayValueServerSide = false;
						if (list && list.length) {
							for (var i = 0; i < $scope.model.valuelistID.length; i++) {
								if ($scope.value === $scope.model.valuelistID[i].displayValue) {
									$scope.model.dataProviderID = $scope.model.valuelistID[i].realValue;
									$scope.svyServoyapi.apply('dataProviderID');
									hasMatchingDisplayValueServerSide = true;
									break;
								}
							}
						}
						
						// if no matching value found serverside revert selection to last dataProviderID
						if (!hasMatchingDisplayValueServerSide) {
							// getDisplayValue does not need parentFormName starting from Servoy 2020.09
							$scope.model.valuelistID.getDisplayValue($scope.model.dataProviderID, getParentFormName()).then(function(displayValue) {
								$scope.value = displayValue;
							});
						}
					});
					// TODO should handle promise error ?
				}
			}

			var storedTooltip = false;
			$scope.api.onDataChangeCallback = function(event, returnval) {
				var stringValue = typeof returnval == 'string'
					if (returnval === false || stringValue) {
						$scope.ngModel.$setValidity("", false);
						if (stringValue) {
							if (storedTooltip == false)
								storedTooltip = $scope.model.toolTipText;
							registerTooltip(returnval);
						}
					} 
					else {
						$scope.ngModel.$setValidity("", true);
						if (storedTooltip !== false) $scope.model.toolTipText = storedTooltip;
						storedTooltip = false;
						registerTooltip($scope.model.toolTipText );
					}
			}
			
			var tooltipState = null;
			var formatState = null;
			Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
				configurable: true,
				value: function(property, value) {
					switch (property) {
					case "toolTipText":
						registerTooltip(value);
						break;
					case "format":
						if (formatState)
							formatState(value);
						else formatState = $formatterUtils.createFormatState($element, $scope,$scope.ngModel,true,value);
						break;
					case "selectOnEnter":
						if (value) $svyProperties.addSelectOnEnter($element);
						break;
					}
				}
			});
			
			 function registerTooltip(value) {
	    		  if (tooltipState)
					  tooltipState(value);
				  else
					  tooltipState = $svyProperties.createTooltipState($element, value);
	    	  }
			 
			var destroyListenerUnreg = $scope.$on("$destroy", function() {
				destroyListenerUnreg();
				delete $scope.model[$sabloConstants.modelChangeNotifier];
			});
			// data can already be here, if so call the modelChange function so
			// that it is initialized correctly.
			var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (key in $scope.model) {
				modelChangFunction(key, $scope.model[key]);
			}

			/**
			 * Request the focus to this typeahead.
			 * 
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 * @param mustExecuteOnFocusGainedMethod
			 *            (optional) if false will not execute the onFocusGained
			 *            method; the default value is true
			 */
			$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
				if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
					$element.unbind('focus');
					$element[0].focus();
					$element.bind('focus', $scope.handlers.onFocusGainedMethodID)
				} else {
					$element[0].focus();
				}
			}
		},
		templateUrl: 'bootstrapcomponents/typeahead/typeahead.html',
		replace: true
	};
}])
