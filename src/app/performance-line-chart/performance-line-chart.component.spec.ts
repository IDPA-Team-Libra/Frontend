import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLineChartComponent } from './performance-line-chart.component';

describe('PerformanceLineChartComponent', () => {
  let component: PerformanceLineChartComponent;
  let fixture: ComponentFixture<PerformanceLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
