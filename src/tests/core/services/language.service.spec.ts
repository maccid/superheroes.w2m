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
            'getLangs',
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

  //ToDo: Pruebas
  
});
