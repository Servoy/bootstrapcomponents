angular.module('bootstrapcomponentsLabel',['servoy'])
.directive('bootstrapcomponentsLabel',['$templateCache','$compile','$http','$svyProperties','$sabloConstants', function($templateCache,$compile,$http,$svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	handlers: "=svyHandlers",
       	servoyApi: "=svyServoyapi"
      },
      controller: function($scope, $element, $attrs) {
    	  var templateUrl = $scope.model.labelFor ? "bootstrapcomponents/label/labelfor.html" : "bootstrapcomponents/label/label.html";
    	  $http.get(templateUrl, {cache: $templateCache}).then(function(result) {
    		  $element.html(result.data);
    		  $compile($element.contents())($scope);
    	  });

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
      },
      templateUrl: 'bootstrapcomponents/label/label.html'
    };
  }])
  
  
  
