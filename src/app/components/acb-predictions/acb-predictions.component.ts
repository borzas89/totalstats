import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import {AcbPrediction} from '../../model/acbprediction';
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
  selector: 'app-acb-predictions',
  templateUrl: './acb-predictions.component.html',
  styleUrls: ['./acb-predictions.component.css']
})
export class AcbPredictionsComponent {
  items: Array<AcbPrediction> | undefined;
  currentDay = "Sun Mar 3 2024";

  @ViewChild('days') days!: ElementRef;
  selectedDay = "Sun Mar 3 2024";

  onSelected(): void {
    this.selectedDay = this.days.nativeElement.value;
    this.getPredictions(this.selectedDay)
  }

  constructor(private predictionService: PredictionService) {
    this.getPredictions(this.currentDay)
  }

  getPredictions(day: string) {
    this.predictionService.getFullAcbData(day).subscribe(data => {
      this.items = data
    });
  }
}
