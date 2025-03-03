/* Label is a label component that can show dynamic text and (optionally) an image. */

/**
 * Name of an input field - 'for' html attribute will be filled in.
 */
var labelFor;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * A column or calculation that provides the CSS style class for this component
 */
var styleClassExpression;

/**
 * Sets the variant of this button, this sets a certain set of styleclasses at runtime for which this variant is configured for
 */
var variant;

/**
 * An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager.
 */
var imageStyleClass;

/**
 * An icon style class property (glyphicon, material design or Font Awesome).<br/>Example 'fas fa-search' <br/>If you want to use Font Awesome classes you need to enable the Font Awesome service from the Servoy Package Manager.
 */
var trailingImageStyleClass;

var text;

var tabSeq;

/**
 * Option whether label text is shown as plain text, sanitized html or trusted html (as is). Inner html elements events can be identified using data-target attribute.
 */
var showAs;

/**
 * Whether the button is visible or not
 */
var visible;



var handlers = {
    /**
     * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     * 
     * @param {JSEvent} event
     * @param {String} dataTarget
     */
    onActionMethodID: function() {},

    /**
     * DoubleClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     * 
     * @param {JSEvent} event
     * @param {String} dataTarget
     */
    onDoubleClickMethodID: function() {},

    /**
     * RightClick event. dataTarget parameter is used to identify inner html elements (by their data-target attribute)
     * 
     * @param {JSEvent} event
     * @param {String} dataTarget
     */
    onRightClickMethodID: function() {}
};
