const { formatDate, getGameMatchup } = require("./utils.js");

export const defaultTableHeaders = (theme) => {
  const themes = {
    proHitterStandard: ["Date", "Game"],
    proPitcherStandard: ["Date", "Game"]
  }
  return themes[theme];
}

export const defaultTableRows = (theme, game) => {
  const themes = {
    proHitterStandard: [formatDate(game.startsAt), getGameMatchup(game)],
    proPitcherStandard: [formatDate(game.startsAt), getGameMatchup(game)]
  }
  return themes[theme];
}

export const tableThemes = (theme) => {
  const statTypeThemes = {
    proHitterStandard: [
      { "PA": "total_plate_appearances" },
      { "AB": "at_bats" },
      { "R": "runs" },
      { "H": "hits" },
      { "2B": "doubles" },
      { "3B": "triples" },
      { "HR": "homeruns" },
      { "RBI": "runs_batted_in" },
      { "BB": "base_on_balls" },
      { "K": "strikeouts" },
      { "SF": "sac_flies" },
      { "SB": "stolen_bases" },
      { "CS": "caught_stealing" },
    ],

    proPitcherStandard: [
      {"Dec": "decision"},
      {"IP": "innings_pitched"},
      {"Pitches": "pitch_count"},
      {"H": "hits_allowed"},
      {"R": "runs_allowed"},
      {"ER": "earned_runs"},
      {"HR": "home_runs_allowed"},
      {"BB": "walks_issued"},
      {"K": "strikeouts"},
      {"TBF": "total_batters_faced"},
      {"FPK": "first_pitch_strikes"},
    ],
  };

  return statTypeThemes[theme];
};
