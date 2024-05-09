import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, pipe } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Prediction } from "../model/prediction";
import { AcbPrediction } from "../model/acbprediction";
import { MlbPrediction } from "../model/mlbprediction";
import { MlbResult } from "../model/mlbresult";
import { Overalls } from "../model/overalls";

let API_NBA_URL = "https://totalnba.herokuapp.com/api/prediction/day/";

@Injectable({
  providedIn: "root",
})
export class PredictionService {
  constructor(private http: HttpClient) {}

  watcher$: BehaviorSubject<Overalls[]> = new BehaviorSubject(Overalls[30]);

  refresh(): void {
    this.getNbaOveralls()
      .toPromise()
      .then(
        (overalls) => this.watcher$.next(overalls as Overalls[]),
        (err) => console.error(err)
      );
  }

  headers = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  });

  public findNBAPredictionsByDay(dayString: string): Observable<any> {
    return this.http.get(API_NBA_URL + dayString + "/", {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  }

  public findNBAJSON(dayString: String): Observable<any> {
    return this.http.get("./assets/json/nba-prediction_" + dayString + ".json");
  }

  public getMLBJSON(dayString: String): Observable<any> {
    return this.http.get("./assets/json/mlb-prediction_" + dayString + ".json");
  }

  public getMLBDaily(dayString: String): Observable<any> {
    return this.http.get("./assets/json/mlb-prediction_" + dayString + ".json");
  }

  public getFullNbaData(dayString: String): Observable<any> {
    return this.http
      .get<Prediction[]>("./assets/json/nba-predictions_2023.json")
      .pipe(
        map((data) =>
          data.filter((prediction) => prediction.matchString === dayString)
        )
      );
  }

  public getFullMLBData(dayString: String): Observable<any> {
    return this.http
      .get<MlbPrediction[]>("./assets/json/mlb-predictions_2024.json")
      .pipe(
        map((data) =>
          data.filter((prediction) => prediction.date === dayString)
        )
      );
  }

  public getNbaOveralls(): Observable<any> {
    return this.http.get("./assets/json/nba-overalls.json");
  }

  public getFullAcbData(dayString: String): Observable<any> {
    return this.http
      .get<AcbPrediction[]>("./assets/json/acb-predictions_2024.json")
      .pipe(
        map((data) =>
          data.filter((prediction) => prediction.matchString === dayString)
        )
      );
  }

  public getMLBResults(): Observable<any> {
    return this.http.get("./assets/json/mlb-model-results-2024.json");
  }
}
