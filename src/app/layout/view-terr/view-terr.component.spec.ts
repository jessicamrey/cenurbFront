import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTerrComponent } from './view-terr.component';

describe('ViewTerrComponent', () => {
  let component: ViewTerrComponent;
  let fixture: ComponentFixture<ViewTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
