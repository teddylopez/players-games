import React from "react";

function Nav({ player }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container container-fluid nav-flex">
          <div className="logo-container">
            <a className="navbar-brand" href="#">
              <img
                className="brand-logo"
                src="https://www.mlbstatic.com/team-logos/team-cap-on-dark/112.svg"
              />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Scouting
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Advance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Video
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Leaderboards
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Glossary
                </a>
              </li>
            </ul>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 hidden">
              <li className="nav-item">
                <a className="nav flex-column" href="#">
                  {`${player.first_name} ${player.last_name}`}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Overview
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Notes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  PD Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Games
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Projections
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contracts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Splits
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-sm btn-outline-light">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="subheader">
        <div className="container">
          {player.first_name ? (
            <h5>{`${player.first_name} ${player.last_name}`}</h5>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
