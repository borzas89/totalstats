export interface MlbTeamSummary {
  id: number;
  name: string;
  abbreviation: string;
  runsPerGameSeason: number;
  runsPerGameLast3: number;
  runsPerGameHome: number;
  runsPerGameAway: number;
  bullpenEra: number;
}

export interface MlbPitcherSummary {
  id: number;
  fullName: string;
  era: number;
  fip: number | null;
  eraUsed: number;
  eraSource: string;
}

export interface MlbResultSummary {
  gamePk: number;
  gameDate: string;
  awayTeamName: string;
  homeTeamName: string;
  awayActualRuns: number | null;
  homeActualRuns: number | null;
  totalActual: number | null;
  awayRunsProjection: number;
  homeRunsProjection: number;
  totalRunsProjection: number;
  moneylinePlay: string;
  moneylineCorrect: boolean | null;
  runlinePlay: string;
  runlineCorrect: boolean | null;
  totalPlay: string | null;
  totalCorrect: boolean | null;
  sportsbookTotal: number | null;
}

export interface MlbGameDetail {
  prediction: MlbPrediction;
  result: MlbResultSummary | null;
}

export interface MlbPrediction {
  gamePk: number;
  gameDate: string;
  venueName: string;
  awayTeam: MlbTeamSummary;
  homeTeam: MlbTeamSummary;
  awayPitcher: MlbPitcherSummary | null;
  homePitcher: MlbPitcherSummary | null;
  parkFactor: number;
  awayRunsProjection: number;
  homeRunsProjection: number;
  totalRunsProjection: number;
  runDifferential: number;
  moneylinePlay: string;
  runlinePlay: string;
  totalPlay: string | null;
}
