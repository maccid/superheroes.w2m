import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _translate: TranslateService = inject(TranslateService);

  public openError(message: string): void {
    this._snackBar.open(message, this._translate.instant('notify.close'), {
      duration: 2000,
      panelClass: ['error-snackbar'],
    });
  }

  public openSuccess(message: string): void {
    this._snackBar.open(message, this._translate.instant('notify.close'), {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
  }
}
