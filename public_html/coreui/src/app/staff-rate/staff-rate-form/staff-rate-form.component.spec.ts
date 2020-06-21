import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRateFormComponent } from './staff-rate-form.component';

describe('StaffRateFormComponent', () => {
  let component: StaffRateFormComponent;
  let fixture: ComponentFixture<StaffRateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
