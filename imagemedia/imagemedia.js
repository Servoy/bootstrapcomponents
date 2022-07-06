angular.module('bootstrapcomponentsImagemedia',['servoy']).directive('bootstrapcomponentsImagemedia', function($window, $document,$svyProperties, $sabloConstants) {  
    return {
      restrict: 'E',
      scope: {
        model: "=svyModel",
        svyServoyapi: "=",
        handlers: "=svyHandlers"
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

		  $scope.download = function() {
			if ($scope.model.dataProviderID) {
				var x = 0, y = 0;
				if ($document.all) {
					x = $window.screenTop + 100;
					y = $window.screenLeft + 100;
				} else if ($document.layers) {
					x = $window.screenX + 100;
					y = $window.screenY + 100;
				} else { // firefox, need to switch the x and y?
					y = $window.screenX + 100;
					x = $window.screenY + 100;
				}
				$window.open($scope.model.dataProviderID.url ? $scope.model.dataProviderID.url : $scope.model.dataProviderID, 'download', 'top=' + x + ',left=' + y + ',screenX=' + x
						+ ',screenY=' + y + ',location=no,toolbar=no,menubar=no,width=310,height=140,resizable=yes');
			}
		}

		$scope.clear = function() {
			$scope.model.dataProviderID = null;
			$scope.svyServoyapi.apply('dataProviderID');
		}		  

		$scope.imgStyle = function() {
			return $scope.model.media == null && $scope.model.dataProviderID == null && $scope.svyServoyapi.isInDesigner() ? {} : { width: '100%' };
		}
      },
      templateUrl: 'bootstrapcomponents/imagemedia/imagemedia.html'
    };
  })