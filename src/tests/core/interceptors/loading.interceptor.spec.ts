import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import { LoadingService } from 'src/app/core/services/loading.service';

describe('LoadingInterceptor', () => {
  let interceptor: HttpInterceptor;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['handleRequest']);

    TestBed.configureTestingModule({
      providers: [
        LoadingInterceptor,
        { provide: LoadingService, useValue: loadingSpy }
      ]
    });

    interceptor = TestBed.inject(LoadingInterceptor);
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should handle request', () => {
    const req = new HttpRequest('GET', '/api/data');
    const next = {
      handle: () => of({} as HttpEvent<any>)
    } as HttpHandler;

    interceptor.intercept(req, next).pipe(
      finalize(() => {
        expect(loadingServiceSpy.handleRequest).toHaveBeenCalledTimes(2); // Se espera que se llame dos veces
        expect(loadingServiceSpy.handleRequest.calls.first().args[0]).toEqual('show'); // El primer llamado debe ser con 'show'
        expect(loadingServiceSpy.handleRequest.calls.mostRecent().args[0]).toBeUndefined(); // El segundo llamado debe ser sin argumentos
      })
    ).subscribe();
  });
});
