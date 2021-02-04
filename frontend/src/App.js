import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./common/dropdown";
import Loading from "./common/loading";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";
import Table from "./common/table";
import { gameEnumLabels, playLevelEnumLabels} from "./utils";

function App() {
  const [player, setPlayer] = useState([]);
  const [statTableTheme, setStatTableTheme] = useState("proHitterStandard");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPage, setInitialPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [games, setGames] = useState([]);
  const [gameTypes, setGameTypes] = useState(["All"]);
  const [gameType, setGameType] = useState("All");
  const [season, setSeason] = useState("Career");
  const [seasons, setSeasons] = useState(["Career"]);
  const [playLevels, setPlayLevels] = useState(["All"]);
  const [playLevel, setPlayLevel] = useState("All");

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      if (reachedEnd) return;
      if (initialPage) {
        setInitialPage(false);
        return;
      } else if (!initialPage) {
        setCurrentPage(currentPage + 1);
      }
      setLoading(true);
    }
  };

  const handleSeasonChange = (e) => {
    resetDefaults();
    setSeason(e.currentTarget.value);
  };

  const handleGameTypeChange = (e) => {
    resetDefaults();
    setGameType(e.currentTarget.value);
  };

  const handlePlayLevelChange = (e) => {
    resetDefaults();
    setPlayLevel(e.currentTarget.value);
  };

  const resetDefaults = () => {
    setCurrentPage(1);
    setInitialPage(true);
    setLoading(true);
    setReachedEnd(false);
    setGames([]);
  };

  // API call when when filtering/scrolling events have been triggered
  useEffect(() => {
    axios
      .get(
        `/api/players/64002/games?page=${currentPage}&season=${season}&game_type=${gameType}&play_level=${playLevel}`
      )
      .then(({ data }) => {
        const { player, seasons, queriedGames, gameTypes, playLevels } = data;

        if (queriedGames.length === 0) {
          setReachedEnd(true);
          setLoading(false);
          return;
        }

        setPlayer(player);
        setSeasons(["Career", ...seasons]);
        setGames([...games, ...queriedGames]);
        setGameTypes(["All", ...gameTypes]);
        setPlayLevels(["All", ...playLevels]);
        setLoading(false);
        setInitialPage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, season, gameType, playLevel]);

  return (
    <>
      <Nav player={player} />
      <div className="container container-fluid body-wrapper">
        <div className="row row-offcanvas row-offcanvas-right">
          <Sidebar />
          <div className="col-xs-12 col-sm-10 col-sm-push-3">
            <div className="page-segment row flex-container">
              <Dropdown
                label={"Season"}
                value={season}
                collection={seasons}
                onHandleChange={handleSeasonChange}
              />
              <Dropdown
                label={"Game Type"}
                value={gameType}
                collection={gameTypes}
                onHandleChange={handleGameTypeChange}
                setLabel={gameEnumLabels}
              />
              <Dropdown
                label={"Play Level"}
                value={playLevel}
                collection={playLevels}
                onHandleChange={handlePlayLevelChange}
                setLabel={playLevelEnumLabels}
              />
            </div>
            <div className="small-page-segment loading-wrapper">
              {loading && <Loading />}
            </div>
            <div className="row table-container" onScroll={handleScroll}>
              <Table games={games} theme={statTableTheme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
