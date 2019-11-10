import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofserviceComponent } from './termsofservice.component';

describe('TermsofserviceComponent', () => {
  let component: TermsofserviceComponent;
  let fixture: ComponentFixture<TermsofserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsofserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
