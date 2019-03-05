angular.module('bootstrapcomponentsCalendarinline',['servoy'])
.directive('bootstrapcomponentsCalendarinline',  function($sabloApplication, $log, $apifunctions, $svyProperties, $sabloConstants) {  
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

			child.datetimepicker(options);

			$scope.$watch('model.format', function(){
				setDateFormat($scope.model.format);
			})

			function inputChanged(e) {
				if (e.date) {
					$scope.model.dataProviderID = e.date.toDate();
				} else {
					$scope.model.dataProviderID = null;
				}
				$scope.svyServoyapi.apply('dataProviderID');
			}

			var dateFormat = 'YYYY-MM-DD';

			// helper function
			function setDateFormat(format){
				if(format && format.display){
					dateFormat = moment().toMomentFormatString(format.display);
				}
				var x = child.data('DateTimePicker');
				if (angular.isDefined(x)) { // can be undefined in find mode
					x.format(dateFormat);
					try {
						$element.off("dp.change",inputChanged);
					}
					finally {
						$element.on("dp.change",inputChanged);
					}
				}
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
                    } else {
                        x.disabledDates(false);
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
                    } else {
                        x.daysOfWeekDisabled(false);
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

                    if(maxDate) {
                        maxDate.setHours(0,0,0,0);
                        x.maxDate(maxDate);
                    } 
                }
            };

			$scope.api.getWidth = $apifunctions.getWidth($element[0]);
			$scope.api.getHeight = $apifunctions.getHeight($element[0]);
			$scope.api.getLocationX = $apifunctions.getX($element[0]);
			$scope.api.getLocationY = $apifunctions.getY($element[0]);

			var element = $element.children().first();
			var inputElement = element.children().first();
			
			var isAnchored = $element.parent().hasClass('svy-wrapper');
			
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
					case "size":
						if (isAnchored) {
							console.log(property + " - " + value.height);
							$svyProperties.setCssProperty(inputElement, "height", value.height);
						}
						break;
					case "toolTipText":
						if (tooltipState)
							tooltipState(value);
						else
							tooltipState = $svyProperties.createTooltipState(inputElement, value);
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
			for (var key in $scope.model) {
				modelChangFunction(key, $scope.model[key]);
			}
			
		},
      templateUrl: 'bootstrapcomponents/calendarinline/calendarinline.html'
    };
  })