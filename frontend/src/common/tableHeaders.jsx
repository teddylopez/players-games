import React from "react";

function TableHeaders({ defaultHeaders, rows }) {
  return (
    <>
      {defaultHeaders.map((defaultHeader) => (
        <th
          className={`th-default-${defaultHeader.toLowerCase()}`}
          key={defaultHeader}
        >
          {defaultHeader}
        </th>
      ))}

      {rows.map((header) => (
        <th key={Object.keys(header)}>{Object.keys(header)}</th>
      ))}
    </>
  );
}

export default TableHeaders;
