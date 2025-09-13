import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { combineAll, map, switchMap } from "rxjs/operators";
import { PredictionService } from "../../service/prediction.service";
import { StandingsService } from "../../service/standings.service";
import { MlbPrediction } from "../../model/mlbprediction";
import { MlbResult } from "../../model/mlbresult";
import { Standings } from "../../model/standings";
@Component({
  selector: "app-mlb-details",
  templateUrl: "./mlb-details.component.html",
  styleUrls: ["./mlb-details.component.css"],
})
export class MlbDetailsComponent implements OnInit {
  commonMatchId: string;
  prediction: MlbPrediction;
  awayStandings: Standings;
  homeStandings: Standings;
  awayTeam: string = "";
  homeTeam: string = "";
  playedGamesAway = 0;
  playedGamesHome = 0;
  awayPitcher: string = "";
  homePitcher: string = "";
  awayResults: Array<MlbResult> | undefined;
  homeResults: Array<MlbResult> | undefined;

  //Date	Away team	Home team	Away pitcher	Home pitcherAway score result	Home score result

  constructor(
    private route: ActivatedRoute,
    private predictionService: PredictionService,
    private standingsService: StandingsService
  ) {
    this.commonMatchId = this.route.snapshot.params["id"];
    console.log(this.commonMatchId);
    this.getPredictions(this.commonMatchId);
  }
  getPredictions(commonMatchId: string) {
    this.predictionService
      .getMLBPredictionById(commonMatchId)
      .subscribe((data) => {
        console.log(data);
        this.prediction = data[0];
        this.awayTeam = data[0].awayTeamAlias;
        this.homeTeam = data[0].homeTeamAlias;
        this.awayPitcher = data[0].awayPitcher;
        this.homePitcher = data[0].homePitcher;
        this.getAwayStandings(this.awayTeam);
        this.getHomeStandings(this.homeTeam);
       // this.getResultsByPitcher(this.awayPitcher);
      //  this.getResultsByPitcher(this.homePitcher);
      });
  }
  getHomeStandings(key: string) {
    this.standingsService.getMLBStandings(key).subscribe((data) => {
      console.log(data);
      this.homeStandings = data[0];
      this.playedGamesHome = data[0].Wins + data[0].Losses;
    });
  }
  getAwayStandings(key: string) {
    this.standingsService.getMLBStandings(key).subscribe((data) => {
      console.log(data);
      this.awayStandings = data[0];
      this.playedGamesAway = data[0].Wins + data[0].Losses;
    });
  }
  getResultsByPitcher(name: string) {
    this.predictionService.getMLBResultsByPitcher(name).subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit() {}
}
