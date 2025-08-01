/**
 * Handles button clicks and loads the corresponding form based on button naming convention.
 * Button names should follow the pattern 'btn_FormName' where FormName corresponds to 'formNameForm'.
 * Also manages the visual selection state of buttons.
 *
 * @param {JSEvent} event The event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"48CD9723-BAB1-4424-9088-0D272159495A"}
 */
function onAction(event) {
	var elementName = event.getElementName();
	var formTitle = event.getSource().text;
	if (formTitle && elementName && elementName.indexOf('btn_') === 0) {
		// Clear selected state from all buttons
		clearButtonSelection();
		
		// Add selected state to the clicked button
		elements[elementName].addStyleClass('selected');
		
		// Extract form name from button name and load the form
		var formNamePart = elementName.substring(4);
		var formBase = formNamePart.charAt(0).toLowerCase() + formNamePart.substring(1);
		var formName = formBase + 'Form';		
		loadComponentForm(formTitle, formName);
	}
}

/**
 * Loads the specified form into the component container in bootstrapMain.
 * 
 * @param {String} formTitle The name which will appear in the header
 * @param {String} formName The name of the form to load
 *
 * @properties={"typeid":24,"uuid":"402D1E25-9928-4B29-BDE5-AF46A69F4161"}
 */
function loadComponentForm(formTitle, formName) {
	forms.baseComponentForm.setTitle(formTitle);
	forms.baseComponentForm.setContainedForm(forms[formName]);
	scopes.global.setStatusMessage(formName + ' loaded');
}

/**
 * Removes the 'selected' class from all buttons in the selector form.
 *
 * @private
 * @properties={"typeid":24,"uuid":"FF92F6D6-5946-4D18-AFBA-16E77BB63527"}
 */
function clearButtonSelection() {
	// Get all elements in the form
	var allElements = elements.allnames;
	
	// Loop through elements and remove 'selected' class from buttons
	for (var i = 0; i < allElements.length; i++) {
		var elementName = allElements[i];
		if (elementName.indexOf('btn_') === 0) {
			elements[elementName].removeStyleClass('selected');
		}
	}
}
