import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRateListComponent } from './staff-rate-list.component';

describe('StaffRateListComponent', () => {
  let component: StaffRateListComponent;
  let fixture: ComponentFixture<StaffRateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
