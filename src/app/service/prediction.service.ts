import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let API_NBA_URL = "https://totalnba.herokuapp.com/api/prediction/day/"

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) {

   }

   headers = new HttpHeaders({
           'Content-Type':'application/json; charset=utf-8'
         });

  public findNBAPredictionsByDay(dayString: string): Observable<any> {
      return this.http.get(API_NBA_URL + dayString + "/",
       { headers: { "Content-Type":"application/json; charset=UTF-8" }});
    }

      public findNBAJSON(dayString: String): Observable<any> {
             return this.http.get("./assets/json/nba-prediction_"+ dayString + ".json");
        }

 public getMLBJSON(dayString: String): Observable<any> {
        return this.http.get("./assets/json/mlb-prediction_"+ dayString + ".json");
    }

}
