import React from "react";
import { defaultSortableHeaders } from "../tableThemes";
import { isSortableColumn, sortColumn, sortableHeaderClass, tableHeaderLabel } from "../utils";

function TableHeaders({ defaultHeaders, rows, onSort, direction }) {

  return (
    <>
      {defaultHeaders.map((defaultHeader) => (
        <th
          className={`th-default-${defaultHeader.toLowerCase()} ${sortableHeaderClass(defaultHeader, direction)}`}
          key={defaultHeader}
          onClick={sortColumn(onSort, defaultHeader)}
        >
          {tableHeaderLabel(defaultHeader, direction)}
        </th>
      ))}

      {rows.map((header) => (
        <th key={Object.keys(header)}>{Object.keys(header)}</th>
      ))}
    </>
  );
}

export default TableHeaders;
