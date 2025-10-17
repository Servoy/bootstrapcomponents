/*
 * A table that displays a data grid with pagination, sorting, and customizable columns.
 * 
 * DEPRECATED: Use Servoy Extra Components package - Table component or Servoy NG-Grids package - Data Grid component instead.
 */

/**
 * An array of column definitions for the table.
 */
var columns;

/**
 * The current page number for pagination.
 */
var currentPage;

/**
 * The foundset containing the data displayed in the table.
 */
var foundset;

/**
 * The number of rows per page.
 */
var pageSize;

/**
 * The dimensions (width and height) of the table component.
 */
var size;

/**
 * CSS style classes applied to the table.
 */
var styleClass;

/**
 * CSS style classes applied to the selected row.
 */
var selectionClass;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Tooltip text displayed when hovering over the table.
 */
var toolTipText;

/**
 * Whether the button is visible or not
 */
var visible;


var handlers = {
    /**
     * Called when the mouse is clicked on a row/cell (row and column are given) or
     * when the ENTER key is used then only the selected row is given
     *
     * @param {Number} row The index of the clicked row.
     * @param {Number} [column] The index of the clicked column.
     */
    onCellClick: function() {},

    /**
     * Called when a header is clicked.
     * @param {Number} column The index of the clicked column.
     */
    onHeaderClick: function() {}
};

var svy_types = {

    /**
   * Represents a column in the table.
   */
  column: {
    /**
     * The dataprovider linked to this column, used for retrieving its values.
     */
    dataprovider: null,
    /**
     * The format string for displaying the column's data.
     */
    format: null,
    /**
     * CSS style classes applied to the column header.
     */
    headerStyleClass: null,
    /**
     * The header text displayed for the column.
     */
    headerText: null,
    /**
     * CSS style classes applied to the column cells.
     */
    styleClass: null,
    /**
     * The value list used to map column values.
     */
    valuelist: null
  }
}
