import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('LoadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => LoadingInterceptor(req, next));

  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient(withInterceptors([LoadingInterceptor]))],
    });

    httpMock = TestBed.inject(HttpTestingController);

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el incerceptor', () => {
    expect(interceptor).toBeTruthy();
  });
});
