import { HttpRequest, HttpInterceptorFn} from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  if (typeof window!== 'undefined') {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
      return next(authReq);
    }
  }
  console.log("Send token");
  return next(req);
};
