import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import { Prediction } from '../../model/prediction';
import {Overalls} from '../../model/overalls';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ElementRef, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

interface Day {
  value: string;
  viewValue: string;
}

const ELEMENT_DATAS: Overalls[] =[
                                 {
                                 "teamName": "Atlanta Hawks",
                                 "overall": 240.36,
                                 "awayOverall": 235.5,
                                 "homeOverall": 245.21,
                                 "teamAvg": 119.13,
                                 "teamHomeAvg": 122.55,
                                 "teamAwayAvg": 115.72
                                 },
                                 {
                                 "teamName": "Boston Celtics",
                                 "overall": 230.49,
                                 "awayOverall": 229.63,
                                 "homeOverall": 231.34,
                                 "teamAvg": 121.12,
                                 "teamHomeAvg": 123.34,
                                 "teamAwayAvg": 118.89
                                 },
                                 {
                                 "teamName": "Brooklyn Nets",
                                 "overall": 225.31,
                                 "awayOverall": 225.91,
                                 "homeOverall": 224.71,
                                 "teamAvg": 111.36,
                                 "teamHomeAvg": 113.2,
                                 "teamAwayAvg": 109.51
                                 },
                                 {
                                 "teamName": "Charlotte Hornets",
                                 "overall": 223.28,
                                 "awayOverall": 222.44,
                                 "homeOverall": 224.12,
                                 "teamAvg": 106.65,
                                 "teamHomeAvg": 107.97,
                                 "teamAwayAvg": 105.33
                                 },
                                 {
                                 "teamName": "Chicago Bulls",
                                 "overall": 225.84,
                                 "awayOverall": 228.51,
                                 "homeOverall": 223.17,
                                 "teamAvg": 112.1,
                                 "teamHomeAvg": 111.54,
                                 "teamAwayAvg": 112.66
                                 },
                                 {
                                 "teamName": "Cleveland Cavaliers",
                                 "overall": 222.33,
                                 "awayOverall": 219.62,
                                 "homeOverall": 225.03,
                                 "teamAvg": 113.02,
                                 "teamHomeAvg": 114.25,
                                 "teamAwayAvg": 111.79
                                 },
                                 {
                                 "teamName": "Dallas Mavericks",
                                 "overall": 235.75,
                                 "awayOverall": 236.73,
                                 "homeOverall": 234.76,
                                 "teamAvg": 118.6,
                                 "teamHomeAvg": 119.27,
                                 "teamAwayAvg": 117.94
                                 },
                                 {
                                 "teamName": "Denver Nuggets",
                                 "overall": 224.84,
                                 "awayOverall": 221.58,
                                 "homeOverall": 228.09,
                                 "teamAvg": 114.77,
                                 "teamHomeAvg": 118.76,
                                 "teamAwayAvg": 110.78
                                 },
                                 {
                                 "teamName": "Detroit Pistons",
                                 "overall": 231.79,
                                 "awayOverall": 234.33,
                                 "homeOverall": 229.24,
                                 "teamAvg": 111.47,
                                 "teamHomeAvg": 110.78,
                                 "teamAwayAvg": 112.15
                                 },
                                 {
                                 "teamName": "Golden State Warriors",
                                 "overall": 235.33,
                                 "awayOverall": 235.19,
                                 "homeOverall": 235.46,
                                 "teamAvg": 118.51,
                                 "teamHomeAvg": 117.92,
                                 "teamAwayAvg": 119.09
                                 },
                                 {
                                 "teamName": "Houston Rockets",
                                 "overall": 226.36,
                                 "awayOverall": 226.91,
                                 "homeOverall": 225.8,
                                 "teamAvg": 113.75,
                                 "teamHomeAvg": 116,
                                 "teamAwayAvg": 111.5
                                 },
                                 {
                                 "teamName": "Indiana Pacers",
                                 "overall": 243.34,
                                 "awayOverall": 241.43,
                                 "homeOverall": 245.25,
                                 "teamAvg": 122.79,
                                 "teamHomeAvg": 125.14,
                                 "teamAwayAvg": 120.43
                                 },
                                 {
                                 "teamName": "LA Clippers",
                                 "overall": 229.07,
                                 "awayOverall": 230.5,
                                 "homeOverall": 227.64,
                                 "teamAvg": 116.57,
                                 "teamHomeAvg": 116.06,
                                 "teamAwayAvg": 117.08
                                 },
                                 {
                                 "teamName": "Los Angeles Lakers",
                                 "overall": 234.73,
                                 "awayOverall": 237.72,
                                 "homeOverall": 231.74,
                                 "teamAvg": 117.13,
                                 "teamHomeAvg": 118.32,
                                 "teamAwayAvg": 115.94
                                 },
                                 {
                                 "teamName": "Memphis Grizzlies",
                                 "overall": 218.44,
                                 "awayOverall": 222.94,
                                 "homeOverall": 213.94,
                                 "teamAvg": 105.89,
                                 "teamHomeAvg": 103.31,
                                 "teamAwayAvg": 108.47
                                 },
                                 {
                                 "teamName": "Miami Heat",
                                 "overall": 218.94,
                                 "awayOverall": 213.35,
                                 "homeOverall": 224.52,
                                 "teamAvg": 109.54,
                                 "teamHomeAvg": 111.94,
                                 "teamAwayAvg": 107.14
                                 },
                                 {
                                 "teamName": "Milwaukee Bucks",
                                 "overall": 237.82,
                                 "awayOverall": 236.57,
                                 "homeOverall": 239.06,
                                 "teamAvg": 120.6,
                                 "teamHomeAvg": 123,
                                 "teamAwayAvg": 118.2
                                 },
                                 {
                                 "teamName": "Minnesota Timberwolves",
                                 "overall": 219.36,
                                 "awayOverall": 224.19,
                                 "homeOverall": 214.52,
                                 "teamAvg": 113.05,
                                 "teamHomeAvg": 111.48,
                                 "teamAwayAvg": 114.62
                                 },
                                 {
                                 "teamName": "New Orleans Pelicans",
                                 "overall": 226.35,
                                 "awayOverall": 225.24,
                                 "homeOverall": 227.45,
                                 "teamAvg": 115.81,
                                 "teamHomeAvg": 116.61,
                                 "teamAwayAvg": 115
                                 },
                                 {
                                 "teamName": "New York Knicks",
                                 "overall": 219.9,
                                 "awayOverall": 224.29,
                                 "homeOverall": 215.51,
                                 "teamAvg": 111.89,
                                 "teamHomeAvg": 110.49,
                                 "teamAwayAvg": 113.29
                                 },
                                 {
                                 "teamName": "Oklahoma City Thunder",
                                 "overall": 233.59,
                                 "awayOverall": 233.18,
                                 "homeOverall": 234,
                                 "teamAvg": 120.71,
                                 "teamHomeAvg": 122.71,
                                 "teamAwayAvg": 118.71
                                 },
                                 {
                                 "teamName": "Orlando Magic",
                                 "overall": 219.68,
                                 "awayOverall": 219.06,
                                 "homeOverall": 220.29,
                                 "teamAvg": 110.98,
                                 "teamHomeAvg": 113.85,
                                 "teamAwayAvg": 108.11
                                 },
                                 {
                                 "teamName": "Philadelphia 76ers",
                                 "overall": 226.54,
                                 "awayOverall": 225.71,
                                 "homeOverall": 227.36,
                                 "teamAvg": 114.32,
                                 "teamHomeAvg": 115.72,
                                 "teamAwayAvg": 112.91
                                 },
                                 {
                                 "teamName": "Phoenix Suns",
                                 "overall": 231.49,
                                 "awayOverall": 231.82,
                                 "homeOverall": 231.16,
                                 "teamAvg": 117.07,
                                 "teamHomeAvg": 117.11,
                                 "teamAwayAvg": 117.03
                                 },
                                 {
                                 "teamName": "Portland Trail Blazers",
                                 "overall": 223.64,
                                 "awayOverall": 223.45,
                                 "homeOverall": 223.84,
                                 "teamAvg": 107.71,
                                 "teamHomeAvg": 108.65,
                                 "teamAwayAvg": 106.76
                                 },
                                 {
                                 "teamName": "Sacramento Kings",
                                 "overall": 234.54,
                                 "awayOverall": 230.53,
                                 "homeOverall": 238.55,
                                 "teamAvg": 117.98,
                                 "teamHomeAvg": 120.18,
                                 "teamAwayAvg": 115.78
                                 },
                                 {
                                 "teamName": "San Antonio Spurs",
                                 "overall": 231.45,
                                 "awayOverall": 230.81,
                                 "homeOverall": 232.09,
                                 "teamAvg": 112.1,
                                 "teamHomeAvg": 113.56,
                                 "teamAwayAvg": 110.64
                                 },
                                 {
                                 "teamName": "Toronto Raptors",
                                 "overall": 231.3,
                                 "awayOverall": 238.03,
                                 "homeOverall": 224.57,
                                 "teamAvg": 113.16,
                                 "teamHomeAvg": 110.06,
                                 "teamAwayAvg": 116.26
                                 },
                                 {
                                 "teamName": "Utah Jazz",
                                 "overall": 237.26,
                                 "awayOverall": 234.86,
                                 "homeOverall": 239.66,
                                 "teamAvg": 116.76,
                                 "teamHomeAvg": 121.51,
                                 "teamAwayAvg": 112
                                 },
                                 {
                                 "teamName": "Washington Wizards",
                                 "overall": 237.6,
                                 "awayOverall": 238.46,
                                 "homeOverall": 236.73,
                                 "teamAvg": 113.74,
                                 "teamHomeAvg": 113.18,
                                 "teamAwayAvg": 114.3
                                 }
                                 ];
