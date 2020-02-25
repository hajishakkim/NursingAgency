import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysFormComponent } from './holidays-form.component';

describe('HolidaysFormComponent', () => {
  let component: HolidaysFormComponent;
  let fixture: ComponentFixture<HolidaysFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
