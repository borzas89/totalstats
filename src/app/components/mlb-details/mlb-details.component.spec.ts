import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbDetailsComponent } from './mlb-details.component';

describe('MlbDetailsComponent', () => {
  let component: MlbDetailsComponent;
  let fixture: ComponentFixture<MlbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlbDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
