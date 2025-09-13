import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import {NflPrediction} from '../../model/nflprediction';
import {Overalls} from '../../model/overalls';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ElementRef, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

interface Week {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nfl-predictions',
  templateUrl: './nfl-predictions.component.html',
  styleUrls: ['./nfl-predictions.component.css']
})
export class NflPredictionsComponent {
 items: Array<NflPrediction> | undefined;
  currentWeek = "2";

  @ViewChild('days') days!: ElementRef;
  selectedDay = "2";

  onSelected(): void {
    this.selectedDay = this.days.nativeElement.value;
     this.getFullPredictions(this.selectedDay)
  }

  constructor(private predictionService: PredictionService) {
    this.getFullPredictions(this.selectedDay)
  }

    getFullPredictions(week: String) {
      this.predictionService.getNflPredictionByWeek(week).subscribe(data => {
       console.log(data);
        this.items = data
      });
    }

}
