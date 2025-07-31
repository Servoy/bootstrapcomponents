/** 
* @param {Array<Date>} dateArray
* 
* Dates that should be disabled.
*/
$scope.api.disableDates = function(dateArray) {
	if(dateArray && dateArray.length > 0) {
		$scope.model.disabledDates = dateArray;
	} else {
		$scope.model.disabledDates = null;
	}
};

/** 
* @param {Array<Number>} dayArray
* 
* Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). 
*/
$scope.api.disableDays = function(dayArray) {
	if(dayArray && dayArray.length > 0) {
		$scope.model.disabledDays = dayArray;
	} else {
		$scope.model.disabledDays = dayArray;
	}
};

/** 
* @param {Date} minDate
* @param {Date} maxDate
* 
* Set the min date or max date that can be selected
*/
$scope.api.setMinMaxDate = function(minDate, maxDate) {
	if(minDate) {
		minDate.setHours(0,0,0,0);
	} 
	$scope.model.minDate = minDate;

	if(maxDate) {
		maxDate.setHours(23,59,59,999);
	} 
	$scope.model.maxDate = maxDate;
};