angular.module('bootstrapcomponentsTabpanel',['servoy']).directive('bootstrapcomponentsTabpanel', function($timeout) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	svyServoyapi: "=",
       	handlers: "=svyHandlers",
       	api: "=svyApi"
      },
      controller: function($scope, $element, $attrs, webStorage) {

    	  if ($scope.svyServoyapi.isInDesigner()) return;
    	  
    	  var getTabIndex = function(tab)
    	  {
    	      if ($scope.model.tabs && tab)
    	      {
    	      	  for (var i=0;i<$scope.model.tabs.length;i++)
    	      	  {
    	      	  		if ($scope.model.tabs[i] == tab)
    	      	  		{
    	      	  			return i;
    	      	  		}
    	      	  }
    	      }
    	      return -1;
    	  }
    	  var currentTab = null;
    	  var currentContainedForm = null;
    	  $scope.getForm = function(tab) {
    		  if (tab && tab.active && tab.containedForm) { 
    			  if (currentContainedForm !== tab.containedForm) {
    				  if (currentContainedForm != null && currentTab == tab) {
    					  // this was a change 
    					  // temp set it to false, so it will not show the new form yet.
    					  tab.active = false;
    					  var promise =  $scope.svyServoyapi.hideForm(currentContainedForm, null,null,tab.containedForm, tab.relationName);
    					  promise.then(function(ok) {
    						  // we can't do much more then to set the back to true.
    						  // maybe if 'ok' is false we should also push back the previous form??
    						  tab.active = true; 
    					  })  
    				  }
    				  currentContainedForm = tab.containedForm;
    				  currentTab = tab;
    				  if (!tab.active) return "";
    			  }
    			  return $scope.svyServoyapi.getFormUrl(tab.containedForm);
    		  }
    		  return "";
    	  }
    	  
    	  $scope.select = function(tab) {
    		  if (tab && tab.containedForm)
    		  {
    			  if ($scope.model.tabs[$scope.model.tabIndex-1] == tab) {
    				  $scope.svyServoyapi.formWillShow(tab.containedForm, tab.relationName);
    			  }
    			  else {
    				tab.active = false;
    				$scope.model.tabs[$scope.model.tabIndex-1].active = true;
					var promise =  $scope.svyServoyapi.hideForm($scope.model.tabs[$scope.model.tabIndex-1].containedForm, null,null,tab.containedForm, tab.relationName);
					promise.then(function(ok) {
					  if (ok) {
						  $scope.model.tabs[$scope.model.tabIndex-1].active = false;
						  $scope.model.tabIndex = getTabIndex(tab)+1;
						  tab.active = true;
					  }
					  else {
						  $scope.model.tabs[$scope.model.tabIndex-1].active = true;
					  }
					})  
    			  }
    		  }	  
    	  }
    	  if ($scope.model.tabs && $scope.model.tabs.length >0)
    	  {
    		  var index = 1;
    		  if ($scope.$parent && $scope.$parent.formname)
    		  {
    			  var key = $scope.$parent.formname +"_" + $element.attr('name')+"_tabindex";
    			  var storageValue= webStorage.session.get(key);
    			  if (storageValue)
    			  {
    				  index = parseInt(storageValue);
    				  if (index > $scope.model.tabs.length)
    				  {
    					  index = 1;
    				  }	  
    			  }	  
    		  }
    		  if ($scope.model.tabs[index-1].containedForm)
    		  {
    			  $scope.model.tabIndex = index;
        		  $scope.model.tabs[index-1].active = true;
        		  $scope.svyServoyapi.formWillShow($scope.model.tabs[index-1].containedForm, $scope.model.tabs[index-1].relationName);  
    		  }	  
    	  }
    	  
    	  $scope.$watch("model.tabIndex", function(newValue,oldValue) {
    	  		if (newValue !== oldValue)
    	  		{
    	  			if (!$scope.model.tabs[newValue-1])
    	  			{
    	  				// invalid, revert to old value
    	  				$scope.model.tabIndex = oldValue;
    	  				return;
    	  			}
    	  			if (oldValue)
    	  			{ 
    	  				$scope.svyServoyapi.hideForm($scope.model.tabs[oldValue-1].containedForm);
    	  				$scope.model.tabs[oldValue-1].active = false;
    	  			}
					if (newValue)
					{
						var promise = $scope.svyServoyapi.formWillShow($scope.model.tabs[newValue-1].containedForm,$scope.model.tabs[newValue-1].relationName);
						$scope.model.tabs[newValue-1].active = true;
					}
					if ($scope.$parent && $scope.$parent.formname)
					{
						 var key = $scope.$parent.formname +"_" + $element.attr('name')+"_tabindex";
						 webStorage.session.add(key,newValue);
					}
				}
    	  		// make sure angularui model is corect before changing activeindex, otherwise angularui doesn't handle the change correctly
    	  		$timeout(function() {
    	  			$scope.model.activeTabIndex = $scope.model.tabIndex - 1;
				}, 0);
		  });
		  
    	  $scope.$watch("model.visible", function(newValue,oldValue) {
    	  		if ($scope.model.tabIndex && newValue !== oldValue && $scope.model.tabs && $scope.model.tabs[$scope.model.tabIndex-1] && $scope.model.tabs[$scope.model.tabIndex-1].containedForm)
    	  		{
    	  			if (newValue)
    	  			{
    	  				$scope.svyServoyapi.formWillShow($scope.model.tabs[$scope.model.tabIndex-1].containedForm,$scope.model.tabs[$scope.model.tabIndex-1].relationName);
    	  			}
    	  			else
    	  			{
    	  				$scope.svyServoyapi.hideForm($scope.model.tabs[$scope.model.tabIndex-1].containedForm);
    	  			}	
  			}	
  		  });
    	  
		   $scope.$watch("model.tabs", function(newValue,oldValue) {
    	  		if (newValue != oldValue)
    	  		{
    	  			var oldForm = oldValue && oldValue.length > 0 && oldValue[$scope.model.tabIndex-1] ?  oldValue[$scope.model.tabIndex-1].containedForm : null;
    	  			var newTabIndex = $scope.model.tabIndex;
    	  			if (!newValue || newValue.length == 0)
    	  			{
    	  				newTabIndex = 0;
    	  			}
    	  			else if (newValue.length < newTabIndex)
    	  			{
    	  				newTabIndex = newValue.length -1;
    	  			}
    	  			else if (newValue && newValue.length > 0 && !newTabIndex)
    	  			{
    	  				newTabIndex = 1;
    	  			}
    	  			var newForm = newValue && newValue.length > 0 ?  newValue[newTabIndex-1].containedForm : null;
    	  			if (newForm != oldForm)
    	  			{
	    	  			if (oldForm) $scope.svyServoyapi.hideForm(oldForm);
						if (newForm) $scope.svyServoyapi.formWillShow(newForm, newValue[newTabIndex-1].relationName);
    	  			}
    	  			if (newTabIndex != $scope.model.tabIndex)
    	  			{
    	  				$scope.model.tabIndex = newTabIndex;
    	  			}
				}	
		  });
		  
    	  $scope.getContainerStyle = function() {
    		  return {position:"relative", minHeight:$scope.model.height+"px"};
    	  }
    	  
    	  $scope.showEditorHint = function()
    	  {
    		  return (!$scope.model.tabs || $scope.model.tabs.length == 0) && $scope.svyServoyapi.isInDesigner();
    	  }
    	  
      },
      templateUrl: 'bootstrapcomponents/tabpanel/tabpanel.html'
    };
  })
  
  
  
