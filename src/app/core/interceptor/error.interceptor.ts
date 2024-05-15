import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { handleErrorResponse } from '../../shared/common.function';

export const errorInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe(catchError(handleErrorResponse));



