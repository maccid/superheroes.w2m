import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css',
})
export class LanguageSelectorComponent implements OnInit {
  private readonly _translateService: LanguageService = inject(LanguageService);

  languageList: string[] = [];

  ngOnInit(): void {
    this.languageList = this._translateService.getLangs();
  }

  setLanguage(lang: string): void {
    this._translateService.changeLang(lang);
  }
}
