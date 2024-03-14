import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  let homeButton: any;
  let heroesButton: any;

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
    fixture.detectChanges();
  });

  beforeEach(() => {
    homeButton = fixture.debugElement.query(By.css('[routerLink="/home"]'));
    heroesButton = fixture.debugElement.query(By.css('[routerLink="/heroes"]'));
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

});
