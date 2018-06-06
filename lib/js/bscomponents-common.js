angular.module('bootstrapcomponentscommon',['servoy']).filter('bcShowDisplayValue', function () { // filter that takes the realValue as an input and returns the displayValue
	return function (input, valuelist, noEscape, noParsedDisplayValue) {
		var i = 0;
		var realValue = input;
		if (valuelist) {
			if (input && input.hasOwnProperty("realValue")) {
				realValue = input.realValue;
			}
			//TODO performance upgrade: change the valuelist to a hashmap so that this for loop is no longer needed. 
			//maybe to something like {realValue1:displayValue1, realValue2:displayValue2, ...}
			for (i = 0; i < valuelist.length; i++) {
				if (realValue == valuelist[i].realValue) {
					return noParsedDisplayValue ? valuelist[i].displayValue : getParsedDisplayValue(valuelist[i].displayValue);
				}
			}
			var hasRealValues = false;
			for (var i = 0; i < valuelist.length; i++) {
				var item = valuelist[i];
				if (item.realValue != item.displayValue) {
					hasRealValues = true;
					break;
				}
			}
			if (hasRealValues) {
				var diplayValue = null;
				// this then function will resolve right away if the value is already cached on the client.
				valuelist.getDisplayValue(realValue).then(function(val){
					diplayValue = val;
				})
				return noParsedDisplayValue ? diplayValue : getParsedDisplayValue(diplayValue);
			}
			if (valuelist.length == 0) return null;
		}
		
		function getParsedDisplayValue(value) {
			if (value === undefined || value === null || value === '') {
				return noEscape ? ' ' : '&nbsp;'
			} else {
				return value;
			}
		}
		
		return input;
	};
});