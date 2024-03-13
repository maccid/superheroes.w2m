import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { NotifierService } from '../services/notifier.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifierService: NotifierService = inject(NotifierService);

  return next(req).pipe(
    catchError(() => {
      const errorMessage = 'Ha ocurrido un error en la solicitud';

      notifierService.openError(errorMessage);

      return throwError(() => errorMessage);
    }),
  );
};
