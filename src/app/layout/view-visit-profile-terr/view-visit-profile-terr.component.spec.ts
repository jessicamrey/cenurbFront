import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitProfileTerrComponent } from './view-visit-profile-terr.component';

describe('ViewVisitProfileTerrComponent', () => {
  let component: ViewVisitProfileTerrComponent;
  let fixture: ComponentFixture<ViewVisitProfileTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVisitProfileTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitProfileTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
