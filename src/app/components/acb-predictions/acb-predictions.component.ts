import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { PredictionService } from '../../service/prediction.service';
import { AcbPrediction } from '../../model/acbprediction';

@Component({
  selector: 'app-acb-predictions',
  templateUrl: './acb-predictions.component.html',
  styleUrls: ['./acb-predictions.component.css']
})
export class AcbPredictionsComponent implements OnInit {

  items: AcbPrediction[] = [];
  selectedDay = '';

  // All available 2026 ACB round dates
  readonly availableDates: string[] = [
    '2026-02-14', '2026-02-15',
    '2026-03-07', '2026-03-08',
    '2026-03-14', '2026-03-15',
    '2026-03-21', '2026-03-22',
    '2026-03-28', '2026-03-29',
    '2026-04-04', '2026-04-05',
    '2026-04-11', '2026-04-12',
    '2026-04-18', '2026-04-19',
    '2026-04-25', '2026-04-26',
    '2026-05-02', '2026-05-03',
    '2026-05-09', '2026-05-10',
    '2026-05-16', '2026-05-17',
    '2026-05-20', '2026-05-21',
    '2026-05-23', '2026-05-24',
    '2026-05-31'
  ];

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    // Default to the closest past or today's date
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const past = this.availableDates.filter(d => d <= today);
    this.selectedDay = past.length > 0 ? past[past.length - 1] : this.availableDates[0];
    this.getPredictions(this.selectedDay);
  }

  quickSelectDate(date: string): void {
    this.selectedDay = date;
    this.getPredictions(date);
  }

  formatDateLabel(date: string): string {
    const d = new Date(date + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getPredictions(day: string): void {
    this.predictionService.getFullAcbData(day).subscribe(data => {
      this.items = data;
    });
  }
}
