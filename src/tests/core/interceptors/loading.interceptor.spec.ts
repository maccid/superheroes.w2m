import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';

describe('LoadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => LoadingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('Debe crear el incerceptor', () => {
    expect(interceptor).toBeTruthy();
  });

});
