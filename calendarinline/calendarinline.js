angular.module('bootstrapcomponentsCalendarinline',['servoy'])
.directive('bootstrapcomponentsCalendarinline',  function($sabloApplication, $log, $apifunctions, $svyProperties, $sabloConstants, $applicationService) {  
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			handlers: "=svyHandlers",
			api: "=svyApi",
			svyServoyapi: "="
		},
		link: function($scope, $element, $attrs) {
			var child = $element.children();
			var options = {
				showTodayButton: true,
				calendarWeeks: true,
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

			function inputChanged(e) {
				if (e.date) {
					$scope.model.dataProviderID = e.date.toDate();
				} else {
					$scope.model.dataProviderID = null;
				}
				$scope.svyServoyapi.apply('dataProviderID');
			}

			$element.on("dp.change",inputChanged);
			
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
                        maxDate.setHours(0,0,0,0);
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
					case "dataProviderID":
				     var x = child.data('DateTimePicker');
		                if (angular.isDefined(x)) {
							x.date(value);
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
						} else {
							var enabledDate = x.viewDate() ? x.viewDate() : new Date();
							x.enabledDates([enabledDate]);
						}
					 break;	
					}
				}
			});
			var x = child.data('DateTimePicker');
			if ($scope.model.disabledDays)
			{
				x.daysOfWeekDisabled($scope.model.disabledDays);
			}	
			if ($scope.model.disabledDates)
			{
				x.disabledDates($scope.model.disabledDates);
			}
			if ($scope.model.maxDate)
			{
				x.maxDate($scope.model.maxDate);
			}	
			if ($scope.model.minDate)
			{
				x.minDate($scope.model.minDate);
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
			
		},
      templateUrl: 'bootstrapcomponents/calendarinline/calendarinline.html'
    };
  })