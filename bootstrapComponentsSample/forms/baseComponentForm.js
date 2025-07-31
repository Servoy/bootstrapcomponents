/**
 * TODO generated, please specify type and doc for the params
 * @param title
 *
 * @properties={"typeid":24,"uuid":"D1B140BD-5E08-4956-93AD-EEB23275A11F"}
 */
function setTitle(title) {
	elements.label_form.text = title;
	restartLabelAnimation();
}

/**
 * Restart the shimmer animation on the label
 *
 * @properties={"typeid":24,"uuid":"FA01AD8B-2D9C-48FF-88D6-AAC15E736ED0"}
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
 * @properties={"typeid":24,"uuid":"93955463-8182-48F2-BFE0-1696BA494019"}
 */
function setContainedForm( containedForm) {
	forms.formDemoContainer.elements.demo_container.containedForm = containedForm;
}
