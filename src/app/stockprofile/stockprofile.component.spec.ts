import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockprofileComponent } from './stockprofile.component';

describe('StockprofileComponent', () => {
  let component: StockprofileComponent;
  let fixture: ComponentFixture<StockprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
