/* Image is a component that can show either a dataprovider based image (DB column/form or scope variable) or an image from the media section of your solution. When it is enabled and editable it also provides means to download and upload am image from/to the dataprovider.*/

/**
 * Value to be filled in alt html attribute of the img tag.
 */
var alternate;

var enabled;

var editable;

var dataProviderID;

var media;

var size;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

var tabSeq;

var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     *
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {}
};