@Component({
  selector: 'app-nba-predictions',
  templateUrl: './nba-predictions.component.html',
  styleUrls: ['./nba-predictions.component.css'],
  providers: [DatePipe]
})
export class NbaPredictionsComponent implements OnInit, OnDestroy {
  items: Array<Prediction> | undefined;
  overalls: Array<Overalls> | undefined;
  myDate = new Date();
  currentDay = formatDate(this.myDate, 'dd-MM-yyyy', 'en-US');

  @ViewChild('days') days!: ElementRef;
  selectedDay = this.currentDay;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = [
    'teamName',
    'overall',
    'teamAvg',
    'teamAwayAvg',
    'teamHomeAvg'
  ];

  columns = [
    {
      columnDef: 'teamName',
      header: 'Team',
      cell: (element: Overalls) => `${element.teamName}`,
    },
    {
      columnDef: 'overall',
      header: 'Overall',
      cell: (element: Overalls) => `${element.overall}`,
    },
    {
      columnDef: 'teamAvg',
      header: 'Avg pts',
      cell: (element: Overalls) => `${element.teamAvg}`,
    },
    {
      columnDef: 'teamAwayAvg',
      header: 'Away pts',
      cell: (element: Overalls) => `${element.teamAwayAvg}`,
    },
    {
      columnDef: 'teamHomeAvg',
      header: 'Home pts',
      cell: (element: Overalls) => `${element.teamHomeAvg}`,
    }
  ];
  dataSource: any = MatTableDataSource<Overalls>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATAS)
    this.dataSource.filterPredicate = (data: Overalls, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String(data[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  onSelected(): void {
    this.selectedDay = this.days.nativeElement.value;
    this.getPredictions(this.selectedDay)
  }

  constructor(private predictionService: PredictionService) {
    this.getPredictions(this.currentDay)
    this.getOveralls()
  }

  getPredictions(day: string) {
    this.predictionService.getFullNbaData(day).subscribe(data => {
      this.items = data
    });
  }

  getOveralls() {
    this.predictionService.getNbaOveralls().subscribe(data => {
      console.log(data)
      this.overalls = data
    });
  }

  dataSubscription: Subscription | undefined;
  currentFilterKey: string | undefined;


  ngOnDestroy(): void {
    // @ts-ignore
    this.dataSubscription.unsubscribe();
  }
}
