import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { PredictionService } from '../../service/prediction.service';
import { MlbPrediction } from '../../model/mlbprediction';

@Component({
  selector: 'app-mlb-predictions',
  templateUrl: './mlb-predictions.component.html',
  styleUrls: ['./mlb-predictions.component.css']
})
export class MlbPredictionsComponent implements OnInit {

  items: MlbPrediction[] = [];
  loading = false;

  private today = new Date();
  selectedDay = formatDate(this.today, 'yyyy-MM-dd', 'en-US');

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.getPredictions(this.selectedDay);
  }

  getPredictions(date: string): void {
    this.loading = true;
    this.items = [];
    this.predictionService.getMlbPredictions(date).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  quickSelectDate(date: string): void {
    this.selectedDay = date;
    this.getPredictions(date);
  }

  /** 7 days back + today + 1 day ahead (tomorrow) */
  getQuickDates(): string[] {
    const dates: string[] = [];
    for (let i = -7; i <= 1; i++) {
      const d = new Date(this.today);
      d.setDate(this.today.getDate() + i);
      dates.push(formatDate(d, 'yyyy-MM-dd', 'en-US'));
    }
    return dates;
  }

  formatDateLabel(date: string): string {
    const d = new Date(date + 'T00:00:00');
    const today = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    const tomorrow = (() => {
      const t = new Date(this.today);
      t.setDate(t.getDate() + 1);
      return formatDate(t, 'yyyy-MM-dd', 'en-US');
    })();
    if (date === today) return 'Today';
    if (date === tomorrow) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
