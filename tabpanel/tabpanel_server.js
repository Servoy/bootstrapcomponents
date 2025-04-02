$scope.api.addTab = function(form, tabText, index) {
	if (!$scope.model.tabs) $scope.model.tabs = [];
	var insertPosition = (index == undefined) ? $scope.model.tabs.length : ((index < 1 || index > $scope.model.tabs.length) ? $scope.model.tabs.length : index - 1);
	for (var i = $scope.model.tabs.length; i > insertPosition; i--) {
		$scope.model.tabs[i] = $scope.model.tabs[i - 1];
	}
	$scope.model.tabs[insertPosition] = {
		containedForm: form,
		text: tabText,
		active: false
	};
	if ($scope.model.tabs.length == 1 || !$scope.model.tabIndex) {
		$scope.setters.setTabIndex(1);
	}
	else if ($scope.model.tabIndex > insertPosition) {
		$scope.setters.setTabIndex($scope.model.tabIndex + 1);
	}
	return $scope.model.tabs[insertPosition];
}

$scope.api.getTabAt = function(index) {
	if (index > 0 && index <= $scope.model.tabs.length) {
		return $scope.model.tabs[index - 1];
	}
	return null;
}

$scope.api.removeTabAt = function(index) {
	if (index > 0 && index <= $scope.model.tabs.length) {
		var formToHide;
		if ($scope.model.tabIndex === index) {
			formToHide = $scope.model.tabs[index - 1];
		}
		var formHideIsOK = true;
		if (formToHide && formToHide.containedForm) {
			formHideIsOK = servoyApi.hideForm(formToHide.containedForm);
		}

		if (!formHideIsOK) return false;

		for (var i = index - 1; i < $scope.model.tabs.length - 1; i++) {
			$scope.model.tabs[i] = $scope.model.tabs[i + 1];
		}
		$scope.model.tabs.length = $scope.model.tabs.length - 1;
		if ($scope.model.tabIndex >= index) {
			if ($scope.model.tabIndex === index) {
				// TODO should check if the tab was disabled
				$scope.setters.setTabIndex(getFirstEnabledTabIndex());
			}
			else {
				$scope.setters.setTabIndex($scope.model.tabIndex - 1);
			}
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

$scope.api.selectTabAt = function(index) {
	if (index > 0 && index <= $scope.model.tabs.length) {
		$scope.setters.setTabIndex(index + 1);
	}
}

$scope.setters.setTabIndex = function(index) {
	var newTab = $scope.api.getTabAt(index);
	if (!newTab) return false;
	if (isShowing) {
		var oldTab = $scope.api.getTabAt($scope.model.tabIndex);
		var sameForm = oldTab && newTab && oldTab.containedForm == newTab.containedForm;
		if (!sameForm && oldTab && oldTab.containedForm && !servoyApi.hideForm(oldTab.containedForm)) {
			return false;
		}

		if (newTab.containedForm && !servoyApi.showForm(newTab.containedForm, newTab.relationName)) {
			return false;
		}
	}
	$scope.model.tabIndex = index;
}

$scope.setters.setContainedForm = function(tab, form) {
	var currentTab = $scope.api.getTabAt($scope.model.tabIndex);
	if (isShowing && currentTab && tab.form == currentTab.form) {
		if (tab.containedForm != form && tab.containedForm && !servoyApi.hideForm(tab.containedForm)) {
			return false;
		}

		if (!servoyApi.showForm(form, tab.relationName)) {
			return false;
		}
	}
	tab.containedForm = form;
}

$scope.setTabIndexInternal = function(index) {
	return $scope.setters.setTabIndex(index);
}

$scope.onShow = function() {
	isShowing = true;
	var tab = $scope.api.getTabAt($scope.model.tabIndex);
	if (!tab || tab.disabled) {
		$scope.model.tabIndex = getFirstEnabledTabIndex();
		tab = $scope.api.getTabAt($scope.model.tabIndex);
	}
	if (tab && tab.containedForm) {
		servoyApi.showForm(tab.containedForm, tab.relationName)
	}
}

$scope.onHide = function() {
	isShowing = false;
}