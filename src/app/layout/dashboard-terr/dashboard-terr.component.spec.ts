import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTerrComponent } from './dashboard-terr.component';

describe('DashboardTerrComponent', () => {
  let component: DashboardTerrComponent;
  let fixture: ComponentFixture<DashboardTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
