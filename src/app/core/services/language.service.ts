import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _langKey = 'i18n.lang';
  private readonly _translateService = inject(TranslateService);

  getLangs(): string[] {
    return this._translateService.getLangs();
  }

  setLangs(): void {
    this._translateService.addLangs(['es', 'en']);
  }

  setLang(): void {
    const selected = localStorage.getItem(this._langKey);
    if (selected) {
      this.changeLang(selected);
    } else if (/^en-/.test(navigator.language)) {
      this.changeLang('en');
    } else {
      this.changeLang('es');
    }
  }

  changeLang(lang: string): void {
    this._translateService.use(lang);
    localStorage.setItem(this._langKey, lang);
  }
}
