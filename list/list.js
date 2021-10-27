angular.module('bootstrapcomponentsList', ['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsList', ['$log', '$svyProperties', '$sabloConstants', '$filter', '$utils', '$timeout', function($log, $svyProperties, $sabloConstants, $filter, $utils, $timeout) {
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
            $scope.inputRenderFinished = function() {
                var inputEl = $element.find('input');

                function updateInput(listValue) {
                    if ($scope.model.valuelistID) {
                        var showDisplayValueFilter = $filter("bcShowDisplayValue");
                        listValue = showDisplayValueFilter(listValue, $scope.model.valuelistID, true, true);
                    }

                    inputEl.val(listValue);
                }

                function updateDataprovider() {
                    var listValue = inputEl.val();

                    if ($scope.model.valuelistID) {
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

                    if ($scope.model.dataProviderID !== listValue) {
                        $scope.model.dataProviderID = listValue;
                        $scope.svyServoyapi.apply("dataProviderID");
                    }
                    else {
                        updateInput(listValue);
                    }
                }


                $scope.$watch('model.dataProviderID', function(newValue, oldValue) {
                    updateInput(newValue);
                })

                $scope.onChange = function() {
                    updateDataprovider();
                }

                $scope.renderFinished = function() {
                    $timeout(function() {
                        DatalistPolyFill.apply(inputEl.get(0));
                    });
                }

                var tooltipState = null;
                Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
                    configurable: true,
                    value: function(property, value) {
                        switch (property) {
                            case "toolTipText":
                                if (tooltipState)
                                    tooltipState(value);
                                else
                                    tooltipState = $svyProperties.createTooltipState($element, value);
                                break;
                        }
                    }
                });
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
                 * Set the focus to the list input
                 * @example %%prefix%%%%elementName%%.requestFocus();
                 * @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
                 */
                $scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
                    if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
                        inputEl.unbind('focus');
                        inputEl[0].focus();
                        inputEl.bind('focus', $scope.handlers.onFocusGainedMethodID)
                    }
                    else {
                        inputEl[0].focus();
                    }
                }
            }
        },
        templateUrl: 'bootstrapcomponents/list/list.html'
    };
}]);