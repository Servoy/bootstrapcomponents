/**
 * TODO generated, please specify type and doc for the params
 * @param title
 *
 * @properties={typeid:24,uuid:"E3EA1F77-E5B8-4225-90C4-A4CEC7203591"}
 */
 function setTitle(title) {
	elements.label_form.text = title;
	restartLabelAnimation();
}

/**
 * Restart the shimmer animation on the label
 *
 * @properties={typeid:24,uuid:"22DFF640-17B4-423E-8583-00F7977BAB42"}
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
 * @properties={typeid:24,uuid:"D8EC683B-35A8-4621-857B-7AFF6BFB6831"}
 */
function setContainedForm( containedForm) {
	forms.formDemoContainer.elements.demo_container.containedForm = containedForm;
}







