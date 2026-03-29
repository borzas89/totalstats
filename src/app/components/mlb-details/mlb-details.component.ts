import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PredictionService } from '../../service/prediction.service';
import { MlbPrediction, MlbResultSummary } from '../../model/mlbprediction';

@Component({
  selector: 'app-mlb-details',
  templateUrl: './mlb-details.component.html',
  styleUrls: ['./mlb-details.component.css']
})
export class MlbDetailsComponent implements OnInit {

  prediction: MlbPrediction | null = null;
  result: MlbResultSummary | null = null;
  loading = true;
  error = false;
  date = '';

  constructor(
    private route: ActivatedRoute,
    private predictionService: PredictionService
  ) {}

  ngOnInit(): void {
    this.date = this.route.snapshot.params['date'];
    const gamePk = Number(this.route.snapshot.params['gamePk']);

    forkJoin({
      predictions: this.predictionService.getMlbPredictions(this.date),
      results: this.predictionService.getMlbResultFetch(this.date).pipe(
        catchError(() => of([] as MlbResultSummary[]))
      )
    }).subscribe({
      next: ({ predictions, results }) => {
        this.prediction = predictions.find(p => p.gamePk === gamePk) ?? null;
        this.result = results.find(r => r.gamePk === gamePk) ?? null;
        if (!this.prediction) this.error = true;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  resultIcon(correct: boolean | null | undefined): string {
    if (correct === true) return '✅';
    if (correct === false) return '❌';
    return '—';
  }
}
