import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRateListComponent } from './client-rate-list.component';

describe('ClientRateListComponent', () => {
  let component: ClientRateListComponent;
  let fixture: ComponentFixture<ClientRateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
