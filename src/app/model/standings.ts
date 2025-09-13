export interface  Standings {
  TeamId: number | undefined;
  Key: string | undefined;
  City: string | undefined;
  Name: string | undefined;
  Wins: number | undefined;
  Losses: number | undefined;
  AwayWins: number;
  AwayLosses: number;
  HomeWins: number;
  HomeLosses: number;
  RunsScored: number;
  RunsAgainst: number;
}

