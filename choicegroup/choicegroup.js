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
          
          $scope.notNullOrEmpty = $utils.notNullOrEmpty  // adding it to the root scope doesn't fix the resolution of the comparator in the filter (in this directive). it has to be in local scope. TODO remove the need for this
          var allowNullinc=0;
    	  $scope.selection= []
    	  
          $scope.$watch('model.dataProviderID', function() { 
             setSelectionFromDataprovider();
          })
          $scope.$watch('model.valuelistID',function() {
        	if ($scope.svyServoyapi.isInDesigner() && !$scope.model.valuelistID) {
           	  $scope.model.valuelistID = [{realValue:1,displayValue:"Item1"},{realValue:2,displayValue:"Item2"},{realValue:3,displayValue:"Item3"}];
            }
            if(!$scope.model.valuelistID) return; // not loaded yet
            if($scope.model.valuelistID.length > 0 && isValueListNull($scope.model.valuelistID[0])) allowNullinc=1;
            setSelectionFromDataprovider();
          })
          
          $scope.itemClicked = function($event,$index){
           
    		if ($scope.model.inputType == 'radio')
    		{
    			$scope.model.dataProviderID = $scope.model.valuelistID[$index+allowNullinc].realValue;
    		}
    		else
    		{
                var checkedTotal = 0;
                for(var i=0;i< $scope.selection.length ;i++){
               	 if($scope.selection[i]==true) checkedTotal++;            	 
                }

               // prevent unselection of the last element if 'allow null' is not set                                          
               if(checkedTotal==0 && allowNullinc ==0){
                  $scope.selection[$index] = true;
               }
    			$scope.model.dataProviderID = getDataproviderFromSelection()
				if(checkedTotal==0 && allowNullinc ==0) return;
    		}	
            
			$scope.svyServoyapi.apply('dataProviderID')
			if($scope.handlers.onFocusLostMethodID) $scope.handlers.onFocusLostMethodID($event)
          }
          
          function isValueListNull(item)
          {
              return (item.realValue == null || item.realValue =='') && item.displayValue=='';
          }

    	  function setSelectionFromDataprovider(){
    		  $scope.selection =[]
    		  if($scope.model.dataProviderID === null || $scope.model.dataProviderID === undefined) return;
    		  var arr = $scope.model.dataProviderID.split ? $scope.model.dataProviderID.split('\n') : [$scope.model.dataProviderID];
    		  arr.forEach(function(element, index, array){
    			  for(var i=0;i<$scope.model.valuelistID.length;i++){
    				  var item = $scope.model.valuelistID[i];
                      if(item.realValue+''===element+'' && !isValueListNull(item))
    				  {
    					  if ($scope.model.inputType == 'radio')
    					  {
    						  if(arr.length > 1)
    							  $scope.selection = [];
    						  else
    						  	$scope.selection[i-allowNullinc] = item.realValue;
    					  }
    					  else
    					  {
    						  $scope.selection[i-allowNullinc] = true;
    					  }
    				  }
    			  }
    		  });
    	  }

    	  function getDataproviderFromSelection(){
    		  var ret ="";
    		  $scope.selection.forEach(function(element, index, array){
    			  if(element == true) ret+= $scope.model.valuelistID[index+allowNullinc].realValue+'\n';
    		  });
    		  ret = ret.replace(/\n$/, "");
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

  
  
  
  
