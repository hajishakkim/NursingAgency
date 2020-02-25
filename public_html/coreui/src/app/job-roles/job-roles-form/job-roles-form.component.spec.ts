import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRolesFormComponent } from './job-roles-form.component';

describe('JobRolesFormComponent', () => {
  let component: JobRolesFormComponent;
  let fixture: ComponentFixture<JobRolesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRolesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
