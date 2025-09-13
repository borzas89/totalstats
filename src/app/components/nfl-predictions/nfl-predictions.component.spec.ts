import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflPredictionsComponent } from './nfl-predictions.component';

describe('NflPredictionsComponent', () => {
  let component: NflPredictionsComponent;
  let fixture: ComponentFixture<NflPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflPredictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NflPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
