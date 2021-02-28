import "./styles/App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./common/dropdown";
import Loading from "./common/loading";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";
import Table from "./common/table";

function App() {
  const [statTableTheme] = useState("proHitterStandard");
  const [playerId] = useState(64002);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPage, setInitialPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [games, setGames] = useState([]);
  const [season, setSeason] = useState("Career");
  const [seasons, setSeasons] = useState([]);
  const [gameType, setGameType] = useState("All");
  const [gameTypes, setGameTypes] = useState([]);
  const [playLevel, setPlayLevel] = useState("All");
  const [playLevels, setPlayLevels] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      if (reachedEnd) return;
      if (initialPage) {
        setInitialPage(false);
      } else if (!initialPage) {
        setCurrentPage(currentPage + 1);
      }
      setLoading(true);
    }
  };

  const handleFilterChange = (e) => {
    const label = e.currentTarget.attributes.label.value
    const val = e.currentTarget.value
    
    resetDefaults();
    if (label === 'Season') setSeason(val);
    if (label === 'Game Type') setGameType(val);
    if (label === 'Play Level') setPlayLevel(val);
  };

  const handleSort = () => {
    resetDefaults();
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  };

  const resetDefaults = () => {
    setCurrentPage(1);
    setInitialPage(true);
    setLoading(true);
    setReachedEnd(false);
    setGames([]);
  };

  // API call when filtering/scrolling events have been triggered
  useEffect(() => {
    axios
      .get(
        `/api/players/${playerId}/games?page=${currentPage}&season=${season}&game_type=${gameType}&play_level=${playLevel}&sort=${sortDirection}`
      )
      .then(({ data }) => {
        const { seasons, queriedGames, gameTypes, playLevels } = data;

        if (queriedGames.length === 0) {
          setReachedEnd(true);
          setLoading(false);
          return;
        }

        setSeasons(["Career", ...seasons]);
        setGames([...games, ...queriedGames]);
        setGameTypes([...gameTypes]);
        setPlayLevels([...playLevels]);
        setLoading(false);
        setInitialPage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playerId, currentPage, season, gameType, playLevel, sortDirection]);

  return (
    <>
      <Nav />
      <div className="container container-fluid body-wrapper">
        <div className="row row-offcanvas row-offcanvas-right">
          <Sidebar />
          <div className="col-xs-12 col-sm-10 col-sm-push-3">
            <div className="page-segment row flex-container">
              <Dropdown
                label={"Season"}
                value={season}
                collection={seasons}
                onHandleChange={handleFilterChange}
              />
              <Dropdown
                label={"Game Type"}
                value={gameType}
                collection={gameTypes}
                onHandleChange={handleFilterChange}
              />
              <Dropdown
                label={"Play Level"}
                value={playLevel}
                collection={playLevels}
                onHandleChange={handleFilterChange}
              />
            </div>
            <div className="small-page-segment loading-wrapper">
              {loading && <Loading />}
            </div>
            <div className="row table-container" onScroll={handleScroll}>
              <Table items={games} theme={statTableTheme} onSort={handleSort} direction={sortDirection} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
