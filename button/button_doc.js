/**
 *  A simple button. It can contain text as well as (optionally) an icon before or after the text. 
 */

/**
 * Whether the component is enabled or not; blocks onAction, onDoubleClick, onRightClick events.
 */
var enabled;

/**
 * For buttons showing as plain text, you can also specify an image styleclass to be displayed to the left. Can be font awesome icons.
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
 * Button style class, typically one of the bootstrap button classes (e.g. 'btn btn-primary')
 */
var styleClass;

/**
 * Sets the variant of this button, this sets a certain set of styleclasses at runtime for which this variant is configured for
 */
var variant;

/**
 * The text shown for the button (i18n is supported)
 */
var text;

/**
 * The size of the button, defining its width and height in pixels.
 */
var size;

/**
 * Option whether button text is shown as plain text, sanitized html or trusted html (as is).
 */
var showAs;

/**
 * Tooltip text shown when hovering over the button (i18n is supported)
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Fired when the button is clicked
     *
     * @param {JSEvent} event The event object containing details about the click event (e.g., target element, mouse coordinates).
     */
    onActionMethodID: function() {},

    /**
     * Fired when the button is double clicked
     *
     * @param {JSEvent} event * @param {JSEvent} event The event object containing details about the double-click event (e.g., target element, click timing).
     */
    onDoubleClickMethodID: function() {},

    /**
     * Fired when the button is right clicked
     *
     * @param {JSEvent} event The event object containing details about the right-click event (e.g., target element, context menu trigger).
     */
    onRightClickMethodID: function() {}
};


/**
* Set the focus to this button.
* 
* @example %%prefix%%%%elementName%%.requestFocus();
*/
function requestFocus() {}