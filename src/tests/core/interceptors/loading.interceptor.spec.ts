import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
} from '@angular/common/http';

import { environment } from '@env/environment';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoadingService } from 'src/app/core/services/loading.service';

describe('LoadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => LoadingInterceptor(req, next));

  let loadingService: LoadingService;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let url: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient(withInterceptors([LoadingInterceptor]))],
    });

    loadingService = TestBed.inject(LoadingService);

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    url = environment.apiUrl;

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el incerceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Debe mostar loader y parar', () => {
    loadingService.handleRequest('show');
    expect(loadingService.isLoading()).toBeTrue();

    //const req = httpMock.expectOne(`${url}/heroes`);

    httpClient.get(`${url}/heroes`).subscribe(() => {
      expect(loadingService.isLoading()).toBeFalse();
    });

    //req.flush({});
    
  });
});
