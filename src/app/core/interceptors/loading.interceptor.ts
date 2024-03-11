
import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '../services/loading.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService: LoadingService = inject(LoadingService);

  loadingService.handleRequest('show');
  
  return next(req).pipe(
    finalize(() => loadingService.handleRequest())
  );
};
