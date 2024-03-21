import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

import { LanguageSelectorComponent } from 'src/app/shared/components/language-selector/language-selector.component';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  let languageSpy: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), LanguageSelectorComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: jasmine.createSpyObj('LanguageService', [
            'getLangs',
            'changeLang',
          ]),
        },
      ],
    }).compileComponents();

    languageSpy = TestBed.inject(
      LanguageService,
    ) as jasmine.SpyObj<LanguageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar listado de idiomas', () => {
    const langs = ['es', 'en'];

    languageSpy.getLangs.and.returnValue(langs);
    component.ngOnInit();

    expect(component.languageList).toEqual(langs);
  });

  it('Debe cambiar de idioma', () => {
    let lang = 'en';
    component.setLanguage(lang);
    expect(languageSpy.changeLang).toHaveBeenCalledWith(lang);

    lang = 'es';
    component.setLanguage(lang);
    expect(languageSpy.changeLang).toHaveBeenCalledWith(lang);
  });
});
