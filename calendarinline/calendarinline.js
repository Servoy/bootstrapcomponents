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
				var ngModel = child.controller("ngModel");
				
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


				function inputChanged(e) {
					if (e.date) {
						$scope.model.dataProviderID = e.date.toDate();
					} else {
						$scope.model.dataProviderID = null;
					}
					$scope.svyServoyapi.apply('dataProviderID');
				}
				
				// when model change, update our view, set the date in the datepicker
				ngModel.$render = function() {
					try {
						$element.off("dp.change",inputChanged);
						var x = child.data('DateTimePicker');
						if (x && !$scope.model.findmode) x.date(angular.isDefined(ngModel.$viewValue) ? ngModel.$viewValue : null); // set default date for widget open; turn undefined to null as well (undefined gives exception)
						else {
							// in find mode 
							child.children("input").val(ngModel.$viewValue);
						}
					} finally {
						$element.on("dp.change",inputChanged);
					}
				};

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

				/** 
				 * @param {Array<Date>} dateArray
				 * 
				 * Dates that should be disabled.
				 */
				$scope.api.disableDates = function(dateArray) {
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) {
						if(dateArray && dateArray.length > 0) {
							x.disabledDates(dateArray);
							$scope.model.disabledDates = dateArray;
						} else {
							x.disabledDates(false);
							$scope.model.disabledDates = null;
						}
					}
				};

				/** 
				 * @param {Array<Number>} dayArray
				 * 
				 * Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). 
				 */
				$scope.api.disableDays = function(dayArray) {
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) {
						if(dayArray && dayArray.length > 0) {
							x.daysOfWeekDisabled(dayArray);
							$scope.model.disabledDays = dayArray;
						} else {
							x.daysOfWeekDisabled(false);
							$scope.model.disabledDays = dayArray;
						}
					}
				};


				/** 
				 * @param {Date} minDate
				 * @param {Date} maxDate
				 * 
				 * Set the min date or max date that can be selected
				 */
				$scope.api.setMinMaxDate = function(minDate, maxDate) {
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) {
						x.minDate(false);
						x.maxDate(false);

						if(minDate) {
							minDate.setHours(0,0,0,0);
							x.minDate(minDate);
						} 
						$scope.model.minDate = minDate;

						if(maxDate) {
							maxDate.setHours(23,59,59,999);
							x.maxDate(maxDate);
						} 
						$scope.model.maxDate = maxDate;
					}
				};

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