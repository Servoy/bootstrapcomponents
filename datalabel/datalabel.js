angular.module('bootstrapcomponentsDatalabel',['servoy'])
.directive('bootstrapcomponentsDatalabel',['$svyProperties','$sabloConstants', function($svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	handlers: "=svyHandlers",
       	servoyApi: "=svyServoyapi"
      },
      link:  function($scope, $element, $attrs) {
          $scope.isTrustedHTML = function() {
              if($scope.servoyApi.trustAsHtml() || $scope.model.showAs === 'trusted_html') {
                  return true;
              }
              return false;
          }
      },
      controller: function($scope, $element, $attrs) {
    	  var tooltipState = null;
    	  Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
    		  configurable: true,
    		  value: function(property, value) {
    			  switch (property) {
    			  case "toolTipText":
    				  if (tooltipState)
    					  tooltipState(value);
    				  else
    					  tooltipState = $svyProperties.createTooltipState($element, value);
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
    	  for (key in $scope.model) {
    		  modelChangFunction(key, $scope.model[key]);
    	  }
    	  
    	  $scope.getDataTarget = function(event) {
              var target = event.target;
              var dataTarget = $(target).closest("[data-target]");
              if (dataTarget && dataTarget[0]) {
                  return dataTarget[0].getAttribute("data-target");
              }
              return null;
          }
      },
      templateUrl: 'bootstrapcomponents/datalabel/datalabel.html'
    };
  }]).filter('designFilter', function() {
		return function(input,inDesigner) {
			if (inDesigner)
			{
				return "DataLabel"
			}
			return input;
		};
	})
  
  
  
