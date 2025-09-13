export interface MlbPrediction {
  commonMatchId: string;
  date: string;
  awayTeamAlias: string;
  homeTeamAlias: string;
  predictedAwayScore: number;
  predictedHomeScore: string;
  predictedTotal: number;
  awayPitcher: string;
  homePitcher: string;
  awayPitcherERA: number;
  homePitcherERA: number;
}
