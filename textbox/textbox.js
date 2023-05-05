angular.module('bootstrapcomponentsTextbox', ['servoy']).directive('bootstrapcomponentsTextbox', function($formatterUtils, $svyProperties, $sabloConstants, $timeout) {
    return {
        restrict: 'E',
        scope: {
            model: "=svyModel",
            api: "=svyApi",
            handlers: "=svyHandlers",
            svyServoyapi: '=svyServoyapi'
        },
        link: function($scope, $element, $attrs) {
        	$scope.model.showPass = false;
            var formatState = null;
            
            $scope.onClick = function(event){
                if ($scope.model.editable == false && $scope.handlers.onActionMethodID)
                {
                    $scope.handlers.onActionMethodID(event);
                }   
            }
            
            $scope.autoCompleteValue = function() {
                if ($scope.model.autocomplete && $scope.model.autocomplete != "off") {
                    return $scope.model.autocomplete;
                } else {
                    if (window.navigator.userAgent.match(/chrome/i)) {
                        return 'chrome-off';
                    } else {
                        return 'off';
                    }
                }
            }
            
            $scope.showHidePass = function() {
            	$scope.model.showPass = !$scope.model.showPass;
            }

            if ($scope.model.inputType === "text") {
                $scope.$watch('model.format', function() {
                    if ($scope.model.format) {
                        if (formatState)
                            formatState($scope.model.format);
                        else {
                            var child = $element.children();
                            var ngModel = child.controller("ngModel");
                            formatState = $formatterUtils.createFormatState(child, $scope, ngModel, true, $scope.model.format);
                        }
                    }
                })
            }

            var tooltipState = null;
            Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
                configurable: true,
                value: function(property, value) {
                    switch (property) {
                        case "selectOnEnter":
                            if (value) $svyProperties.addSelectOnEnter($element);
                            break;
                        case "toolTipText":
                            registerTooltip(value);
                            break;
                        case "visible":
                            if (!value) {
                                // visible is done via ng-if, formatState is not valid anymore
                                formatState = null;
                            } else if (!formatState && $scope.model.format && $scope.model.inputType === "text") {
                                // wait for element to become visible
                                $timeout(function() {
                                   if (!formatState && $scope.model.format && $scope.model.inputType === "text"){
                                        var child = $element.children();
                                        var ngModel = child.controller("ngModel");
                                        formatState = $formatterUtils.createFormatState(child, $scope, ngModel, true, $scope.model.format);
                                   }
                                });
                            }
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
             * Request the focus to this text field.
             * @example %%prefix%%%%elementName%%.requestFocus();
             * @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
             */
            $scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
                var inputEl = $element.find('input');

                if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
                    inputEl.unbind('focus');
                    inputEl[0].focus();
                    inputEl.bind('focus', $scope.handlers.onFocusGainedMethodID)
                }
                else {
                    inputEl[0].focus();
                }
            }
            var storedTooltip = false;
            // fill in the api defined in the spec file

            $scope.api.onDataChangeCallback = function(event, returnval) {
                var ngModel = $element.children().controller("ngModel");
                var stringValue = typeof returnval == 'string'
                if (returnval === false || stringValue) {
                    ngModel.$setValidity("", false);
                    if (stringValue) {
                        if (storedTooltip == false)
                            storedTooltip = $scope.model.toolTipText;
                        registerTooltip(returnval);
                    }
                }
                else {
                    ngModel.$setValidity("", true);
                    if (storedTooltip !== false) $scope.model.toolTipText = storedTooltip;
                    storedTooltip = false;
                    registerTooltip($scope.model.toolTipText);
                }
            }

            /**
             * Reset the dataProvider to null and change the inputType of the textbox.<br/>
             * <b>Note:</b> the value of the dataProvider bound to this field will be automatically set to null
             * @param {String} inputType allowed values for inputType are <i>text, password, email, tel, date, time, datetime-local, month, week, number, color</i>
             * @example %%prefix%%%%elementName%%.inputType("tel");
             */
            $scope.api.setInputType = function(inputType) {
                var types = ["text", "password", "password-with-eye", "email", "tel", "date", "time", "datetime-local", "month", "week", "number", "color","search", "url"];

                if (types.indexOf(inputType) > -1) {
                    $scope.model.dataProviderID = null;
                    $scope.model.inputType = inputType;
                    $scope.svyServoyapi.apply('dataProviderID');
                    $scope.svyServoyapi.apply('inputType');
                    return true;
                } else {
                    return false;
                }
            }  
        },
        controller: function ($scope, $element) {
			$scope.enterPressed = function(event)
			{
				if ($scope.model.dataProviderID !== undefined) {
					$scope.model.dataProviderID = $element.find('input').val();
					$scope.svyServoyapi.apply('dataProviderID');
				}
				if ($scope.handlers.onActionMethodID) {
					$scope.handlers.onActionMethodID(event)
				}
			};
		},
        templateUrl: 'bootstrapcomponents/textbox/textbox.html'
    };
})



