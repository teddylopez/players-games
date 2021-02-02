import React, { useState } from "react";
import TableHeaders from "../common/tableHeaders";
import TableRows from "../common/tableRows";
import { tableThemes, defaultTableHeaders, defaultTableRows } from "../tableThemeConstants";

function Table({ games, theme }) {
  const [rows] = useState(tableThemes(theme));

  return (
    <>
      <table className="table table-sm table-striped player-stat-table">
        <thead className="thead-dark">
          <tr className="sticky">
            <TableHeaders defaultHeaders={defaultTableHeaders(theme)} rows={rows} />
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <TableRows defaultRows={defaultTableRows(theme, game)} rows={rows} game={game} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
