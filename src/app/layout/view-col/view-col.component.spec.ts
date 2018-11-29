import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColComponent } from './view-col.component';

describe('ViewColComponent', () => {
  let component: ViewColComponent;
  let fixture: ComponentFixture<ViewColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
