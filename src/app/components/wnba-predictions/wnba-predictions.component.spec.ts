import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WnbaPredictionsComponent } from './wnba-predictions.component';

describe('WnbaPredictionsComponent', () => {
  let component: WnbaPredictionsComponent;
  let fixture: ComponentFixture<WnbaPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WnbaPredictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WnbaPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
