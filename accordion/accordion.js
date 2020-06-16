angular.module('bootstrapcomponentsAccordion', ['servoy'])
.directive('bootstrapcomponentsAccordion', function($timeout, $window) {
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			servoyApi: "=svyServoyapi",
			handlers: "=svyHandlers",
			api: "=svyApi"
		},
		controller: function($scope, $element, $attrs) {
	
			if ($scope.servoyApi.isInDesigner()) return;
	
			var getTabIndex = function(tab) {
				if ($scope.model.tabs && tab) {
					for (var i = 0; i < $scope.model.tabs.length; i++) {
						if ($scope.model.tabs[i] == tab) {
							return i;
						}
					}
				}
				return -1;
			}


			var groupHeaderHeight = 39;
			var activeGroupHeaderHeight = 37;
			var scrollHeight = 15;

			var updateViewportStyle = function() {
				var h = $element.children(0).height();
				if(h < 2) h = $scope.model.height;
				 h = h - ($scope.model.tabs.length - 1) * groupHeaderHeight - activeGroupHeaderHeight - scrollHeight;
				$scope.viewportStyle = {
					height: h + "px"
				};
			}

			// window resize doesn't update the model size
			$window.addEventListener('resize',function() { 
				updateViewportStyle();
			});

			var currentTab = null;
			var currentContainedForm = null;
			
			/**
			 * @private 
			 * Get the first enabled tab
			 * */
			var getFirstEnabledTabIndex = function() {
				for (var i = 0; $scope.model.tabs && i < $scope.model.tabs.length; i++) {
					var tab = $scope.model.tabs[i];
					if (tab.disabled !== true) {
						return i + 1;
					}
				}
				// TODO can be refactored to return 0 ?
				return -1;
			}
			
			/**
			 * @private 
			 * @param {Number} skipIndex ignore the tab at the given index
			 * Get the first enabled tab not at index 
			 * */
			var getFirstEnabledTabIndexNotAtIndex = function(skipIndex) {
				for (var i = 0; $scope.model.tabs && i < $scope.model.tabs.length; i++) {
					var tab = $scope.model.tabs[i];
					if (tab.disabled !== true && (skipIndex !== i +1 )) {
						return i + 1;
					}
				}
				// TODO can be refactored to return 0 ?
				return -1;
			}
			
			// get the form html.
			$scope.getForm = function(tab) {
				if (tab && tab.active && tab.containedForm) {
					if (currentContainedForm !== tab.containedForm) {
						if (currentContainedForm != null && currentTab == tab) {
							// this was a change
							// temp set it to false, so it will not show the new form yet.
							tab.active = false;
							var promise = $scope.servoyApi.hideForm(currentContainedForm, null, null, tab.containedForm, tab.relationName);
							promise.then(function(ok) {
								// we can't do much more then to set the back to true.
								// maybe if 'ok' is false we should also push back the previous form??
								tab.active = true;
							})
						}
						currentContainedForm = tab.containedForm;
						currentTab = tab;
						if (!tab.active) return "";
					}
					else
					{
						// keep latest instance
						currentTab = tab;
					}	
					return $scope.servoyApi.getFormUrl(tab.containedForm);
				}
				return "";
			}
	
			$scope.getActiveForm = function(tab) {
				if (tab && tab.active == true) {
					return $scope.servoyApi.getFormUrl(tab.containedForm);
				}
				return "";
			}

			$scope.select = function(tab, oldSelection) {
				if (tab && tab.containedForm) {
					if (oldSelection === -1) {
						$scope.model.tabIndex = getTabIndex(tab) + 1;
						tab.active = true;
					} else if ($scope.model.tabs[$scope.model.tabIndex - 1] == tab || !$scope.model.tabs[$scope.model.tabIndex - 1]) {
						
						
						$scope.servoyApi.formWillShow(tab.containedForm, tab.relationName);
						if (oldSelection !== undefined && oldSelection !== null && $scope.handlers.onChangeMethodID) {
							var newSelection = getTabIndex(tab);
							$timeout(function() {
								// fire onChangeMethod only if tabIndex actually changed
								if (newSelection != oldSelection) {
									$scope.handlers.onChangeMethodID(oldSelection + 1, $window.event ? $window.event : $.Event("change"));
								}
								}, 0);
						} 
					} else {
						tab.active = false;
						$scope.model.tabs[$scope.model.tabIndex - 1].active = true;
						var promise = $scope.servoyApi.hideForm($scope.model.tabs[$scope.model.tabIndex - 1].containedForm, null, null, tab.containedForm, tab.relationName);
						promise.then(function(ok) {
							if (ok) {
								$scope.model.tabs[$scope.model.tabIndex - 1].active = false;
								var oldIndex = $scope.model.tabIndex;
								$scope.model.tabIndex = getTabIndex(tab) + 1;
								tab.active = true;
								// onChange handler no longer fired here, but from the watch on model.tabIndex
							} else {
								$scope.model.tabs[$scope.model.tabIndex - 1].active = true;
								$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
							}
						})
					}
				}
			}
	
			if ($scope.model.tabs && $scope.model.tabs.length > 0) {
				
				// check the latest enabled tab
				var index = $scope.model.tabIndex;
				if ($scope.model.tabs[index - 1] && $scope.model.tabs[index - 1].containedForm && $scope.model.tabs[index - 1].disabled !== true) {
					// index is in a proper state
				} else { // find the first enabled tab
					index = getFirstEnabledTabIndex();
					if (index === -1) {
						index = 0;
					}
				}
				
				if ($scope.model.tabs[index - 1] && $scope.model.tabs[index - 1].containedForm) {
					// make sure everything is correctly initialized
					for(i=0; i<$scope.model.tabs.length; i++) {
						$scope.model.tabs[i].active = false;
					}
					// find the first enabled tab
					$scope.model.tabIndex = index;
					$scope.model.tabs[index - 1].active = true;
					$scope.servoyApi.formWillShow($scope.model.tabs[index - 1].containedForm, $scope.model.tabs[index - 1].relationName);
				}
			}
	
			$scope.$watch("model.tabIndex", function(newValue, oldValue) {
					// if the already selected tab has been disabled by the programmer, is a programmer issue so let it go
				
					if (newValue !== oldValue) {
//						// when all tabs are disabled. Don't do anything, restoring previous value may lead to a digest loop
//						if (oldValue === 0 && $scope.model.tabs[newValue - 1]) {
//							// restoring from a previous value, all fine
//							return;
//						}
						
						if ($scope.model.tabIndex === 0 && getFirstEnabledTabIndex() === -1 ) {
							// when all tabs are disabled. Keep the index to 0 and do nothing
							return;
						} else if ($scope.model.tabIndex === 0 && $scope.model.tabs[oldValue - 1] && $scope.model.tabs[oldValue - 1].disabled === true) { 
							// when the previous tab was disabled and it tried to switch to a disabled tab, revert to old value: 0
							$scope.model.tabIndex = oldValue;
							return;
						} else if (!$scope.model.tabs[newValue - 1]) {
							// invalid state: when there is not a tab at tabIndex, revert to old value
							$scope.model.tabIndex = oldValue;
							return;
						} else if ($scope.model.tabs && $scope.model.tabs[newValue - 1] && $scope.model.tabs[newValue - 1].disabled === true) {
							// invalid state: when the new tab index is disabled, revert to oldTab
							// it can end-up in a digest loop if the oldTab is disabled and it tries to switch to a new disabled tab
							if (!$scope.model.tabs[oldValue-1] || ($scope.model.tabs[oldValue - 1] && $scope.model.tabs[oldValue - 1].disabled === true)) {
								// when this happen go to the first available tab, if any
								newValue = getFirstEnabledTabIndex();
								if (newValue === -1) {
									newValue = 0;
								}
								$scope.model.tabIndex = newValue;
								
								// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
								$timeout(function() {
									$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
								}, 0);
								
								return;
							} else {
								// revert to the old value
								$scope.model.tabIndex = oldValue;
								return;
							}
						}
						// else hide/show old/new form
						
						if (oldValue && $scope.model.tabs[oldValue - 1]) {
							$scope.servoyApi.hideForm($scope.model.tabs[oldValue - 1].containedForm);
							$scope.model.tabs[oldValue - 1].active = false;
						}
						if (newValue) {
							var promise = $scope.servoyApi.formWillShow($scope.model.tabs[newValue - 1].containedForm, $scope.model.tabs[newValue - 1].relationName);
							$scope.model.tabs[newValue - 1].active = true;
						}
						if ($scope.handlers.onChangeMethodID) {
							$timeout(function() {
								$scope.handlers.onChangeMethodID(oldValue, $window.event ? $window.event : $.Event("change"));
							}, 0);
						}
					}
					// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
					$timeout(function() {
						$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
						}, 0);
					
				});
	
			$scope.$watch("model.visible", function(newValue, oldValue) {
					if ($scope.model.tabIndex && newValue !== oldValue && $scope.model.tabs && $scope.model.tabs[$scope.model.tabIndex - 1] && $scope.model.tabs[$scope.model.tabIndex - 1].containedForm) {
						if (newValue) {
							$scope.servoyApi.formWillShow($scope.model.tabs[$scope.model.tabIndex - 1].containedForm, $scope.model.tabs[$scope.model.tabIndex - 1].relationName);
						} else {
							$scope.servoyApi.hideForm($scope.model.tabs[$scope.model.tabIndex - 1].containedForm);
						}
					}
				});
	
			$scope.$watch("model.tabs", function(newValue, oldValue) {
					if (newValue != oldValue) {
						var oldTab = oldValue && oldValue.length > 0 && oldValue[$scope.model.tabIndex - 1] ? oldValue[$scope.model.tabIndex - 1] : null;
						var oldForm = oldTab ? oldTab.containedForm : null;
						var newTabIndex = $scope.model.tabIndex;
						if (!newValue || newValue.length == 0) {
							newTabIndex = 0;
						} else if (newValue.length < newTabIndex) {
							newTabIndex = newValue.length - 1;
						} else if (newValue && newValue.length > 0 && !newTabIndex) {
							newTabIndex = 1;
						}
						var newTab = newValue && newValue.length > 0 ? newValue[newTabIndex - 1] : null;
						var newForm = newTab ? newTab.containedForm : null;
						if (newForm != oldForm) {
							if (oldForm) $scope.servoyApi.hideForm(oldForm);
							if (newForm && newTab.disabled !== true) $scope.servoyApi.formWillShow(newForm, newValue[newTabIndex - 1].relationName);
						} else if (newForm == oldForm && newTab && oldTab && newTab.disabled !== true && oldTab.disabled === true) {
							// if the selected tab was previously disabled then call formWillShow. 
							// Actually would be called only if the disabled form was selected by never had a formWillShow. Calling it twice it shouldn't harm
							if (newForm && newTab.disabled !== true) $scope.servoyApi.formWillShow(newForm, newValue[newTabIndex - 1].relationName);
						}
						
						if (newTabIndex != $scope.model.tabIndex) {
							$scope.model.tabIndex = newTabIndex;
						} else if (newTabIndex > 0) {
							$scope.model.tabs[newTabIndex - 1].active = true;
							
							// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
							$timeout(function() {
									$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
								}, 0);
						}
					}
				});
	
			$scope.getContainerStyle = function() {
				return { position: "relative", minHeight: $scope.model.height + "px" };
			}
	
			$scope.showEditorHint = function() {
				return (!$scope.model.tabs || $scope.model.tabs.length == 0) && $scope.servoyApi.isInDesigner();
			}
			
			$scope.api.selectTabAt = function(idx) {
					var previousIndex = $scope.model.tabIndex - 1;
					$scope.model.activeTabIndex = previousIndex;
					var tab = $scope.model.tabs[idx]
					
					// don't select disabled tab
					if (tab.disabled === true) {
						return;
					}

					$scope.select(tab, previousIndex);
			}
		
			$scope.api.removeTabAt = function(removeIndex) {
				// copied from the serverside code
				if (removeIndex > 0 && removeIndex <= $scope.model.tabs.length) {
					var oldTabIndex = $scope.model.tabIndex;
					var formToHide;
					var formToShow;
					if ($scope.model.tabIndex === removeIndex) {
						formToHide = $scope.model.tabs[removeIndex - 1];

						var nextIndex = getFirstEnabledTabIndexNotAtIndex($scope.model.tabIndex)
						// if the tabIndex after removal will remain the same after removal, shall force showForm
						if ((nextIndex > -1 && nextIndex === $scope.model.tabIndex + 1) && $scope.model.tabs.length > 1) {
							console.log("index will not change")
							// get the tab at second position
							formToShow = $scope.model.tabs[nextIndex - 1];
						}
					}

					// remove the tab
					// create a new tabObject, so angular-ui is properly refreshed.
					var newTabs = [];
					for (var i = 0; i < $scope.model.tabs.length; i++) {
						if (i == removeIndex - 1) continue;
						newTabs.push($scope.model.tabs[i]);
					}
					$scope.model.tabs = newTabs;
					
					// $scope.model.tabs.splice(removeIndex - 1, 1);
					
					//	for (var i = removeIndex - 1; i < $scope.model.tabs.length - 1; i++) {
					//		$scope.model.tabs[i] = $scope.model.tabs[i + 1];
					//	}
					//	$scope.model.tabs.length = $scope.model.tabs.length - 1;

					// update the tabIndex
					if ($scope.model.tabIndex >= removeIndex) {
						if ($scope.model.tabIndex === removeIndex) {
							var newTabIndex = getFirstEnabledTabIndex();
							if (newTabIndex > - 1) {
								$scope.model.tabIndex = newTabIndex;
							} else {
								// deselect all tabs setting tabIndex to 0
								$scope.model.tabIndex = 0;
								newTabIndex = 0;
							}
						} else {
							$scope.model.tabIndex--;
						}
					}

					// hide the form
					if (formToHide) {
						// hide the current form
						if (formToHide.containedForm && !formToShow) {
							// TODO what if doesn't hide ?
							$scope.servoyApi.hideForm(formToHide.containedForm);
							if (formToHide.active) {
								formToHide.active = false;
							}
						}

						// show the next form if the tabIndex was 1 and has not changed
						if (formToShow && formToShow.containedForm) {
							// This will happen only when the first tab is the visible tab and i am closing the first tab.
							// The previous tab already call the onHide.. here i force the onShow of the "next" tab.. since the $scope.model.tabIndex doesn't change
							// Using ng-repeat="tab in model.tabs track by $index" to make angularui aware of the change.
							
							// show the tab
							if (!formToShow.active) {
								formToShow.active = true;
							}
							$scope.servoyApi.formWillShow(formToShow.containedForm, formToShow.relationName);
							if ($scope.handlers.onChangeMethodID) {
								$timeout(function() {
										$scope.handlers.onChangeMethodID(1, $window.event ? $window.event : $.Event("change"));
									}, 0);
							}
						}
						// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
						$timeout(function() {
								$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
							}, 0);
						return true;
					}
					// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
					$timeout(function() {
							$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
						}, 0);
					return true;
				}
				return false;
			}
		},
		templateUrl: 'bootstrapcomponents/accordion/accordionpanel.html'
	}
})