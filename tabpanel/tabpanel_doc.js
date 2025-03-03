/**
 * Selects the tab of the given index
 * @deprecated use tabIndex property instead.
 */
function selectTabAt(idx) {}

/**
 * Adds a tab with the given form and tab text on the given index.
 * 
 * @param {Form} form The name of the form to add as a tab
 * @param {String} tabText The tab text that should be displayed
 * @param {Number} [index] Give an index where the tab should be placed, default at the end.
 * 
 * @return {CustomType<bootstrapcomponents-tabpanel.tab>} The newly created tab object that represents the added form in the tab panel.
 */
 function addTab(form, tabText, index) {}

/**
 * Removes the tab from the given index.
 * 
 * @param {Number} index <<<<<<<< add description for this param <<<<<<<<
 * @return {Boolean} True if the tab was successfully removed; false otherwise.
 */
function removeTabAt(index) {}

/**
 * Removes all tabs of this tabpanel
 * 
 * @return {Boolean} True if all tabs were successfully removed; false otherwise.
 */
function removeAllTabs() {}

/**
 * Retrieves the tab at the specified index from the tabs model.
 * @param {Number} index The 1-based index of the tab to retrieve.
 * @return {CustomType<bootstrapcomponents-tabpanel.tab>} The tab object at the specified index, or null if the index is out of range.
 */
function getTabAt() {
}