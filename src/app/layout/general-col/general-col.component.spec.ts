import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralColComponent } from './general-col.component';

describe('GeneralColComponent', () => {
  let component: GeneralColComponent;
  let fixture: ComponentFixture<GeneralColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
