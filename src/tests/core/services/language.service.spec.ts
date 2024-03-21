import { TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from 'src/app/core/services/language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: jasmine.createSpyObj('TranslateService', [
            'addLangs',
            'use',
          ]),
        },
      ],
    });

    service = TestBed.inject(LanguageService);

    translateServiceSpy = TestBed.inject(
      TranslateService,
    ) as jasmine.SpyObj<TranslateService>;
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe configurar idiomas', () => {
    service.setLangs();

    expect(translateServiceSpy.addLangs).toHaveBeenCalledWith(['es', 'en']);
  });

  it('Debe coger idioma del localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('en');

    service.setLang();

    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });

  it('Debe coger idioma del navegador si no esta en localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOnProperty(navigator, 'language').and.returnValue('es-ES');

    service.setLang();

    expect(translateServiceSpy.use).toHaveBeenCalledWith('es');
  });

  it('Debe cambiar idioma', () => {
    service.changeLang('en');

    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    expect(localStorage.getItem('i18n.lang')).toBe('en');
  });
});
