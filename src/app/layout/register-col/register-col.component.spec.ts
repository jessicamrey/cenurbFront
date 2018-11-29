import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterColComponent } from './register-col.component';

describe('RegisterColComponent', () => {
  let component: RegisterColComponent;
  let fixture: ComponentFixture<RegisterColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
