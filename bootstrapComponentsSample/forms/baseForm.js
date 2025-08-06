/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"B3816812-5A41-458A-A564-5051BEBF0F7B"}
 */
function onLoad(event) {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.btn_Button.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Button', 'buttonForm')
}
