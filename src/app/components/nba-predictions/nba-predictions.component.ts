import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import {Prediction} from '../../model/prediction';
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

const ELEMENT_DATAS: Overalls[] = [
  {
  "teamName": "Atlanta Hawks",
  "overall": 240.65,
  "awayOverall": 236.09,
  "homeOverall": 245.21,
  "teamAvg": 119.4,
  "teamHomeAvg": 122.55,
  "teamAwayAvg": 116.24
  },
  {
  "teamName": "Boston Celtics",
  "overall": 230.53,
  "awayOverall": 229.45,
  "homeOverall": 231.61,
  "teamAvg": 120.88,
  "teamHomeAvg": 123.52,
  "teamAwayAvg": 118.24
  },
  {
  "teamName": "Brooklyn Nets",
  "overall": 225.7,
  "awayOverall": 225.81,
  "homeOverall": 225.59,
  "teamAvg": 111.77,
  "teamHomeAvg": 113.85,
  "teamAwayAvg": 109.69
  },
  {
  "teamName": "Charlotte Hornets",
  "overall": 223.78,
  "awayOverall": 223.44,
  "homeOverall": 224.12,
  "teamAvg": 106.96,
  "teamHomeAvg": 107.97,
  "teamAwayAvg": 105.94
  },
  {
  "teamName": "Chicago Bulls",
  "overall": 225.68,
  "awayOverall": 228.06,
  "homeOverall": 223.3,
  "teamAvg": 111.83,
  "teamHomeAvg": 111.12,
  "teamAwayAvg": 112.53
  },
  {
  "teamName": "Cleveland Cavaliers",
  "overall": 223.06,
  "awayOverall": 220.68,
  "homeOverall": 225.43,
  "teamAvg": 113.71,
  "teamHomeAvg": 114.54,
  "teamAwayAvg": 112.87
  },
  {
  "teamName": "Dallas Mavericks",
  "overall": 236.68,
  "awayOverall": 237.25,
  "homeOverall": 236.11,
  "teamAvg": 118.95,
  "teamHomeAvg": 119.8,
  "teamAwayAvg": 118.09
  },
  {
  "teamName": "Denver Nuggets",
  "overall": 225.13,
  "awayOverall": 221.71,
  "homeOverall": 228.55,
  "teamAvg": 114.88,
  "teamHomeAvg": 118.94,
  "teamAwayAvg": 110.82
  },
  {
  "teamName": "Detroit Pistons",
  "overall": 232.52,
  "awayOverall": 235,
  "homeOverall": 230.03,
  "teamAvg": 112.14,
  "teamHomeAvg": 111.56,
  "teamAwayAvg": 112.72
  },
  {
  "teamName": "Golden State Warriors",
  "overall": 234.93,
  "awayOverall": 234.74,
  "homeOverall": 235.12,
  "teamAvg": 118.28,
  "teamHomeAvg": 117.74,
  "teamAwayAvg": 118.81
  },
  {
  "teamName": "Houston Rockets",
  "overall": 225.8,
  "awayOverall": 226.18,
  "homeOverall": 225.42,
  "teamAvg": 113.19,
  "teamHomeAvg": 115.64,
  "teamAwayAvg": 110.73
  },
  {
  "teamName": "Indiana Pacers",
  "overall": 244.56,
  "awayOverall": 242.15,
  "homeOverall": 246.97,
  "teamAvg": 123.1,
  "teamHomeAvg": 125.91,
  "teamAwayAvg": 120.3
  },
  {
  "teamName": "LA Clippers",
  "overall": 229.45,
  "awayOverall": 230.5,
  "homeOverall": 228.41,
  "teamAvg": 116.83,
  "teamHomeAvg": 116.78,
  "teamAwayAvg": 116.88
  },
  {
  "teamName": "Los Angeles Lakers",
  "overall": 234.88,
  "awayOverall": 237.72,
  "homeOverall": 232.03,
  "teamAvg": 117.09,
  "teamHomeAvg": 118.23,
  "teamAwayAvg": 115.94
  },
  {
  "teamName": "Memphis Grizzlies",
  "overall": 218.03,
  "awayOverall": 222.58,
  "homeOverall": 213.47,
  "teamAvg": 105.76,
  "teamHomeAvg": 103.06,
  "teamAwayAvg": 108.45
  },
  {
  "teamName": "Miami Heat",
  "overall": 219.85,
  "awayOverall": 214.38,
  "homeOverall": 225.31,
  "teamAvg": 110.2,
  "teamHomeAvg": 112.69,
  "teamAwayAvg": 107.71
  },
  {
  "teamName": "Milwaukee Bucks",
  "overall": 237.54,
  "awayOverall": 236.44,
  "homeOverall": 238.64,
  "teamAvg": 120.46,
  "teamHomeAvg": 122.73,
  "teamAwayAvg": 118.18
  },
  {
  "teamName": "Minnesota Timberwolves",
  "overall": 219.63,
  "awayOverall": 224.51,
  "homeOverall": 214.74,
  "teamAvg": 113.11,
  "teamHomeAvg": 111.71,
  "teamAwayAvg": 114.51
  },
  {
  "teamName": "New Orleans Pelicans",
  "overall": 227.07,
  "awayOverall": 226.85,
  "homeOverall": 227.28,
  "teamAvg": 116.01,
  "teamHomeAvg": 116.31,
  "teamAwayAvg": 115.71
  },
  {
  "teamName": "New York Knicks",
  "overall": 220.55,
  "awayOverall": 225.58,
  "homeOverall": 215.51,
  "teamAvg": 112.26,
  "teamHomeAvg": 110.49,
  "teamAwayAvg": 114.03
  },
  {
  "teamName": "Oklahoma City Thunder",
  "overall": 233.87,
  "awayOverall": 233.5,
  "homeOverall": 234.24,
  "teamAvg": 120.71,
  "teamHomeAvg": 122.82,
  "teamAwayAvg": 118.59
  },
  {
  "teamName": "Orlando Magic",
  "overall": 220.05,
  "awayOverall": 219.06,
  "homeOverall": 221.03,
  "teamAvg": 110.94,
  "teamHomeAvg": 113.77,
  "teamAwayAvg": 108.11
  },
  {
  "teamName": "Philadelphia 76ers",
  "overall": 228.02,
  "awayOverall": 226.94,
  "homeOverall": 229.09,
  "teamAvg": 115.14,
  "teamHomeAvg": 116.44,
  "teamAwayAvg": 113.84
  },
  {
  "teamName": "Phoenix Suns",
  "overall": 230.95,
  "awayOverall": 230.66,
  "homeOverall": 231.23,
  "teamAvg": 116.76,
  "teamHomeAvg": 116.86,
  "teamAwayAvg": 116.66
  },
  {
  "teamName": "Portland Trail Blazers",
  "overall": 223.41,
  "awayOverall": 223.35,
  "homeOverall": 223.46,
  "teamAvg": 107.66,
  "teamHomeAvg": 108.57,
  "teamAwayAvg": 106.74
  },
  {
  "teamName": "Sacramento Kings",
  "overall": 236,
  "awayOverall": 231.65,
  "homeOverall": 240.35,
  "teamAvg": 118.54,
  "teamHomeAvg": 121.1,
  "teamAwayAvg": 115.97
  },
  {
  "teamName": "San Antonio Spurs",
  "overall": 232.14,
  "awayOverall": 230.81,
  "homeOverall": 233.48,
  "teamAvg": 112.34,
  "teamHomeAvg": 114.03,
  "teamAwayAvg": 110.64
  },
  {
  "teamName": "Toronto Raptors",
  "overall": 231.93,
  "awayOverall": 238.94,
  "homeOverall": 224.91,
  "teamAvg": 113.88,
  "teamHomeAvg": 110.91,
  "teamAwayAvg": 116.85
  },
  {
  "teamName": "Utah Jazz",
  "overall": 238.41,
  "awayOverall": 235.88,
  "homeOverall": 240.94,
  "teamAvg": 117.66,
  "teamHomeAvg": 122.7,
  "teamAwayAvg": 112.61
  },
  {
  "teamName": "Washington Wizards",
  "overall": 238.02,
  "awayOverall": 238.83,
  "homeOverall": 237.2,
  "teamAvg": 114.18,
  "teamHomeAvg": 113.6,
  "teamAwayAvg": 114.75
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
