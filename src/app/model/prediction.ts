export class Prediction {
  id?: number;
  commonMatchId?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  awayTeamAlias?: string;
  homeTeamAlias?: string;
  predictedAwayScore?: number;
  predictedHomeScore?: number;
  predictedTotal?: number;
  spread?: number;
  matchString?: string;
  matchDate?: string;
  reference?: string;
  weekNumber?: number;
  weekName?: string;
}
