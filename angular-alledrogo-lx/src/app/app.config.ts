import {HTTP_INTERCEPTORS, withFetch, withInterceptors} from '@angular/common/http'; // Add this line
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// import { AuthInterceptor } from './auth-interceptor.interceptor';
import { authInterceptor } from './auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
