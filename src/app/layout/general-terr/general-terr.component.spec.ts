import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTerrComponent } from './general-terr.component';

describe('GeneralTerrComponent', () => {
  let component: GeneralTerrComponent;
  let fixture: ComponentFixture<GeneralTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
