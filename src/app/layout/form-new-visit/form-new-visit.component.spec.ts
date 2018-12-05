import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewVisitComponent } from './form-new-visit.component';

describe('FormNewVisitComponent', () => {
  let component: FormNewVisitComponent;
  let fixture: ComponentFixture<FormNewVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
