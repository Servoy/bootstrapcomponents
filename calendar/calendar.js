angular.module('bootstrapcomponentsCalendar',['servoy']).directive('bootstrapcomponentsCalendar', function($sabloApplication, $log, $apifunctions, $svyProperties, $sabloConstants, $applicationService, $utils) {  
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
						widgetParent: $(document.body),
						showTodayButton: true,
						calendarWeeks: $scope.model.calendarWeeks,
						useCurrent: false,
						focusOnShow: !$scope.model.pickerOnly,
						ignoreReadonly: $scope.model.pickerOnly
				}

				var locale = $sabloApplication.getLocale();
				if (locale.language) {
					locale = locale.language;
                    if (moment && moment.locales().indexOf(locale) < 0){
                        // component throws error if not supported locale , fallback to english
                        $log.warn("language: " + locale +" not supported, falling back to english");
                        locale = 'en';
                    }
                    options.locale = locale;
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

				// set key binds
				setKeyBinds();

				function setKeyBinds() {
					child.children("input").keydown(function (e) {

						if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
							return true;
						}

						switch (e.keyCode) {
						case 89: // y Yesterday
							var x = child.data('DateTimePicker');
							x.date(moment().add(-1, 'days'));
							e.stopPropagation();
							e.preventDefault();
							break;
						case 66: // b Beginning ot the month
							var x = child.data('DateTimePicker');
							x.date(moment().startOf('month'));
							e.stopPropagation();
							e.preventDefault();
							break;
						case 69: // e End of the month
							var x = child.data('DateTimePicker');
							x.date(moment().endOf('month'));
							e.stopPropagation();
							e.preventDefault();
							break;
						case 107: // + Add 1 day
							var x = child.data('DateTimePicker');
							if (x.date()) {
								x.date(x.date().clone().add(1, 'd'));
							}
							e.stopPropagation();
							e.preventDefault();
							break;
						case 109: // - Subtract 1 day
							var x = child.data('DateTimePicker');
							if (x.date()) {
								x.date(x.date().clone().subtract(1, 'd'));
							}
							e.stopPropagation();
							e.preventDefault();
							break;
						default:
							break;
						}

						return true;
					});


					var x = child.data('DateTimePicker');
					var defaultBinding = x.keyBinds();
					defaultBinding.left = function (widget) {
						if (widget && this.date()) {
							this.date(this.date().clone().subtract(1, 'd'));
							return;
						}
						return false;
					}
					defaultBinding.right = function (widget) {
						if (widget && this.date()) {
							this.date(this.date().clone().add(1, 'd'));
							return;
						}
						return false;
					}
					x.keyBinds(defaultBinding);
				}

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
				if ($scope.model.keepInvalid)
				{
					x.keepInvalid($scope.model.keepInvalid);
				}

				$scope.$watch('model.format', function(){
					setDateFormat($scope.model.format);
				})

				function inputChanged(e) {
					if (e.date) {
						ngModel.$setViewValue(e.date.toDate());
					}
					else ngModel.$setViewValue(null);
					ngModel.$setValidity("", true);
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

				$element.on("dp.change",inputChanged);

				$element.on("dp.error",function(){
					if (child.children("input").val() !== '')
					{
						ngModel.$setValidity("", false);
						$scope.$digest();
					}	
				});

				var storedTooltip = false;
				$scope.api.onDataChangeCallback = function(event, returnval) {
					var stringValue = typeof returnval == 'string'
						if (returnval === false || stringValue) {
							ngModel.$setValidity("", false);
							if (stringValue) {
								if (storedTooltip == false)
									storedTooltip = $scope.model.toolTipText;
								registerTooltip(returnval);
							}
						} else {
							ngModel.$setValidity("", true);
							if (storedTooltip !== false)
								$scope.model.toolTipText = storedTooltip;
							registerTooltip($scope.model.toolTipText );
						}
				}

				$scope.focusGained = function(event) {
					var editFormat = $scope.model.format ?  ($scope.model.format.edit ? $scope.model.format.edit : $scope.model.format.display ): null;
					dateFormat = moment().toMomentFormatString(editFormat)					
	                setDateFormat(dateFormat);
						
					if ($scope.model.format.edit && $scope.model.format.isMask) {
						var settings = {};
						settings.placeholder = $scope.model.format.placeHolder ? $scope.model.format.placeHolder : " ";
						if ($scope.model.format.allowedCharacters)
							settings.allowedCharacters = $scope.model.format.allowedCharacters;

						$element.find('input').mask($scope.model.format.edit, settings);
						// library doesn't handle well this scenario, forward focus event to make sure mask is set
						if ($element.find('input').val() == '') $element.find('input').trigger("focus.mask");
					}
				}

				$scope.focusLost = function(event) {
					setDateFormat($scope.model.format);
					if ($scope.model.format.edit && $scope.model.format.isMask)
					{
						$element.find('input').unmask();
					}
				}

				/**
				 * Set the focus to this calendar.
				 * 
				 * @example %%prefix%%%%elementName%%.requestFocus();
				 * @param mustExecuteOnFocusGainedMethod
				 *            (optional) if false will not execute the onFocusGained
				 *            method; the default value is true
				 */
				$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
					var input = $element.find('input');
					if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID) {
						input.unbind('focus');
						input[0].focus();
						input.bind('focus', $scope.handlers.onFocusGainedMethodID)
					} else {
						input[0].focus();
					}
				}

				/** 
				 * @param {Array<Date>} dateArray
				 * @param {Boolean} [keepInvalid]
				 * 
				 * Dates that should be disabled.
				 */
				$scope.api.disableDates = function(dateArray, keepInvalid) {
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) {
						if(dateArray && dateArray.length > 0) {
							x.disabledDates(dateArray);
							$scope.model.disabledDates = dateArray;
						} else {
							x.disabledDates(false);
							$scope.model.disabledDates = null;
						}

						if (keepInvalid !== undefined)
						{
							if(keepInvalid) {
								x.keepInvalid(keepInvalid)
							}
							$scope.model.keepInvalid = keepInvalid;
						}
					}
				};

				/** 
				 * @param {Array<Number>} dayArray
				 * @param {Boolean} [keepInvalid]
				 * 
				 * Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). 
				 */
				$scope.api.disableDays = function(dayArray, keepInvalid) {
					var x = child.data('DateTimePicker');
					if (angular.isDefined(x)) {
						if(dayArray && dayArray.length > 0) {
							x.daysOfWeekDisabled(dayArray);
							$scope.model.disabledDays = dayArray;
						} else {
							x.daysOfWeekDisabled(false);
							$scope.model.disabledDays = dayArray;
						}

						if (keepInvalid !== undefined)
						{
							if(keepInvalid) {
								x.keepInvalid(keepInvalid)
							}
							$scope.model.keepInvalid = keepInvalid;
						}
					}
				};


				/** 
				 * @param {Date} minDate
				 * @param {Date} maxDate
				 * @param {Boolean} [keepInvalid]
				 * 
				 * Set the min date or max date that can be selected
				 */
				$scope.api.setMinMaxDate = function(minDate, maxDate, keepInvalid) {
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

						if (keepInvalid !== undefined)
						{
							if(keepInvalid) {
								x.keepInvalid(keepInvalid)
							}
							$scope.model.keepInvalid = keepInvalid;
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
						case "size":
							if (isAnchored) {
								if ($log.debugEnabled) $log.debug("bootstrap calendar * " + property + " - " + value.height);
								$svyProperties.setCssProperty(inputElement, "height", value.height);
							}
							break;
						case "toolTipText":
							registerTooltip(value);
							break;
						case "selectOnEnter":
							if (value)
								$svyProperties.addSelectOnEnter(inputElement);
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
				for (var key in $scope.model) {
					modelChangFunction(key, $scope.model[key]);
				}
			}
			
		},
		templateUrl: 'bootstrapcomponents/calendar/calendar.html'
	};
})
