import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsNestsComponent } from './statistics-nests.component';

describe('StatisticsNestsComponent', () => {
  let component: StatisticsNestsComponent;
  let fixture: ComponentFixture<StatisticsNestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsNestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsNestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
