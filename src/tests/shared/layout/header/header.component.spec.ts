import { DebugElement } from '@angular/core';

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { IndexComponent } from 'src/app/features/heroes/pages/index/index.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let compiled: HTMLElement;

  let homeButton: DebugElement;
  let heroesButton: DebugElement;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'heroes', component: IndexComponent },
        ]),
        HeaderComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  beforeEach(() => {
    homeButton = fixture.debugElement.query(By.css('[routerLink="/home"]'));
    heroesButton = fixture.debugElement.query(By.css('[routerLink="/heroes"]'));
  });

  it('Debe crear el componente', () => {
    expect(component).not.toBeNull();
  });

  it('Debe contener MatToolbar', () => {
    const breadcrumbComponent = compiled.querySelector('mat-toolbar');
    expect(breadcrumbComponent).toBeTruthy();
  });

  it('Debe tener un link a "/home"', () => {
    expect(homeButton).toBeTruthy();
  });

  it('Debe tener un link a "/heroes"', () => {
    expect(heroesButton).toBeTruthy();
  });

  it('Debe haber solo un botón con la clase activo', fakeAsync(() => {
    expect(homeButton.nativeElement.classList.contains('active')).toBeFalsy();
    expect(heroesButton.nativeElement.classList.contains('active')).toBeFalsy();

    router.navigate(['home']);
    tick();

    expect(homeButton.nativeElement.classList.contains('active')).toBeTruthy();
    expect(heroesButton.nativeElement.classList.contains('active')).toBeFalsy();

    router.navigate(['heroes']);
    tick();
    expect(homeButton.nativeElement.classList.contains('active')).toBeFalsy();
    expect(heroesButton.nativeElement.classList.contains('active'))
      .withContext('Boton enlace heroe activo')
      .toBeTruthy();
  }));
});
