/* The AccordionPanel component is a container similar to a TabPanel, but, instead of having tabs for showing / hiding forms, it has buttons that behave like an accordion, moving one way or the other. */

/**
 *  Adds a tab to this accordion with that form and text on the given index
 * 
 * @param {Form} form The form to be added as a new tab in the accordion component.
 * @param {String} tabText The text to be displayed on the tab for the added form.
 * @param {Number} [index] Optional. The position at which the tab should be added. If not provided, the tab is added at the end.
 * 
 * @return {CustomType<bootstrapcomponents-accordion.tab>} The newly created tab object that represents the added form in the accordion component.
 */
 function addTab (form, tabText, index) {}

/**
 *  Return the Tab of the given index.
 * 
 * @param {Number} i The 0-based index of the tab to retrieve from the accordion component.
 * @return {CustomType<bootstrapcomponents-accordion.tab>} The tab object at the specified index in the accordion component.
 */
 function getTabAt (index) {}

/**
 * Removes a tab of the given index.
 * Return true if this was sucessfull.
 * 
 * @param {Number} index The 0-based position of the tab to be removed from the accordion component.
 * @return {Boolean} True if the tab was successfully removed; false otherwise.
 */
function removeTabAt(index) {}

/**
 * Select the tab of the given index.
 * Return true if this was succesfull.
 * @deprecated use tabIndex property instead.
 */
function selectTabAt(index) {}

