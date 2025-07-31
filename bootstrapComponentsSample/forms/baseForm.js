/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"DB12AD13-C1EB-4CC9-BB17-EF073C51A455"}
 */
function onLoad(event) {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.btn_Button.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Button', 'buttonForm')
}
