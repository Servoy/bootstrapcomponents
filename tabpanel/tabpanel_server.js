 $scope.api.addTab = function(form, tabText, index) {
    	   if (!$scope.model.tabs) $scope.model.tabs = [];
    	   var insertPosition = (index == undefined) ? $scope.model.tabs.length : ((index < 1 || index > $scope.model.tabs.length) ? $scope.model.tabs.length : index-1);
    	   for(var i = $scope.model.tabs.length; i > insertPosition; i--) {
    		   $scope.model.tabs[i] = $scope.model.tabs[i - 1]; 
    	   }
    	   $scope.model.tabs[insertPosition] = {
    			   containedForm: form,
    			   text: tabText,
    			   active: false };
    	   if ($scope.model.tabs.length == 1 || !$scope.model.tabIndex)
    	   {
    		   $scope.model.tabIndex = 1; 
    	   }
    	   else if ($scope.model.tabIndex > insertPosition)
    	   {
    		   $scope.model.tabIndex++;  
    	   }
    	   return $scope.model.tabs[insertPosition];
       }

 $scope.api.getTabAt = function(index) {
	 if(index > 0 && index <= $scope.model.tabs.length) {
		 return $scope.model.tabs[index-1]; 
	 }
	 return null;
 }
 
$scope.api.removeTabAt = function(index) {
    	   if(index > 0 && index <= $scope.model.tabs.length) {
    		   var formToHide;
    		   if ($scope.model.tabIndex === index)
    		   {
    			   formToHide =  $scope.model.tabs[index-1];
    		   }	   
        	   for(var i = index - 1; i < $scope.model.tabs.length - 1; i++) {
        		   $scope.model.tabs[i] = $scope.model.tabs[i + 1];
        	   }
        	   $scope.model.tabs.length = $scope.model.tabs.length - 1;
        	   if ($scope.model.tabIndex >= index)
        	   {
        		   if ($scope.model.tabIndex === index)
        		   {
        			   // TODO should check if the tab was disabled
        			   $scope.model.tabIndex = getFirstEnabledTabIndex();
        		   }  
        		   else
        		   {
        			   $scope.model.tabIndex--;
        		   }   
        	   }
        	   if (formToHide && formToHide.containedForm)
        	   {
        		   return servoyApi.hideForm(formToHide.containedForm);
        	   }	   
        	   return true;
    	   }
    	   return false;
}

$scope.api.removeAllTabs = function() {
	if (!$scope.model.tabs) return true;
	
	var formToHide = ($scope.model.tabIndex >= 1 && $scope.model.tabIndex <= $scope.model.tabs.length) ? $scope.model.tabs[$scope.model.tabIndex - 1] : undefined;

	var formHideIsOK = true;
	if (formToHide && formToHide.containedForm) {
		formHideIsOK = servoyApi.hideForm(formToHide.containedForm);
	}
	
	if (!formHideIsOK) return false;
	
	$scope.model.tabs = undefined;
	$scope.model.tabIndex = 0;
		
	return true;
}

var getFirstEnabledTabIndex = function() {
	for (var i = 0; $scope.model.tabs && i < $scope.model.tabs.length; i++) {
		var tab = $scope.model.tabs[i];
		if (tab.disabled !== true) {
			return i + 1;
		}
	}
	return 0;
}