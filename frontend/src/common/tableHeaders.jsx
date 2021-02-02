import React from "react";

function TableHeaders({ theme, defaultHeaders, rows }) {
  return (
    <>
      {defaultHeaders.map((defaultHeader => (
        <th key={defaultHeader}>{defaultHeader}</th>
      )))}

      {rows.map((header) => (
        <th key={Object.keys(header)}>{Object.keys(header)}</th>
      ))}
    </>
  );
}

export default TableHeaders;
