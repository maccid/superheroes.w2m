import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from 'src/app/features/home/home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatExpansionModule, NoopAnimationsModule, HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener 2 secciones', () => {
    const sections = compiled.querySelectorAll('section');
    expect(sections.length).toEqual(2);
  });

  it('Debe contener 5 acordeones', () => {
    expect(
      compiled.querySelectorAll('mat-accordion mat-expansion-panel').length,
    ).toBe(5);
  });
});
