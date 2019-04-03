import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTerrComponent } from './register-terr.component';

describe('RegisterTerrComponent', () => {
  let component: RegisterTerrComponent;
  let fixture: ComponentFixture<RegisterTerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
