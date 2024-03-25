import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcbPredictionsComponent } from './acb-predictions.component';

describe('AcbPredictionsComponent', () => {
  let component: AcbPredictionsComponent;
  let fixture: ComponentFixture<AcbPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcbPredictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcbPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
