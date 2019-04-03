import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCloseTerrComponent } from './view-close-terr.component';

describe('ViewCloseTerrComponent', () => {
  let component: ViewCloseTerrComponent;
  let fixture: ComponentFixture<ViewCloseTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCloseTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCloseTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
