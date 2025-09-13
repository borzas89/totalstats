import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import { Prediction } from '../../model/prediction';
import { Overalls } from '../../model/overalls';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-wnba-predictions',
  templateUrl: './wnba-predictions.component.html',
  styleUrls: ['./wnba-predictions.component.css']
})
export class WnbaPredictionsComponent implements OnInit {
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

    constructor(private predictionService: PredictionService) {
    this.getPredictions(this.currentDay)
    }

      onSelected(): void {
        this.selectedDay = this.days.nativeElement.value;
        this.getPredictions(this.selectedDay)
      }

    ngOnInit() {
      this.predictionService.getWnbaOveralls().subscribe((overalls) => {
              this.dataSource = new MatTableDataSource(overalls);
          });
         this.dataSource = new MatTableDataSource(this.overalls);

      }

        getPredictions(day: string) {
          this.predictionService.getFullWnbaData(day).subscribe(data => {
            this.items = data
          });
        }
}
