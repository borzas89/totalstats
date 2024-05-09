import {Component, TemplateRef, OnDestroy, OnInit} from '@angular/core';
import { ElementRef, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { combineAll, map, switchMap } from "rxjs/operators";
import { PredictionService } from "../../service/prediction.service";
import { StandingsService } from "../../service/standings.service";
import { MlbPrediction } from "../../model/mlbprediction";
import { MatTableDataSource } from "@angular/material/table";
import { Overalls } from "../../model/overalls";
import { Standings } from "../../model/standings";
import { MatPaginator } from "@angular/material/paginator";


@Component({
  selector: "app-mlb-predictions",
  templateUrl: "./mlb-predictions.component.html",
  styleUrls: ["./mlb-predictions.component.css"],
})
export class MlbPredictionsComponent implements OnInit {
  items: Array<MlbPrediction> | undefined;
  standings: Array<Standings> | undefined;

  displayedColumns: string[] = [
    "City",
    "Name",
    "Wins",
    "Losses",
    "RunsScored",
    "RunsAgainst",
  ];

  columns = [
    {
      columnDef: "City",
      header: "City",
      cell: (element: Standings) => `${element.City}`,
    },
    {
      columnDef: "Name",
      header: "Name",
      cell: (element: Standings) => `${element.Name}`,
    },
    {
      columnDef: "Wins",
      header: "Wins",
      cell: (element: Standings) => `${element.Wins}`,
    },
    {
      columnDef: "Losses",
      header: "Losses",
      cell: (element: Standings) => `${element.Losses}`,
    },
    {
      columnDef: "RunsScored",
      header: "Runs scored",
      cell: (element: Standings) => `${element.RunsScored}`,
    },
    {
      columnDef: "RunsAgainst",
      header: "Runs against",
      cell: (element: Standings) => `${element.RunsAgainst}`,
    },
  ];

  dataSource: any = MatTableDataSource<Standings>;
    ngOnInit() {
    this.standingsService.getAllMLBStandings().subscribe((overalls) => {
            this.dataSource = new MatTableDataSource(overalls);
        });
       this.dataSource = new MatTableDataSource(this.standings);
   }

  @ViewChild("days") days!: ElementRef;
  selectedDay = "2024-05-08";

  onSelected(): void {
    this.selectedDay = this.days.nativeElement.value;
    this.getPredictions(this.selectedDay);
  }

  constructor(
    private predictionService: PredictionService,
    private standingsService: StandingsService
  ) {
    this.getPredictions("2024-05-08");
    this.getAllStandings();
  }

  getPredictions(day: string) {
    this.predictionService.getFullMLBData(day).subscribe((data) => {
      console.log(data);
      this.items = data;
    });
  }

  getStandings(key: string) {
    this.standingsService.getMLBStandings(key).subscribe((data) => {
      console.log(data);
    });
  }
  getAllStandings() {
    this.standingsService.getAllMLBStandings().subscribe((data) => {
    this.standings = data;
      console.log(data);
    });
  }
}
