export const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${month}/${day}/${year}`;
};

export const getUniqueArrayValues = (array) => {
  return array.filter((x, i, a) => a.indexOf(x) === i);
};

export const getMatchupDetails = (game) => {
  const { homeTeamName, awayTeamName, gameType } = game;

  return `${abbrevTeamName(awayTeamName)} @ ${abbrevTeamName(
    homeTeamName
  )} ${springTrainingGameLabel(gameType)}`;
};

export const springTrainingGameLabel = (gameType) => {
  return gameType === 3 ? "(ST)" : "";
};

export const positionText = (player) => {
  return player[0]["mlb_info"]["position"];
};

export const gameEnumLabels = (enumValue) => {
  const enumTypes = {
    "All": "All",
    "0": "Intrasquad",
    "1": "Instructional",
    "2": "Exhibition",
    "3": "Spring Training",
    "4": "Regular Season",
    "5": "All-Star",
    "6": "Wild Card",
    "7": "Division Series",
    "8": "Championship Series",
    "9": "World Series",
    "10": "Championship",
  };
  return enumTypes[enumValue];
};

export const playLevelEnumLabels = (enumValue) => {
  const enumTypes = {
    "All": "All",
    "0": "ML",
    "1": "AAA",
    "2": "AA",
    "3": "A+",
    "4": "A Short",
    "5": "Rookie",
    "6": "R",
  };
  return enumTypes[enumValue];
};

export const abbrevTeamName = (team) => {
  const abbrevs = {
    "Arizona Diamondbacks": "ARI",
    "Atlanta Braves": "ATL",
    "Baltimore Orioles": "BAL",
    "Boston Red Sox": "BOS",
    "Chicago Cubs": "CHC",
    "Chicago White Sox": "CWS",
    "Cincinnati Reds": "CIN",
    "Cleveland Indians": "CLE",
    "Colorado Rockies": "COL",
    "Detroit Tigers": "DET",
    "Houston Astros": "HOU",
    "Los Angeles Angels": "LAA",
    "Los Angeles Dodgers": "LAD",
    "Kansas City Royals": "KC",
    "Miami Marlins": "MIA",
    "Milwaukee Brewers": "MIL",
    "Minnesota Twins": "MIN",
    "New York Mets": "NYM",
    "New York Yankees": "NYY",
    "Philadelphia Phillies": "PHI",
    "Oakland Athletics": "OAK",
    "Pittsburgh Pirates": "PIT",
    "Seattle Mariners": "SEA",
    "San Diego Padres": "SD",
    "Tampa Bay Rays": "TB",
    "San Francisco Giants": "SF",
    "Texas Rangers": "TEX",
    "St. Louis Cardinals": "STL",
    "Toronto Blue Jays": "TOR",
    "Washington Nationals": "WAS",
    "Italy Italy": "Italy",
    "National League All-Stars": "NL All-Stars",
    "American League All-Stars": "AL All-Stars",
  };

  if (abbrevs[team]) {
    return abbrevs[team];
  } else {
    return team;
  }
};
