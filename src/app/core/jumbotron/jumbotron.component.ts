import { Component } from '@angular/core';
import {PredictionService} from '../../service/prediction.service';
import {Prediction} from '../../model/prediction';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent {
  items: Array<Prediction> | undefined;
  constructor(private predictionService: PredictionService) {
    this.getPredictions("18-03-2024")
  }

    getPredictions(day: string) {
      this.predictionService.getFullNbaData(day).subscribe(data => {
        this.items = data
      });
    }

}
