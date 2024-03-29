import {Component, TemplateRef} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import {MlbPrediction} from '../../model/mlbprediction';
import {MatTableDataSource} from "@angular/material/table";
import {Overalls} from "../../model/overalls";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-mlb-predictions',
  templateUrl: './mlb-predictions.component.html',
  styleUrls: ['./mlb-predictions.component.css']
})
export class MlbPredictionsComponent {
  items: Array<MlbPrediction> | undefined;
  @ViewChild('days') days!: ElementRef;
  selectedDay = '2024-03-25';

  onSelected(): void {
    this.selectedDay = this.days.nativeElement.value;
    this.getPredictions(this.selectedDay)
  }

  constructor(private predictionService: PredictionService) {
    this.getPredictions("2024-03-25")
  }

  getPredictions(day: string) {
    this.predictionService.getFullMLBData(day).subscribe(data => {
      console.log(data)
      this.items = data
    });
  }
}
