/* Image is a component that can show either a dataprovider based image (DB column/form or scope variable) or an image from the media section of your solution. When it is enabled and editable it also provides means to download and upload am image from/to the dataprovider.*/

/**
 * Value to be filled in alt html attribute of the img tag.
 */
var alternate;

/**
 * Flag indicating whether the image component is enabled for user interaction.
 */
var enabled;

/**
 * Flag indicating whether the image component is editable.
 */
var editable;

/**
 * Bound data provider identifier for the image value.
 */
var dataProviderID;

/**
 * Specifies the media resource to be used when displaying the image.
 */
var media;

/**
 * Flag indicating whether the image component is read-only.
 */
var readOnly;

/**
 * Dimensions (width and height) of the image component.
 */
var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the image.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Fired when the image component is clicked.
     *
     * @param {JSEvent} event the event object containing details about the click event e.g. target element, mouse coordinates
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {dataproviderType} oldValue the previous image value from the data provider
     * @param {dataproviderType} newValue the new image value to be set in the data provider
     * @param {JSEvent} event the event object associated with the data change
     *
     * @return {Boolean} True if the new image value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {}
};

