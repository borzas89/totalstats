import { Component, Input, OnInit } from '@angular/core';
import { Prediction} from '../../model/prediction';

@Component({
  selector: 'app-prediction-card',
  templateUrl: './prediction-card.component.html',
  styleUrls: ['./prediction-card.component.css']
})
export class PredictionCardComponent  implements OnInit {

@Input("prediction") prediction: Prediction | undefined;;

constructor() { }

ngOnInit() {}
}
