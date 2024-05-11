import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';


let request: number = 0;

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerSvc = inject(SpinnerService);
  if (request === 0) {
    spinnerSvc.show();
  }

  request++;

  return next(req).pipe(finalize(() => {
    request--;
    if (request === 0) {
      spinnerSvc.hide();
    }
  }
  ));
};
