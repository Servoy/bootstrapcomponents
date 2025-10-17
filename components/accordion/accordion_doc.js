/*
 * The AccordionPanel component is a container similar to a TabPanel, but, instead of having tabs for showing / hiding forms, it has buttons that behave like an accordion, moving one way or the other. 
 */

/**
 * The CSS class(es) to be added to container element - parent of the form element.
 */
var containerStyleClass;

/**
 * Array of tabs within the accordion component.
 */
var tabs;

/**
 * The CSS class(es) to be added to accordion element.
 */
var styleClass;

/**
 * Minimum height of the accordion, should be used for responsive forms.
 */
var height;

/**
 * The index used for tab order when setting focus.
 */
var tabIndex;

/**
 * The tab sequence order used during design.
 */
var tabSeq;

/**
 * The index of the currently active tab in the accordion.
 */
var activeTabIndex;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Fired after a different tab is selected
     *
     * @param {Number} previousIndex The previous tab index
     * @param {JSEvent} event The event object associated with the tab change
     * @param {Number} newIndex The tab index that is now set
     */
    onChangeMethodID: function() {}
};


/**
 *  Adds a tab to this accordion with that form and text on the given index
 * 
 * @param {Form} form The form to be added as a new tab in the accordion component.
 * @param {Tagstring} tabText The text to be displayed on the tab for the added form.
 * @param {Number} [index] Optional. The position at which the tab should be added. If not provided, the tab is added at the end.
 * 
 * @return {CustomType<bootstrapcomponents-accordion.tab>} The newly created tab object that represents the added form in the accordion component.
 */
 function addTab (form, tabText, index) {}

/**
 *  Return the Tab of the given index.
 * 
 * @param {Number} i The 1-based index of the tab to retrieve from the accordion component.
 * 
 * @return {CustomType<bootstrapcomponents-accordion.tab>} The tab object at the specified index in the accordion component.
 */
 function getTabAt (index) {}

/**
 * Removes a tab of the given index.
 * Return true if this was sucessfull.
 * 
 * @param {Number} index The 1-based position of the tab to be removed from the accordion component.
 * 
 * @return {Boolean} True if the tab was successfully removed; false otherwise.
 */
function removeTabAt(index) {}

/**
 * Select the tab of the given index.
 * Return true if this was succesfull.
 * @deprecated use tabIndex property instead.
 */
function selectTabAt(index) {}


/**
 * Type definitions for bootstrapcomponents-accordion types.
 */
var svy_types = {

    /**
     * Defines a tab object for the AccordionPanel component.
     */
    tab: {

        /**
         * The form contained within the tab.
         */
        containedForm: null,

        /**
         * The text displayed on the tab.
         */
        text: null,

        /**
         * The relation name associated with the tab used for linking forms.
         */
        relationName: null,

        /**
         * The unique name identifier of the tab.
         */
        name: null,

        /**
         * Whether the tab is disabled.
         */
        disabled: null
    }
}
