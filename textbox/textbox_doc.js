/**
 * Request the focus to this text field.
 * @example %%prefix%%%%elementName%%.requestFocus();
 * @param {Boolean} [mustExecuteOnFocusGainedMethod] If false will not execute the onFocusGained method; the default value is true
 */
function requestFocus(mustExecuteOnFocusGainedMethod) {}

/**
 * Reset the dataProvider to null and change the inputType of the textbox.<br/>
 * <b>Note:</b> the value of the dataProvider bound to this field will be automatically set to null
 * @param {String} inputType allowed values for inputType are <i>text, password, email, tel, date, time, datetime-local, month, week, number, color</i>
 * @example %%prefix%%%%elementName%%.inputType("tel");
 * 
 * @return {Boolean} True if the inputType was successfully changed and the dataProvider was reset to null; false otherwise.
 */
function setInputType(inputType) {}

/**
 * Toggles the display of the error message for the component.
 * 
 * @param {Boolean} show A flag indicating whether to show (true) or hide (false) the error message.
 */
function toggleErrorMessage() {
}
