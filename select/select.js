angular.module('bootstrapcomponentsSelect',['servoy', 'bootstrapcomponentscommon']).directive('bootstrapcomponentsSelect', ['$log', '$svyProperties', '$sabloConstants', function($log, $svyProperties, $sabloConstants) {
	return {
		restrict: 'E',
		scope: {
			name: "=",
			model: "=svyModel",
			handlers: "=svyHandlers",
			api: "=svyApi",
			svyServoyapi: "="
		},
		link: function($scope, $element, $attrs) {
			/* 
			 * Using ng-options
			 * <!--ng-options='option.realValue as option.displayValue for option in model.valuelistID track by option.realValue'-->
			 * */
			
			var element = $element.find('select');
			var tooltipState = null;
			Object.defineProperty($scope.model,$sabloConstants.modelChangeNotifier, {configurable:true,value:function(property,value) {
				switch(property) {
					case "dataProviderID":
						element.val(value);
						break;
					case "toolTipText":
	    				  if (tooltipState)
	    					  tooltipState(value);
	    				  else
	    					  tooltipState = $svyProperties.createTooltipState($element, value);
	    				  break;
					case "placeholderText":
						if($scope.model.placeholderText.length > 0)
							$element.addClass('placeholder')
				}
			}});
			
			$element.mousedown(function() {	
				hideOptionInSpan($(this), true);
			});
			$element.keydown(function() {
				hideOptionInSpan($(this), true);
			});
			$element.keyup(function() {
				hideOptionInSpan($(this), false);
			});
			
			$element.mouseup(function(event) {
				hideOptionInSpan($(this), false);
			});
			
			//Safari doesn't respect display:none on option elements, so we have to hide the option in span.
			/*
			 * @param selectElement jQuery select wrapper.
			 * @param wrapBoolean boolean that decides if we wrap or unwrap the placeholder option.
			 */
			
			function hideOptionInSpan(selectElement, wrapBoolean){
				 var isSafari = /constructor/i.test(window.HTMLElement) 
						  	 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari']  
							 || (typeof safari !== 'undefined' && safari.pushNotification))
							 || navigator.userAgent.toLowerCase().indexOf('safari/') > -1
							 && navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
				 
				var placeholder = selectElement.find('.placeholderOption');
				
				if(isSafari){
					
					if(wrapBoolean){
						if(placeholder.parent().prop('nodeName') !== 'SPAN'){
							placeholder.wrap("<span></span>");
							if(selectElement.find("option:selected").hasClass('placeholderOption')){
								selectElement.find("option:selected").prop("selected", false);
								placeholder.addClass("placeholderOptionDisabled");
								selectElement.find('select')[0].selectedIndex = -1;
								}
						}
					}
					else{
						if((selectElement.find('select')[0].selectedIndex === -1)){
							if(placeholder.parent()[0].nodeName === 'SPAN' && placeholder.hasClass('placeholderOptionDisabled') ) {
								placeholder.unwrap();
								placeholder.prop('selected', true);
								placeholder.removeClass('placeholderOptionDisabled');
							}	
						}
					}
					
				}
			}
			
			var destroyListenerUnreg = $scope.$on("$destroy", function() {
				destroyListenerUnreg();
				delete $scope.model[$sabloConstants.modelChangeNotifier];
			});
			
			// data can already be here, if so call the modelChange function so that it is initialized correctly.
			var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (var key in $scope.model) {
				modelChangeFunction(key,$scope.model[key]);
			}
			
			function updateDataprovider() {
				if($scope.model.valuelistID) {
					var selectComp = $element.find('select');
					var selectedText = selectComp.find("option:selected").text();
					var value = null;
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						if($scope.model.valuelistID[i].displayValue == selectedText) {
							value = $scope.model.valuelistID[i].realValue;
							break;
						}
					}

					if(($scope.model.dataProviderID +'') != (value +'')) {
						$scope.model.dataProviderID = value;
						$scope.svyServoyapi.apply("dataProviderID");
						return true;
					}
				}
				return false;
			}

			$scope.onChange = function(event) {
				/*Remove the placeholder from dropdown options when a value is selected*/
				if((event.currentTarget.selectedIndex !== 0 || event.currentTarget.selectedIndex !== -1) && $(event.target).parent().hasClass('placeholder')){
					$(event.target)[0].options[0].remove();
					$(event.target).parent().removeClass('placeholder');
					
					/*Check if is mobile device, and if is, after removing the placeholder increase the selected index. */
					if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
					    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
					    event.currentTarget.selectedIndex += 1;
					}
				}
				
				if(updateDataprovider() && $scope.handlers.onActionMethodID) {
					$scope.handlers.onActionMethodID(event);
				}
			}

			$scope.isDPInValueList = function() {
				var isDPInValueList = false;
				if($scope.model.valuelistID) {
					for (i = 0; i < $scope.model.valuelistID.length; i++) {
						if($scope.model.dataProviderID == $scope.model.valuelistID[i].realValue) {
							isDPInValueList = true;
							break;
						}
					}
				}
				return isDPInValueList;
			}

			/**
			 * Set the focus to combobox.
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 * @param mustExecuteOnFocusGainedMethod (optional) if false will not execute the onFocusGained method; the default value is true
			 */
			$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
				var inputEl = $element.find('select');
				if (mustExecuteOnFocusGainedMethod === false && $scope.handlers.onFocusGainedMethodID)
				{
					inputEl.unbind('focus');
					inputEl[0].focus();
					inputEl.bind('focus', $scope.handlers.onFocusGainedMethodID)
				}
				else
				{
					inputEl[0].focus();
				}			  
			}			
      },
      templateUrl: 'bootstrapcomponents/select/select.html'
    };
}]);