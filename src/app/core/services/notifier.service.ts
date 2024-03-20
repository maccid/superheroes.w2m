import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  public openError(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
      panelClass: ['error-snackbar'],
    });
  }

  public openSuccess(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
  }
}
