angular.module('bootstrapcomponentsButton',['servoy']).directive('bootstrapcomponentsButton', function() {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	handlers: "=svyHandlers",
       	api: "=svyApi"
      },
      controller: function($scope, $element, $attrs) {
    	  /**
			 * Set the focus to this button.
			 * 
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 */
			$scope.api.requestFocus = function() {
				$element.find('button')[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/button/button.html'
    };
  })
  
  
  
