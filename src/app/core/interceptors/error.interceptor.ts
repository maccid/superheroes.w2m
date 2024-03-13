import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { SnackbarService } from '../services/snackbar.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService: SnackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError(() => {
      const errorMessage = 'Ha ocurrido un error en la solicitud';

      snackbarService.openError(errorMessage);

      return throwError(() => errorMessage);
    }),
  );
};
