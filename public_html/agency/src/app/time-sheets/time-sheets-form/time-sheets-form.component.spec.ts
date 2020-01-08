import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsFormComponent } from './time-sheets-form.component';

describe('TimeSheetsFormComponent', () => {
  let component: TimeSheetsFormComponent;
  let fixture: ComponentFixture<TimeSheetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
