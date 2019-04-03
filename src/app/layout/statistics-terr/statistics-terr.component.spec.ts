import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTerrComponent } from './statistics-terr.component';

describe('StatisticsTerrComponent', () => {
  let component: StatisticsTerrComponent;
  let fixture: ComponentFixture<StatisticsTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
