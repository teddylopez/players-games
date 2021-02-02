const express = require("express");
const playerRouter = express.Router();
const pool = require("../db.js");

playerRouter.get("/:id/games", async (req, res) => {
  const { id } = req.params;
  let { page, season, game_type } = req.query;
  let perPage = 50;
  let startIndex = (page - 1) * perPage;
  let endIndex = page * perPage;

  try {

    const allGames = await pool.query(
      "SELECT * FROM games JOIN stat_lines ON games.id = stat_lines.game_id JOIN players ON stat_lines.player_id = players.id WHERE players.id = $1 ORDER BY starts_at DESC",
      [id]
    );

    const uniquePlayerSeasons = allGames.rows
      .map((game) => {
        const dateObj = new Date(game.starts_at);
        var year = dateObj.getFullYear();
        return `${year}`;
      })
      .filter((x, i, a) => a.indexOf(x) === i);

    const uniqueGameTypes = allGames.rows
      .map((game) => {
        return game.game_type;
      })
      .filter((x, i, a) => a.indexOf(x) === i);

    const firstRow = allGames.rows[0]
    const playerInfo = {
      "id": firstRow['id'],
      "last_name": firstRow['last_name'],
      "first_name": firstRow['first_name'],
    }

    let queriedGames = [];
    for (game of allGames.rows) {
      let gameData = {};
      gameData["id"] = game.game_id;
      gameData["startsAt"] = new Date(game.starts_at);
      gameData["gameType"] = game.game_type;
      gameData["statLineType"] = game.stat_line_type;
      gameData["stats"] = game.stats;
      gameData["homeTeamName"] = game.home_team_name;
      gameData["awayTeamName"] = game.away_team_name;
      queriedGames.push(gameData);
    }

    if (season) {
      if (season !== "Career") {
        let startDate = new Date(`${season}-01-01`);
        let endDate = new Date(`${Number(season) + 1}-01-01`);
        queriedGames = queriedGames.filter(
          (game) => game.startsAt >= startDate && game.startsAt < endDate
        );
      }
    }

    if (game_type) {
      if (game_type !== "All") {
        queriedGames = queriedGames.filter(
          (game) => game.gameType === Number(game_type)
        );
      }
    }

    queriedGames = queriedGames.slice(startIndex, endIndex);

    res.json({
      player: playerInfo,
      seasons: uniquePlayerSeasons,
      queriedGames: queriedGames,
      gameTypes: uniqueGameTypes,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = playerRouter;
