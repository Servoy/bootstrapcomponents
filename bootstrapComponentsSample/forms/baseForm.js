/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={"typeid":24,"uuid":"DF2EE7F7-692B-47F5-865F-43B11B0936A4"}
 */
function onLoad(event) {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.btn_Button.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Button', 'buttonForm')
}
