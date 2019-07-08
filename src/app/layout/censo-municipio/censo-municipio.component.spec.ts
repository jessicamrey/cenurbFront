import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensoMunicipioComponent } from './censo-municipio.component';

describe('CensoMunicipioComponent', () => {
  let component: CensoMunicipioComponent;
  let fixture: ComponentFixture<CensoMunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensoMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensoMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
