// auth-interceptor.interceptor.ts
//
import { Injectable } from '@angular/core'; // Import Injectable decorator
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import { Observable } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  if (typeof window!== 'undefined') {
    // Attempt to retrieve the access token from local storage
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
      // Pass the modified request to the next handler
      return next(authReq);
    }
  }
  console.log("Send token");
  // If window is undefined or no authToken was found, pass the original request unmodified
  return next(req);
};

//
// @Injectable() // Decorate the class with @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('accessToken');
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//     console.log("DUPA1");
//     return next.handle(clonedRequest);
//   }
// }
//
// import { HttpInterceptorFn } from '@angular/common/http';

