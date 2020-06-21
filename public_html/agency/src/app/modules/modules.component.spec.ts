import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModulesComponent } from './modules.component';

describe('ModulesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ModulesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ModulesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'agency'`, () => {
    const fixture = TestBed.createComponent(ModulesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('agency');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ModulesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('agency app is running!');
  });
});
