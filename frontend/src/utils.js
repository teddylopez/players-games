const {
  REGULAR_SEASON_GAME_TYPES,
  UNOFFICIAL_GAME_TYPES,
  SPRING_TRAINING_GAME_TYPES,
  PLAYOFF_GAME_TYPES,
  PLAY_LEVELS,
  ORGS
} = require("./constants.js");

// Get unique values from arrays:
const uniq = (arr) => [...new Set(arr)]

// Get key of object by value:
const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${month}/${day}/${year}`;
};

const getGameMatchup = (game) => {
  const { homeTeamName, awayTeamName, gameType } = game;

  return `${abbrevTeamName(awayTeamName)} @ ${abbrevTeamName(
    homeTeamName
  )} ${springTrainingLabel(gameType)}`;
};

const abbrevTeamName = (team) => {
  return ORGS[team] ? ORGS[team] : team
};

const springTrainingLabel = (gameType) => {
  return SPRING_TRAINING_GAME_TYPES.includes(gameType) ? "(ST)" : "";
};

const enumsToGameTypes = (arrayOfEnumGameTypes) => {
  const translatedGameTypes = ["All"];

  for (let gameType of arrayOfEnumGameTypes) {
    if (REGULAR_SEASON_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Regular Season");
    if (UNOFFICIAL_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Unofficial");
    if (PLAYOFF_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Playoff");
  }
  return uniq(translatedGameTypes);
};

const enumsToPlayLevels = (arrayOfEnumPlayLevels) => {
  const translatedPlayLevels = ["All"];

  for (let playLevel of arrayOfEnumPlayLevels) {
    translatedPlayLevels.push(PLAY_LEVELS[playLevel]);
  }
  return uniq(translatedPlayLevels);
};

const filterTypesOfGames = (games, typeOfGame) => {
  if (typeOfGame === "Regular Season") return games.filter(game => REGULAR_SEASON_GAME_TYPES.includes(game.gameType))
  if (typeOfGame === "Unofficial") return games.filter(game => UNOFFICIAL_GAME_TYPES.includes(game.gameType))
  if (typeOfGame === "Playoff") return games.filter(game => PLAYOFF_GAME_TYPES.includes(game.gameType))
}

const filterGamePlayLevels = (games, play_level) => {
  const playLevel = getKeyByValue(PLAY_LEVELS, play_level);
  return games.filter(game => `${game['playLevel']}` === playLevel)
}

const filterSeasonsOfGames = (games, season) => {
  const startDate = new Date(`${season}-01-01`);
  const endDate = new Date(`${Number(season) + 1}-01-01`);
  return games.filter(
    (game) => game.startsAt >= startDate && game.startsAt < endDate
  );
}

const paginate = (items, page, resultsPerPage = 50) => {
  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = page * resultsPerPage;
  return items.slice(startIndex, endIndex)
}

module.exports = {
  uniq,
  formatDate,
  getGameMatchup,
  enumsToGameTypes,
  enumsToPlayLevels,
  filterSeasonsOfGames,
  filterTypesOfGames,
  filterGamePlayLevels,
  paginate
};
