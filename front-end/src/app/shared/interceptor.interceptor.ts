import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
   const authToken = localStorage.getItem('token'); // Replace with actual token retrieval

  // Clone the request and add the Authorization header
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  // Pass the cloned request to the next handler
  return next(authReq);
};
