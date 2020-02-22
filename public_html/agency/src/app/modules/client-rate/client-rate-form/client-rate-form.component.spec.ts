import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRateFormComponent } from './client-rate-form.component';

describe('ClientRateFormComponent', () => {
  let component: ClientRateFormComponent;
  let fixture: ComponentFixture<ClientRateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
