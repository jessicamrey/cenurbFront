import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsObsvComponent } from './statistics-obsv.component';

describe('StatisticsObsvComponent', () => {
  let component: StatisticsObsvComponent;
  let fixture: ComponentFixture<StatisticsObsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsObsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsObsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
