angular.module('bootstrapcomponentsCalendarinline',['servoy'])
.directive('bootstrapcomponentsCalendarinline',  function($sabloApplication, $log, $apifunctions, $svyProperties, $sabloConstants, $applicationService, $utils) {  
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			handlers: "=svyHandlers",
			api: "=svyApi",
			svyServoyapi: "="
		},
		link: function($scope, $element, $attrs) {
			$scope.renderFinished = function() {
				var child = $element.children();
				var options = {
						showTodayButton: true,
						calendarWeeks: $scope.model.calendarWeeks,
						useCurrent: false,
						inline: true
				}

				var locale = $sabloApplication.getLocale();
				if (locale.language) {
					options.locale = locale.language;
				}

				var showISOWeeks = $applicationService.getUIProperty('ngCalendarShowISOWeeks');
				if (showISOWeeks)
				{
					options.isoCalendarWeeks = true;
				}	

				child.datetimepicker(options);

				var theDateTimePicker = child.data('DateTimePicker');
				//this method sets locale tooltips for the buttons in the datepickers
				$utils.getI18NCalendarMessages(theDateTimePicker);

				$scope.$watch('model.format', function(){
					setDateFormat($scope.model.format);
				})
				
				var dateFormat = 'YYYY-MM-DD';
				
				// helper function
				function setDateFormat(format){
					if(format && format.display){
						dateFormat = moment().toMomentFormatString(format.display);
					}
					if ($scope.model.format && $scope.model.format.isMask)
					{
						// delete shortcut clears the date; this interferes(behaves strange) with mask, so cancel the shortcut in this scenario 
						var defaultBinding = theDateTimePicker.keyBinds();
						defaultBinding.delete = function (widget) {
							// nop
						}
					}
                    var editFormat = $scope.model.format ?  ($scope.model.format.edit ? $scope.model.format.edit : $scope.model.format.display ): null;
                    if (editFormat && editFormat.indexOf('MMM') >= 0)
                    {
                        // disable today shortcut if month appears as text when editing 
                        var defaultBinding = theDateTimePicker.keyBinds();
                        defaultBinding.t = function (widget) {
                            // nop
                        }
                    }
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) { // can be undefined in find mode
						x.format(dateFormat);
						try {
							$element.off("dp.change",inputChanged);
							x.date(angular.isDefined(ngModel.$viewValue) && !isNaN(ngModel.$viewValue) ? ngModel.$viewValue : null);
						}
						finally {
							$element.on("dp.change",inputChanged);
						}
					}
				}

				function inputChanged(e) {
					if (e.date) {
						$scope.model.dataProviderID = e.date.toDate();
					} else {
						$scope.model.dataProviderID = null;
					}
					$scope.svyServoyapi.apply('dataProviderID');
				}

				$element.on("dp.change",inputChanged);

				function togglePickerEnabled() {
					//this will toggle the "Select time" button, depending on the state of the calendar (enabled/disabled)		
					var toggle = child.find('a[data-action="togglePicker"]');
					if ($scope.model.enabled) {
						if(toggle.length > 0) toggle[0].style.display = 'block';
					} else {
						if(toggle.length > 0) toggle[0].style.display = 'none';
					}
				}

				$element.on("dp.show",togglePickerEnabled);

				$scope.api.getWidth = $apifunctions.getWidth($element[0]);
				$scope.api.getHeight = $apifunctions.getHeight($element[0]);
				$scope.api.getLocationX = $apifunctions.getX($element[0]);
				$scope.api.getLocationY = $apifunctions.getY($element[0]);

				var element = $element.children().first();
				var inputElement = element.children().first();

				var tooltipState = null;
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
					configurable : true,
					value : function(property, value) {
						switch (property) {
						case "dataProviderID":
							try {
								$element.off("dp.change",inputChanged);
								var x = child.data('DateTimePicker');
								if (angular.isDefined(x)) {
									x.date(value);
								}
							} finally {
								$element.on("dp.change",inputChanged);
							}
							break;
						case "toolTipText":
							if (tooltipState)
								tooltipState(value);
							else
								tooltipState = $svyProperties.createTooltipState(inputElement, value);
							break;
						case "enabled":				    
							var x = child.data('DateTimePicker');
							if (value) {
								x.enabledDates(false);
								if ($scope.model.disabledDates) {
									disableDates($scope.model.disabledDates);
								}
								//show today button when the calendar is enabled
								theDateTimePicker.showTodayButton(true);
							} else {
								// add a random date, that is incorrect, to trick the datepicker to disable the whole month
								x.enabledDates([moment(0,0,0)]);
								//hide today button when the calendar is disabled
								theDateTimePicker.showTodayButton(false);
							}
							break;	
						}
					}
				});
				if ($scope.model.disabledDays)
				{
					theDateTimePicker.daysOfWeekDisabled($scope.model.disabledDays);
				}	
				if ($scope.model.disabledDates)
				{
					theDateTimePicker.disabledDates($scope.model.disabledDates);
				}
				if ($scope.model.maxDate)
				{
					theDateTimePicker.maxDate($scope.model.maxDate);
				}	
				if ($scope.model.minDate)
				{
					theDateTimePicker.minDate($scope.model.minDate);
				}

				var destroyListenerUnreg = $scope.$on("$destroy", function() {
					destroyListenerUnreg();
					delete $scope.model[$sabloConstants.modelChangeNotifier];
				});
				// data can already be here, if so call the modelChange function so
				// that it is initialized correctly.
				var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (var key in $scope.model) {
					modelChangFunction(key, $scope.model[key]);
				}
			}
		},
      templateUrl: 'bootstrapcomponents/calendarinline/calendarinline.html'
    };
  })