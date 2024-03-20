import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AddButtonComponent } from 'src/app/shared/components/add-button/add-button.component';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;

  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        AddButtonComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;

    button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener enlace correcto', () => {
    const routerLink = '/heroes/add';

    component.routerLink = routerLink;
    fixture.detectChanges();

    expect(button.nativeElement.getAttribute('ng-reflect-router-link')).toBe(
      routerLink,
    );
  });

  it('Debe tener texto de información correcto', () => {
    const tooltipText = 'Añadir heroe';

    component.tooltipText = tooltipText;
    fixture.detectChanges();

    expect(button.nativeElement.getAttribute('ng-reflect-message')).toBe(
      tooltipText,
    );
  });
});
