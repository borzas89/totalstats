import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaPredictionsComponent } from './nba-predictions.component';

describe('NbaPredictionsComponent', () => {
  let component: NbaPredictionsComponent;
  let fixture: ComponentFixture<NbaPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbaPredictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
