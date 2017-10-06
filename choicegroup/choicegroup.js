angular.module('bootstrapcomponentsChoicegroup',['servoy']).directive('bootstrapcomponentsChoicegroup', function($utils,$svyProperties, $sabloConstants) {  
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
          
    	  $scope.selection= []
    	  
          $scope.$watch('model.dataProviderID', function() { 
             setSelectionFromDataprovider();
          })
          $scope.$watch('model.valuelistID',function() {
        	if ($scope.svyServoyapi.isInDesigner() && !$scope.model.valuelistID) {
           	  $scope.model.valuelistID = [{realValue:1,displayValue:"Item1"},{realValue:2,displayValue:"Item2"},{realValue:3,displayValue:"Item3"}];
            }
            if(!$scope.model.valuelistID) return; // not loaded yet
            setSelectionFromDataprovider();
          })
          
          $scope.itemClicked = function($event,$index){
           
    		if ($scope.model.inputType == 'radio')
    		{
    			$scope.model.dataProviderID = $scope.model.valuelistID[$index].realValue;
    		}
    		else
    		{
    			$scope.model.dataProviderID = getDataproviderFromSelection()
    		}	
            
			$scope.svyServoyapi.apply('dataProviderID')
			if($scope.handlers.onFocusLostMethodID) $scope.handlers.onFocusLostMethodID($event)
          }

    	  function setSelectionFromDataprovider(){
    		  $scope.selection =[]
    		  if($scope.model.dataProviderID === null || $scope.model.dataProviderID === undefined) return;
    		  var arr = $scope.model.dataProviderID.split ? $scope.model.dataProviderID.split('\n') : [$scope.model.dataProviderID];
    		  arr.forEach(function(element, index, array){
    			  for(var i=0;i<$scope.model.valuelistID.length;i++){
    				  var item= $scope.model.valuelistID[i];
    				  if(item.realValue && item.realValue==element) 
    				  {
    					  if ($scope.model.inputType == 'radio')
    					  {
    						  $scope.selection[i] = $scope.model.dataProviderID;
    					  }
    					  else
    					  {
    						  $scope.selection[i] = true;
    					  }
    				  }
    			  }
    		  });
    	  }

    	  function getDataproviderFromSelection(){
    		  var ret ="";
    		  $scope.selection.forEach(function(element, index, array){
    			  if(element == true) ret+= $scope.model.valuelistID[index].realValue+'\n';
    		  });
    		  if(ret === "") ret =null
    		  return ret;
    	  }
    	  
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

		/**
		 * Request the focus to this choicegroup.
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
      },
      templateUrl: 'bootstrapcomponents/choicegroup/choicegroup.html'
    };
  })

  
  
  
  
