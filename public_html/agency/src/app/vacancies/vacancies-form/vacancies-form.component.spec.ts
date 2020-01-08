import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesFormComponent } from './vacancies-form.component';

describe('VacanciesFormComponent', () => {
  let component: VacanciesFormComponent;
  let fixture: ComponentFixture<VacanciesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanciesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
