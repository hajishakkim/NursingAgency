import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsListComponent } from './time-sheets-list.component';

describe('TimeSheetsListComponent', () => {
  let component: TimeSheetsListComponent;
  let fixture: ComponentFixture<TimeSheetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
