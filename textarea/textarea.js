angular.module('bootstrapcomponentsTextarea',['servoy']).directive('bootstrapcomponentsTextarea', function() {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	api: "=svyApi",
       	handlers: "=svyHandlers"
      },
      controller: function($scope, $element, $attrs) {
    	  /**
			 * Request the focus to this textarea.
			 * @example %%prefix%%%%elementName%%.requestFocus();
			 */
			$scope.api.requestFocus = function() {
				 $element.find('textarea')[0].focus();
			}
      },
      templateUrl: 'bootstrapcomponents/textarea/textarea.html'
    };
  })
  
  
  
