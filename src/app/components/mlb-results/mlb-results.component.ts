import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable, Subscription } from "rxjs";
import { combineAll, map, switchMap } from "rxjs/operators";
import { PredictionService } from "../../service/prediction.service";
import { Prediction } from "../../model/prediction";
import { MlbResult } from "../../model/mlbresult";
import { Overalls } from "../../model/overalls";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ElementRef, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { formatDate } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

interface Day {
  value: string;
  viewValue: string;
}

const ELEMENT_DATAS: MlbResult[] = [
  {
    commonMatchId: "e6191d49-c226-4d6d-ad5d-fef774b0a27b",
    date: "2024-03-29",
    awayTeam: "New York Yankees",
    homeTeam: "Houston Astros",
    predictedAwayScore: 5.27,
    predictedHomeScore: 4.72,
    predictedTotal: 9.99,
    awayPitcher: "Carlos Rodón",
    homePitcher: "Cristian Javier",
    moneyLinePlay: "New York Yankees",
    awayPitcherERA: 4.56,
    homePitcherERA: 6.86,
    awayBullpenERA: 3.34,
    homeBullpenERA: 3.56,
    awayScoreResult: 7,
    homeScoreResult: 1,
    moneyLineResult: "New York Yankees",
    predictionMLWin: 1,
    totalResult: 8,
  },
  {
    commonMatchId: "cf3ba4a2-a759-421f-82fe-d81727356482",
    date: "2024-03-29",
    awayTeam: "Colorado Rockies",
    homeTeam: "Arizona Diamondbacks",
    predictedAwayScore: 3.9,
    predictedHomeScore: 5.1,
    predictedTotal: 9,
    awayPitcher: "Cal Quantrill",
    homePitcher: "Merrill Kelly",
    moneyLinePlay: "Colorado Rockies",
    awayPitcherERA: 3.29,
    homePitcherERA: 5.24,
    awayBullpenERA: 5.41,
    homeBullpenERA: 4.22,
    awayScoreResult: 3,
    homeScoreResult: 7,
    moneyLineResult: "Arizona Diamondbacks",
    predictionMLWin: 0,
    totalResult: 10,
  },
];
@Component({
  selector: "app-mlb-results",
  templateUrl: "./mlb-results.component.html",
  styleUrls: ["./mlb-results.component.css"],
  providers: [DatePipe],
})
export class MlbResultsComponent implements OnInit, OnDestroy {
  overalls: Array<Overalls> | undefined;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = [
    "date",
    "awayTeam",
    "homeTeam",
    "predictedAwayScore",
    "predictedHomeScore",
    "awayPitcher",
    "homePitcher",
    "awayPitcherERA",
    "homePitcherERA",
    "awayScoreResult",
    "homeScoreResult",
    "predictionMLWin",
  ];

  columns = [
    {
      columnDef: "date",
      header: "Date",
      cell: (element: MlbResult) => `${element.date}`,
    },
    {
      columnDef: "awayTeam",
      header: "Away team",
      cell: (element: MlbResult) => `${element.awayTeam}`,
    },
    {
      columnDef: "homeTeam",
      header: "Home team",
      cell: (element: MlbResult) => `${element.homeTeam}`,
    },
    {
      columnDef: "predictedAwayScore",
      header: "Proj A score",
      cell: (element: MlbResult) => `${element.predictedAwayScore}`,
    },
    {
      columnDef: "predictedHomeScore",
      header: "Proj H score",
      cell: (element: MlbResult) => `${element.predictedHomeScore}`,
    },
    {
      columnDef: "awayPitcher",
      header: "Away pitcher",
      cell: (element: MlbResult) => `${element.awayPitcher}`,
    },
    {
      columnDef: "homePitcher",
      header: "Home pitcher",
      cell: (element: MlbResult) => `${element.homePitcher}`,
    },
    {
      columnDef: "awayPitcherERA",
      header: "Away pitcher ERA",
      cell: (element: MlbResult) => `${element.awayPitcherERA}`,
    },
    {
      columnDef: "homePitcherERA",
      header: "Home pitcher ERA",
      cell: (element: MlbResult) => `${element.homePitcherERA}`,
    },
    {
      columnDef: "awayScoreResult",
      header: "Away score result",
      cell: (element: MlbResult) => `${element.awayScoreResult}`,
    },
    {
      columnDef: "homeScoreResult",
      header: "Home score result",
      cell: (element: MlbResult) => `${element.homeScoreResult}`,
    },
    {
      columnDef: "predictionMLWin",
      header: "Prediction win?",
      cell: (element: MlbResult) => `${element.predictionMLWin}`,
    },
  ];
  dataSource: any = MatTableDataSource<MlbResult>;

  ngOnInit() {
    this.predictionService.getMLBResults().subscribe((overalls) => {
      this.dataSource = new MatTableDataSource(overalls);
    });
    // this.dataSource = new MatTableDataSource(ELEMENT_DATAS);
    this.dataSource.filterPredicate = (data: Overalls, filter: string) => {
      const key = this.currentFilterKey || "";
      const source = key ? String(data[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  constructor(private predictionService: PredictionService) {}

  dataSubscription: Subscription | undefined;
  currentFilterKey: string | undefined;

  ngOnDestroy(): void {
    // @ts-ignore
    this.dataSubscription.unsubscribe();
  }
}
