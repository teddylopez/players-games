import {
  REGULAR_SEASON_GAME_TYPES,
  UNOFFICIAL_GAME_TYPES,
  SPRING_TRAINING_GAME_TYPES,
  PLAYOFF_GAME_TYPES,
  PLAY_LEVELS,
  ORGS,
  DEFAULT_SORTABLE_TABLE_HEADERS
} from "./constants.js";

// Get unique values from arrays:
export const uniq = (arr) => [...new Set(arr)]

// Get key of object by value:
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${month}/${day}/${year}`;
};

export const getGameMatchup = (game) => {
  const { homeTeamName, awayTeamName, gameType } = game;

  return `${abbrevTeamName(awayTeamName)} @ ${abbrevTeamName(
    homeTeamName
  )} ${springTrainingLabel(gameType)}`;
};

export const abbrevTeamName = (team) => {
  return ORGS[team] ? ORGS[team] : team
};

export const springTrainingLabel = (gameType) => {
  return SPRING_TRAINING_GAME_TYPES.includes(gameType) ? "(ST)" : "";
};

export const enumsToGameTypes = (arrayOfEnumGameTypes) => {
  const translatedGameTypes = ["All"];

  for (let gameType of arrayOfEnumGameTypes) {
    if (REGULAR_SEASON_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Regular Season");
    if (UNOFFICIAL_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Unofficial");
    if (PLAYOFF_GAME_TYPES.includes(gameType)) translatedGameTypes.push("Playoff");
  }
  return uniq(translatedGameTypes);
};

export const enumsToPlayLevels = (arrayOfEnumPlayLevels) => {
  const translatedPlayLevels = ["All"];

  for (let playLevel of arrayOfEnumPlayLevels) {
    translatedPlayLevels.push(PLAY_LEVELS[playLevel]);
  }
  return uniq(translatedPlayLevels);
};

export const filterTypesOfGames = (games, typeOfGame) => {
  if (typeOfGame === "Regular Season") return games.filter(game => REGULAR_SEASON_GAME_TYPES.includes(game.gameType))
  if (typeOfGame === "Unofficial") return games.filter(game => UNOFFICIAL_GAME_TYPES.includes(game.gameType))
  if (typeOfGame === "Playoff") return games.filter(game => PLAYOFF_GAME_TYPES.includes(game.gameType))
}

export const filterGamePlayLevels = (games, play_level) => {
  const playLevel = getKeyByValue(PLAY_LEVELS, play_level);
  return games.filter(game => `${game['playLevel']}` === playLevel)
}

export const filterSeasonsOfGames = (games, season) => {
  const startDate = new Date(`${season}-01-01`);
  const endDate = new Date(`${Number(season) + 1}-01-01`);
  return games.filter(
    (game) => game.startsAt >= startDate && game.startsAt < endDate
  );
}

export const paginate = (items, page, resultsPerPage = 50) => {
  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = page * resultsPerPage;
  return items.slice(startIndex, endIndex)
}

export const isSortableColumn = (header) => {
  return DEFAULT_SORTABLE_TABLE_HEADERS.includes(header)
}

export const tableHeaderLabel = (header, direction) => {
  if (isSortableColumn(header)) {
    return `${header} ${direction === 'asc' ? '▲' : '▼'}`
  } else {
    return header
  }
}

export const sortColumn = (sortFunction, column) => {
  return isSortableColumn(column)
    ? (e) => sortFunction()
    : null
}

export const sortableHeaderClass = (header, direction) => {
  return isSortableColumn(header)
    ? `sortable-header ${direction}`
    : null
}
