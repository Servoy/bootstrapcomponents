/** 
* @param {Date} minDate
* @param {Date} maxDate
* @param {Boolean} [keepInvalid]
* 
* Set the min date or max date that can be selected
*/
$scope.api.setMinMaxDate = function(minDate, maxDate, keepInvalid) {
	if(minDate) {
		minDate.setHours(0,0,0,0);
	}
	$scope.model.minDate = minDate;

	if(maxDate) {
		maxDate.setHours(23,59,59,999);
	}
	$scope.model.maxDate = maxDate;

	if (keepInvalid !== undefined) {
		$scope.model.keepInvalid = keepInvalid;
	}
};

/** 
* @param {Array<Date>} dateArray
* @param {Boolean} [keepInvalid]
* 
* Dates that should be disabled.
*/
$scope.api.disableDates = function(dateArray, keepInvalid) {
	if(dateArray && dateArray.length > 0) {
		$scope.model.disabledDates = dateArray;
	} else {	
		$scope.model.disabledDates = null;
	}

	if (keepInvalid !== undefined) {
		$scope.model.keepInvalid = keepInvalid;
	}
};

/** 
* @param {Array<Number>} dayArray
* @param {Boolean} [keepInvalid]
* 
* Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). 
*/
$scope.api.disableDays = function(dayArray, keepInvalid) {
	if(dayArray && dayArray.length > 0) {
		$scope.model.disabledDays = dayArray;
	} else {
		$scope.model.disabledDays = null;
	}

	if (keepInvalid !== undefined) {
		$scope.model.keepInvalid = keepInvalid;
	}
};
