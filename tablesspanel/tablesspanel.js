angular.module('bootstrapcomponentsTablesspanel',['servoy']).directive('bootstrapcomponentsTablesspanel', ['$sabloApplication', '$q', '$animate', function($sabloApplication, $q, $animate) {  

	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			svyServoyapi: "=",
			handlers: "=svyHandlers",
			api: "=svyApi"
		},
		controller: function($scope, $element, $attrs) {
			
			// Animation should be enabled only when switching forms. Should not have animation upon first show or browser refresh
			$animate.enabled(false, $element);
			
			var realContainedForm;
			var formWillShowCalled;
			$scope.styleClass = $scope.model.styleClass;

			function setRealContainedForm (formname, relationname) {
				if ($scope.model.visible) {
					if (formWillShowCalled != formname && formname) {
						formWillShowCalled = formname;
						if ($scope.model.waitForData) {
							$q.when($scope.svyServoyapi.formWillShow(formname, relationname)).then(function() {
								realContainedForm = formname;
							});
						} else {
							$animate.enabled(false, $element);
							$scope.svyServoyapi.formWillShow(formname, relationname);
							realContainedForm = formname;
						}
					}
				} else {
					// panel is not visible; don't ask server to show child form as that would generate an exception on server
					realContainedForm = formWillShowCalled = undefined;
				}
			}

			$scope.getActiveTabUrl = function() {
				if (realContainedForm)
				{
					return $scope.svyServoyapi.getFormUrl(realContainedForm)
				}  
				setRealContainedForm($scope.model.containedForm, $scope.model.relationName);

				return "";
			}

			setRealContainedForm($scope.model.containedForm, $scope.model.relationName);

			$scope.$watch("model.containedForm", function(newValue,oldValue) {
				if (newValue !== oldValue)
				{
					if (oldValue) {
						// Animation should be enabled only when switching forms. Should not have animation upon first show or browser refresh
						$animate.enabled(true, $element);
						formWillShowCalled = newValue;
						$scope.svyServoyapi.hideForm(oldValue,null,null,newValue,$scope.model.relationName,null).then(function(ok) {
							realContainedForm = $scope.model.containedForm;
							
							// disable animation at the next digest loop
							$timeout(function () {
								$animate.enabled(false, $element);
							})

						})
					}
					else if (newValue) {
						setRealContainedForm(newValue, $scope.model.relationName);
					}
				}	
			});
			
			$scope.$watch("model.animation", function(newValue, oldValue) {
				
				var oldTransitionClass = getTransitionStyleClass(oldValue)
				if (oldTransitionClass) {
					$element.removeClass(oldTransitionClass);
				}
				
				var transitionClass = getTransitionStyleClass(newValue)
				if (transitionClass) {
					$element.addClass(transitionClass);
				}
			});
			
			function getTransitionStyleClass(value) {
				var transitionClass = '';
				switch (value) {
				case 'slide-top':
					transitionClass = 'bts-tablesspanel-slide-top';
					break;
				case 'slide-bottom':
					transitionClass = 'bts-tablesspanel-slide-bottom';
					break;
				case 'slide-left':
					transitionClass = 'bts-tablesspanel-slide-left';
					break;
				case 'slide-right':
					transitionClass = 'bts-tablesspanel-slide-right';
					break;
				default:
					break;
				}
				return transitionClass;
			}

			$scope.$watch("model.visible", function(newValue,oldValue) {
				if ($scope.model.containedForm && newValue !== oldValue)
				{
					formWillShowCalled = realContainedForm = undefined;
					if (newValue)
					{
						setRealContainedForm($scope.model.containedForm, $scope.model.relationName);
					}
					else
					{
						$scope.svyServoyapi.hideForm($scope.model.containedForm);
					}	
				}	
			});

			$scope.getContainerStyle = function() {
				var height = 0;
				if ($scope.model.height)
				{
					height = $scope.model.height
				}
				else if ($scope.model.containedForm && $sabloApplication.hasFormStateWithData($scope.model.containedForm))
				{
					// for absolute form default height is design height, for responsive form default height is 0
					var formState = $sabloApplication.getFormStateEvenIfNotYetResolved($scope.model.containedForm);
					if (formState && formState.absoluteLayout)
					{
						height = formState.properties.designSize.height; 
					}	  
				}	  
				return {position:"relative", minHeight:height+"px"};
			}

			$scope.showEditorHint = function()
			{
				return !$scope.model.containedForm && $element[0].getAttribute("svy-id") !== null;
			}

		},
		templateUrl: 'bootstrapcomponents/tablesspanel/tablesspanel.html'
	};
}]);
