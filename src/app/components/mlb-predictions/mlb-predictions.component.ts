import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { combineAll, map, switchMap} from 'rxjs/operators';
import { PredictionService } from '../../service/prediction.service';
import { Prediction} from '../../model/prediction';

@Component({
  selector: 'app-mlb-predictions',
  templateUrl: './mlb-predictions.component.html',
  styleUrls: ['./mlb-predictions.component.css']
})
export class MlbPredictionsComponent {
  items: Array<Prediction> | undefined;
 @ViewChild('days') days!: ElementRef;
   	selectedDay= '24-02-2024';
   	onSelected():void {
   		this.selectedDay = this.days.nativeElement.value;
   		 this.getPredictions(this.selectedDay)
   	}
   	 constructor(private predictionService: PredictionService){
            this.getPredictions("24-02-2024")
        }

     getPredictions(day: string){
            this.predictionService.getMLBJSON(day).subscribe( data => {
                     console.log(data)
                     this.items = data
            });
        }

}
