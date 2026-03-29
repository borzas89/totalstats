import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../../service/prediction.service';

@Component({
  selector: 'app-mlb-results',
  templateUrl: './mlb-results.component.html',
  styleUrls: ['./mlb-results.component.css']
})
export class MlbResultsComponent implements OnInit {

  results: any[] = [];
  stats: any = null;
  loading = true;
  error = false;

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.predictionService.getMlbAllResults().subscribe({
      next: data => {
        this.results = data.sort((a: any, b: any) => b.gameDate.localeCompare(a.gameDate));
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });

    this.predictionService.getMlbStats().subscribe({
      next: data => this.stats = data,
      error: () => {}
    });
  }

  icon(correct: boolean | null): string {
    if (correct === true) return '✅';
    if (correct === false) return '❌';
    return '—';
  }
}
