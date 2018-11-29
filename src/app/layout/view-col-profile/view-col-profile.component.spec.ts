import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColProfileComponent } from './view-col-profile.component';

describe('ViewColProfileComponent', () => {
  let component: ViewColProfileComponent;
  let fixture: ComponentFixture<ViewColProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewColProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewColProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
