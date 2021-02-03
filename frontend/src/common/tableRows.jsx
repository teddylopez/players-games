import React from "react";

function TableRows({ defaultRows, rows, game }) {
  return (
    <>
      {defaultRows.map((defaultRow) => (
        <td className="default-row" key={defaultRow}>
          {defaultRow}
        </td>
      ))}

      {rows.map((row) => (
        <td
          className={`player_table_${Object.values(row)}`}
          key={`${Object.values(row)}`}
        >
          {game.stats[`${Object.values(row)}`]}
        </td>
      ))}
    </>
  );
}

export default TableRows;
