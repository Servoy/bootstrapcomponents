/**
 * TODO generated, please specify type and doc for the params
 * @param title
 *
 * @properties={"typeid":24,"uuid":"A4335610-E23A-4DFE-958A-3A3664D17032"}
 */
function setTitle(title) {
	elements.label_form.text = title;
	restartLabelAnimation();
}

/**
 * Restart the shimmer animation on the label
 *
 * @properties={"typeid":24,"uuid":"881225D4-8101-4FDC-94F3-F9995B7AB61C"}
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
 * @properties={"typeid":24,"uuid":"FE38D4BA-5372-4068-AD30-0F05C8BE6323"}
 */
function setContainedForm( containedForm) {
	forms.formDemoContainer.elements.demo_container.containedForm = containedForm;
}
