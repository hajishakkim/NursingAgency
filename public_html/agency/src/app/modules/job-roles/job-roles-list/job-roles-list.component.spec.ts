import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRolesListComponent } from './job-roles-list.component';

describe('JobRolesListComponent', () => {
  let component: JobRolesListComponent;
  let fixture: ComponentFixture<JobRolesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRolesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
