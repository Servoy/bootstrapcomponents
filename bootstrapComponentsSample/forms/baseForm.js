
/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C2E808B8-F1EF-4144-A40C-2D7293E61C20"}
 */
function onLoad(event) {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.btn_Button.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Button', 'buttonForm')
}
