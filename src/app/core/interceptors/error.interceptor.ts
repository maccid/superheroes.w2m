import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { NotifierService } from '../services/notifier.service';
import { TranslateService } from '@ngx-translate/core';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifierService: NotifierService = inject(NotifierService);
  const translate: TranslateService = inject(TranslateService);

  return next(req).pipe(
    catchError(() => {
      const errorMessage = translate.instant('notify.error');

      notifierService.openError(errorMessage);

      return throwError(() => errorMessage);
    }),
  );
};
