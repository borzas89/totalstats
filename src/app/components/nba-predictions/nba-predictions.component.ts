import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { combineAll, map, switchMap} from 'rxjs/operators';
import { PredictionService } from '../../service/prediction.service';
import { Prediction} from '../../model/prediction';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nba-predictions',
  templateUrl: './nba-predictions.component.html',
  styleUrls: ['./nba-predictions.component.css']
})
export class NbaPredictionsComponent {
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
            this.predictionService.findNBAJSON(day).subscribe( data => {
                     console.log(data)
                     this.items = data
            });
        }
}
