import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitProfileComponent } from './view-visit-profile.component';

describe('ViewVisitProfileComponent', () => {
  let component: ViewVisitProfileComponent;
  let fixture: ComponentFixture<ViewVisitProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVisitProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
