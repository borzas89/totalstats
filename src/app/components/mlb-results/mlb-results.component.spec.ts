import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbResultsComponent } from './mlb-results.component';

describe('MlbResultsComponent', () => {
  let component: MlbResultsComponent;
  let fixture: ComponentFixture<MlbResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlbResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlbResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
