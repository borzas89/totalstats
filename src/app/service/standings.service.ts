import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, pipe } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Standings } from "../model/standings";

let MLB_STANDINGS_API =
  "https://api.sportsdata.io/v3/mlb/scores/json/Standings/2025?key=09f78406ac834397bf234a049becb830";
@Injectable({
  providedIn: "root",
})
export class StandingsService {
  constructor(private http: HttpClient) {}

  public getMLBStandings(teamKeyString: String): Observable<any> {
    return this.http
      .get<Standings[]>(MLB_STANDINGS_API)
      .pipe(
        map((data) =>
          data.filter((standings) => standings.Key === teamKeyString)
        )
      );
  }

  public getStaticStandings(): Observable<any> {
      return this.http.get("./assets/json/mlb-standings.json");
  }

  public getAllMLBStandings(): Observable<any> {
    return this.http
      .get<Standings[]>(MLB_STANDINGS_API)
      .pipe(map((data) => data));
  }
}
