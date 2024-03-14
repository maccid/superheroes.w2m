import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';

describe('ErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => ErrorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('Debe crear el incerceptor', () => {
    expect(interceptor).toBeTruthy();
  });
});
