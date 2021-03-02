import express from "express";
const playerRouter = express.Router();
import pool from "../db.js";
import {
  uniq,
  enumsToGameTypes,
  filterSeasonsOfGames,
  filterTypesOfGames,
  filterGamePlayLevels,
  paginate,
  enumsToPlayLevels,
} from "../frontend/src/utils.js";

playerRouter.get("/:id/games", async (req, res) => {
  const { id } = req.params;
  const { page, season, game_type, play_level, sort } = req.query;

  try {
    const playerGames = await pool.query(
      `SELECT game_id, starts_at, game_type, play_level, stats, home_team_name, away_team_name FROM games JOIN stat_lines ON games.id = stat_lines.game_id JOIN players ON stat_lines.player_id = players.id WHERE players.id = ${id} ORDER BY starts_at ${sort}`
    );

    const games = playerGames.rows;

    let queriedGames = [];
    let uniquePlayerSeasons = new Set();
    let uniqueGameTypes = new Set();
    let uniquePlayLevels = new Set();

    for (let game of games) {
      let gameData = {};
      gameData["id"] = game.game_id;
      gameData["startsAt"] = new Date(game.starts_at);
      gameData["gameType"] = game.game_type;
      gameData["playLevel"] = game.play_level;
      gameData["stats"] = game.stats;
      gameData["homeTeamName"] = game.home_team_name;
      gameData["awayTeamName"] = game.away_team_name;

      queriedGames.push(gameData);
      uniquePlayerSeasons.add(`${game.starts_at.toString().substring(10, 15)}`);
      uniqueGameTypes.add(game.game_type);
      uniquePlayLevels.add(game.play_level);
    }

    if (season !== "Career") {
      queriedGames = filterSeasonsOfGames(queriedGames, season);
    }

    if (game_type !== "All") {
      queriedGames = filterTypesOfGames(queriedGames, game_type);
    }

    if (play_level !== "All") {
      queriedGames = filterGamePlayLevels(queriedGames, play_level);
    }

    queriedGames = paginate(queriedGames, page);

    res.json({
      seasons: [...uniquePlayerSeasons],
      gameTypes: [...enumsToGameTypes(uniqueGameTypes)],
      playLevels: [...enumsToPlayLevels(uniquePlayLevels)],
      queriedGames: queriedGames,
    });
  } catch (err) {
    console.log(err.message);
  }
});

export default playerRouter;
