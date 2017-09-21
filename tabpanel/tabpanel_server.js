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
    		   
        	   for(var i = index - 1; i < $scope.model.tabs.length - 1; i++) {
        		   $scope.model.tabs[i] = $scope.model.tabs[i + 1];
        	   }
        	   $scope.model.tabs.length = $scope.model.tabs.length - 1;
        	   if ($scope.model.tabIndex >= index)
        	   {
        		   if ($scope.model.tabIndex === index)
        		   {
        			   $scope.model.tabIndex = 1;
        		   }  
        		   else
        		   {
        			   $scope.model.tabIndex--;
        		   }   
        	   }
        	   return true;
    	   }
    	   return false;
  }