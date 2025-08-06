/**
 * TODO generated, please specify type and doc for the params
 * @param title
 *
 * @properties={"typeid":24,"uuid":"C2112A27-6E13-4E50-B6BE-2CF175E05848"}
 */
function setTitle(title) {
	elements.label_form.text = title;
	restartLabelAnimation();
}

/**
 * Restart the shimmer animation on the label
 *
 * @properties={"typeid":24,"uuid":"BD4F6B7B-EDC0-424B-A09F-38985399F4C7"}
 */
function restartLabelAnimation() {
	var label = elements.label_form;
	label.visible = false;
	label.addStyleClass('gradient-form-label-static');
	label.removeStyleClass('gradient-form-label');
	application.executeLater(function () {
		label.addStyleClass('gradient-form-label');
		label.removeStyleClass('gradient-form-label-static');
		label.visible = true;
	}, 100); // delay in ms
}

/**
 * TODO generated, please specify type and doc for the params
 * @param containedForm
 *
 * @properties={"typeid":24,"uuid":"12E3EA6A-50DD-4E9A-B55F-CE6FE0D011AC"}
 */
function setContainedForm( containedForm) {
	forms.formDemoContainer.elements.demo_container.containedForm = containedForm;
}
