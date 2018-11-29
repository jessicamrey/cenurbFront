import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCloseColComponent } from './view-close-col.component';

describe('ViewCloseColComponent', () => {
  let component: ViewCloseColComponent;
  let fixture: ComponentFixture<ViewCloseColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCloseColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCloseColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
