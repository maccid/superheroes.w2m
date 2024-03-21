import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  HttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor, LoadingInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};
