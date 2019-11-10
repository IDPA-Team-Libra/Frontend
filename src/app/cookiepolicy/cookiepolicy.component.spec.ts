import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiepolicyComponent } from './cookiepolicy.component';

describe('CookiepolicyComponent', () => {
  let component: CookiepolicyComponent;
  let fixture: ComponentFixture<CookiepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
