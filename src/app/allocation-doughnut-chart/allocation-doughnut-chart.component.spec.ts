import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDoughnutChartComponent } from './cash-doughnut-chart.component';

describe('CashDoughnutChartComponent', () => {
  let component: CashDoughnutChartComponent;
  let fixture: ComponentFixture<CashDoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDoughnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
