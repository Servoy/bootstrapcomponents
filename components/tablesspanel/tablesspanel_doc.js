/** 
 * Tabless Panel is a container component that displays a form without the visual tab headers typically found in a tab panel.
 */


/**
 * The form that is contained within this tabless panel.
 */
var containedForm;

/**
 * The relation name used to link the contained form to its parent data.
 */
var relationName;

/**
 * When <code>true</code>, the form is rendered when all its latest data is loaded from the server. When <code>false</code>, the form is rendered faster, but could show stale data (not a problem when the form shown does not show dynamic data)
 */
var waitForData;

/**
 * Set the styleclasses that should be applied at to this component
 */
var styleClass;

/**
 * Minimum height of the tabless panel, should be used for responsive forms.
 */
var height;

/**
 * Tab sequence number of form containers is used for all nested components in the main form.
 */
var tabSeq;

/**
 * Whether the button is visible or not
 */
var visible;

