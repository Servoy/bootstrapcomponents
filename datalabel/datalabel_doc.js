/** 
 * DataLabel is a label component that can show dynamic text and (optionally) an image. 
 */

/**
 * The column or variable to provide the data for this label.
 */
var dataProviderID;

/**
 * The value list which is used to get a display value for the actual columns real value like id -> name
 */
var valuelistID;

/**
 * Whether the component is enabled or not; blocks onAction, onDoubleClick, onRightClick events.
 */
var enabled;

/**
 * A format to format the data shown
 */
var format;

/**
 * Deprecated
 */
var size;

/**
 * CSS style class for this component
 */
var styleClass;

/**
 * A column or calculation that provides the CSS style class for this component
 */
var styleClassExpression;

/**
 * An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. 
 */
var imageStyleClass;

/**
 * An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager. 
 */
var trailingImageStyleClass;

/**
 * Tab sequence index of the form
 */
var tabSeq;

/**
 * Option whether label text (coming from dataprovider) is shown as plain text, sanitized html or trusted html (as is). Inner html elements events can be identified using data-target attribute.
 */
var showAs;

/**
 * Tooltip text shown when hovering over the component (i18n is supported)
 */
var toolTipText;

/**
 * Whether the label is visible or not
 */
var visible;


var handlers = {
    /**
     * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     *
     * @param {JSEvent} event The event object containing details about the click event e.g. target element, mouse coordinates
     * @param {String} dataTarget The identifier for inner HTML elements, identified via the data-target attribute
     */
    onActionMethodID: function() {},

    /**
     * DoubleClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     *
     * @param {JSEvent} event The event object containing details about the double click event e.g. target element, mouse coordinates
     * @param {String} dataTarget The identifier for inner HTML elements, identified via the data-target attribute
     */
    onDoubleClickMethodID: function() {},

    /**
     * RightClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     *
     * @param {JSEvent} event the event object containing details about the right-click event e.g. target element, context menu trigger
     * @param {String} dataTarget the identifier for inner HTML elements, identified via the data-target attribute
     */
    onRightClickMethodID: function() {}
};


