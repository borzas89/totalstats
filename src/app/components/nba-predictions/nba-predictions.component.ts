import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { combineAll, map, switchMap} from 'rxjs/operators';
import { PredictionService } from '../../service/prediction.service';
import { Prediction } from '../../model/prediction';
import { Overalls } from '../../model/overalls';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

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
export class NbaPredictionsComponent implements OnInit {
    items: Array<Prediction> | undefined;
    overalls: Array<Overalls> | undefined;
    myDate = new Date();
    currentDay = formatDate(this.myDate, 'dd-MM-yyyy', 'en-US');

   @ViewChild('days') days!: ElementRef;
   	selectedDay = this.currentDay;
   	onSelected():void {
   		this.selectedDay = this.days.nativeElement.value;
   		this.getPredictions(this.selectedDay)
   	}

    constructor(private predictionService: PredictionService){
        this.getPredictions(this.currentDay)
        this.getOveralls()
    }

    getPredictions(day: string){
            this.predictionService.getFullNbaData(day).subscribe( data => {
              this.items = data
            });
        }

    getOveralls(){
       this.predictionService.getNbaOveralls().subscribe( data => {
                             console.log(data)
                             this.overalls = data
                    });
      }
      ngOnInit() { }
}
