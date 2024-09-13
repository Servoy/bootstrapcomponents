/* The AccordionPanel component is a container similar to a TabPanel, but, instead of having tabs for showing / hiding forms, it has buttons that behave like an accordion, moving one way or the other. */

/**
 *  Adds a tab to this accordion with that form and text on the given index
 */
 function addTab (form, tabText, index) {}

/**
 *  Return the Tab of the given index.
 */
 function getTabAt (index) {}

/**
 * Removes a tab of the given index.
 * Return true if this was sucessfull.
 */
function removeTabAt(index) {}

/**
 * Select the tab of the given index.
 * Return true if this was succesfull.
 * @deprecated use tabIndex property instead.
 */
function selectTabAt(index) {}

