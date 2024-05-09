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
  this.predictionService.getNbaOveralls().subscribe((overalls) => {
          this.dataSource = new MatTableDataSource(overalls);
      });
     this.dataSource = new MatTableDataSource(this.overalls);
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
  }

  getPredictions(day: string) {
    this.predictionService.getFullNbaData(day).subscribe(data => {
      this.items = data
    });
  }

  dataSubscription: Subscription | undefined;
  currentFilterKey: string | undefined;

  ngOnDestroy(): void {
    // @ts-ignore
    this.dataSubscription.unsubscribe();
  }
}
