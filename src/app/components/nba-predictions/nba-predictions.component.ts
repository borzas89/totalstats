import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, Subscription} from 'rxjs';
import {combineAll, map, switchMap} from 'rxjs/operators';
import {PredictionService} from '../../service/prediction.service';
import { Prediction } from '../../model/prediction';
import {Overalls} from '../../model/overalls';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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
export class NbaPredictionsComponent implements OnInit, OnDestroy {
  items: Array<Prediction> | undefined;
  overalls: Array<Overalls> | undefined;
  myDate = new Date();
  currentDay = '20-11-2025'; // Today's date

  // Generate date options dynamically for NBA season
  availableDates: string[] = [];

  private generateNBADates(): void {
    const startDate = new Date(2025, 9, 2); // October 2, 2025 (month is 0-indexed)
    const endDate = new Date(2026, 3, 15); // April 15, 2026

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toLocaleDateString('en-GB'); // DD/MM/YYYY format
      this.availableDates.push(dateString.replace(/\//g, '-'));
    }
  }

  selectedDay = this.currentDay;

  @ViewChild('days') days!: MatSelect;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = [
    'teamName',
    'overall',
    'teamAvg',
    'teamAwayAvg',
    'teamHomeAvg'
  ];

  columns = [
    {
      columnDef: 'teamName',
      header: 'Team',
      cell: (element: Overalls) => `${element.teamName}`,
    },
    {
      columnDef: 'overall',
      header: 'Overall',
      cell: (element: Overalls) => `${element.overall}`,
    },
    {
      columnDef: 'teamAvg',
      header: 'Avg pts',
      cell: (element: Overalls) => `${element.teamAvg}`,
    },
    {
      columnDef: 'teamAwayAvg',
      header: 'Away pts',
      cell: (element: Overalls) => `${element.teamAwayAvg}`,
    },
    {
      columnDef: 'teamHomeAvg',
      header: 'Home pts',
      cell: (element: Overalls) => `${element.teamHomeAvg}`,
    }
  ];
  dataSource: any = MatTableDataSource<Overalls>;

  ngOnInit() {
    // Generate available NBA dates
    this.generateNBADates();

    this.predictionService.getNbaOveralls().subscribe((overalls) => {
          this.dataSource = new MatTableDataSource(overalls);
      });
     this.dataSource = new MatTableDataSource(this.overalls);
    this.dataSource.filterPredicate = (data: Overalls, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String(data[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  // onSelected method removed - using quickSelectDate instead

  constructor(private predictionService: PredictionService) {
    this.getPredictions(this.currentDay)
  }

  getPredictions(day: string) {
    this.predictionService.getFullNbaData(day).subscribe(data => {
      this.items = data
    });
  }

  // Get quick access dates (2 days before today to 1 week after today)
  getQuickDates(): string[] {
    const dates: string[] = [];
    const today = new Date();

    // Start from 2 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 2);

    // End at today + 7 days
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    // Generate all dates in the range
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      dates.push(`${day}-${month}-${year}`);
    }

    return dates;
  }

  // Handle date picker change
  onDateChange(event: any): void {
    const selectedDate = new Date(event.value);
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    this.selectedDay = formattedDate;
    this.getPredictions(formattedDate);
  }

  // Quick select date
  quickSelectDate(date: string): void {
    this.selectedDay = date;
    this.getPredictions(date);
  }

  // Format date label for buttons
  formatDateLabel(date: string): string {
    const [day, month, year] = date.split('-');
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  dataSubscription: Subscription | undefined;
  currentFilterKey: string | undefined;

  ngOnDestroy(): void {
    // @ts-ignore
    this.dataSubscription.unsubscribe();
  }
}
