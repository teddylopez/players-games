import React from "react";

function Sidebar() {
  return (
    <div
      className="col-xs-6 col-sm-2 col-sm-pull-10 sidebar-offcanvas hidden-xs"
      id="sidebar"
    >
      <div className="sidebar-player-photo">
        <img
          alt="player"
          className="player-photo"
          src="https://securea.mlb.com/mlb/images/players/head_shot/519203.jpg"
        ></img>
      </div>
      <ul className="list-group">
        <li className="">Overview</li>
        <li className="">Notes</li>
        <li className="">PD Reports</li>
        <li className="">Scouting Reports</li>
        <li className="active">Games</li>
        <li className="">Projections</li>
        <li className="">Contracts</li>
        <li className="">Transactions</li>
        <li className="">Splits</li>
      </ul>
    </div>
  );
}

export default Sidebar;
