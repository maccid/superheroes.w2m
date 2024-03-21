import { DebugElement } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';

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
    const feature = 'heroes';

    component.feature = feature;
    fixture.detectChanges();

    expect(button.nativeElement.getAttribute('ng-reflect-router-link')).toBe(
      '/' + feature + '/add',
    );
  });

  it('Debe tener texto de información correcto', () => {
    const feature = 'heroes';
    const tooltipText = 'features.heroes.add';

    component.feature = feature;

    fixture.detectChanges();

    expect(button.nativeElement.getAttribute('ng-reflect-message')).toBe(
      tooltipText,
    );
  });
});
