const REGULAR_SEASON_GAME_TYPES = [4];
const UNOFFICIAL_GAME_TYPES = [0, 1, 2, 3, 5, 10];
const SPRING_TRAINING_GAME_TYPES = [3];
const PLAYOFF_GAME_TYPES = [6, 7, 8, 9];
const PLAY_LEVELS = {
  "0": "ML",
  "1": "AAA",
  "2": "AA",
  "3": "A+",
  "4": "A Short",
  "5": "Rookie",
  "6": "R",
};
const ORGS = {
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

module.exports = {
  REGULAR_SEASON_GAME_TYPES,
  UNOFFICIAL_GAME_TYPES,
  SPRING_TRAINING_GAME_TYPES,
  PLAYOFF_GAME_TYPES,
  PLAY_LEVELS,
  ORGS,
};