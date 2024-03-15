import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbPredictionsComponent } from './mlb-predictions.component';

describe('MlbPredictionsComponent', () => {
  let component: MlbPredictionsComponent;
  let fixture: ComponentFixture<MlbPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlbPredictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlbPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
