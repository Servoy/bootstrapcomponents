/**
 * The TabPanel component is a container that organizes multiple forms into a tabbed interface, only one form being visible (selected) at any point in time.
 */

/**
 * The CSS style class(es) applied to the container element of the TabPanel.
 */
var containerStyleClass;

/**
 * The CSS style class applied to the close icon used in the TabPanel's tab headers. Only applicable if showTabCloseIcon is true.
 */
var closeIconStyleClass;

/**
 * Flag indicating whether the close icon is displayed on the tabs. Default value is false.
 */
var showTabCloseIcon;

/**
 * An array of tab objects contained within the TabPanel.
 */
var tabs;

/**
 * Set the styleclass(es) that should be applied at to this component.
 */
var styleClass;

/**
 * Minimum height of the tabpanel, should be used for responsive forms. Can be 100% (to take parent container height) or a number (in pixels).
 */
var height;

/**
 * The current 1-based index of the active(visible) tab from tabs array. Can also be set to change the active tab.
 */
var tabIndex;

/**
 * Tab sequence number of form containers is used for all nested components in the main form.
 */
var tabSeq;

/**
 * Whether the tabpanel is visible or not. Default is true (visible).
 */
var visible;

var handlers = {
    /**
     * Fired after a different tab is selected
     *
     * @param {Number} previousIndex The previous tab index before the change
     * @param {JSEvent} event The event object associated with the tab change
	 * @param {Number} newIndex The current tab index ( after the change )
     */
    onChangeMethodID: function() {},

    /**
     * Fired when the user clicks on a tab. When false is returned, the tab switch is prevented
     *
     * @param {JSEvent} event The event object that triggered the action
     * @param {Number} clickedTabIndex The index of the tab that was clicked
     * @param {String} dataTarget The identifier of the closest data-target attribute, if available
     *
     * @return {Boolean} True to allow the tab switch, false to prevent it
     */
    onTabClickedMethodID: function() {},

    /**
     * Fired when the user clicks on the tab close icon. When false is returned, the tab close is prevented
     *
     * @param {JSEvent} event The event object that triggered the action
     * @param {Number} clickedTabIndex The index of the tab that was clicked
     *
     * @return {Boolean} True to allow closing the tab, false to prevent it
     */
    onTabCloseMethodID: function() {}
};

/**
 * Selects the tab of the given index
 * @deprecated use tabIndex property instead.
 */
function selectTabAt(idx) {}

/**
 * Adds a tab with the given form and tab text on the given index.
 * 
 * @param {Form} form The name of the form to add as a tab
 * @param {Tagstring} tabText The tab text that should be displayed. Can contain tags (i18n keys or foundset data).
 * @param {Number} [index] Give an index where the tab should be placed in the array of tabs, default at the end.
 * 
 * @return {CustomType<bootstrapcomponents-tabpanel.tab>} The newly created tab object that represents the added form in the tab panel.
 */
 function addTab(form, tabText, index) {}

/**
 * Removes the tab from the given index (index is 1-based).
 * 
 * @param {Number} index The 1-based index of the tab to remove.
 * 
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
 * 
 * @return {CustomType<bootstrapcomponents-tabpanel.tab>} The tab object at the specified index, or null if the index is out of range.
 */
function getTabAt(index) {
}

/**
 * Type definitions for bootstrapcomponents-tabpanel types.
 */
var svy_types = {

    /**
     * Represents a tab in the tabpanel.
     */
    tab: {

        /**
         * The form contained within the tab.
         */
        containedForm: null,

        /**
         * The media identifier for the tab's icon.
         */
        imageMediaID: null,

        /**
         * The text displayed on the tab.
         */
        text: null,

        /**
         * The relation used for loading data into the form contained within the tab. Can be null if no relation is used.
         */
        relationName: null,

        /**
         * The unique name identifier of the tab.
         */
        name: null,

        /**
         * Flag indicating whether the tab is disabled.
         */
        disabled: null,

        /**
         * When true, the close icon is hidden for this tab.
         */
        hideCloseIcon: null,

        /**
         * CSS style class(es) that can define icon on the tab (like fontawesome icon).
         */
        iconStyleClass: null,

        /**
         * Tooltip text displayed when hovering over the tab.
         */
        toolTipText: null,

        /**
         * Additional CSS style classes applied to the tab.
         */
        styleClass: null,

    }
}
