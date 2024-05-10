import { ResolveFn } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { CitiesService } from '../services/cities.service';
import { inject } from '@angular/core';
import { Cities } from '../interfaces/cities.interface';
import { AlertsService } from '../services/alerts.service';

export const ticketsResolver: ResolveFn<Cities[]> = (route, state) => {
  const citiesSvc = inject(CitiesService);
  const alertSvc = inject(AlertsService);
  return citiesSvc.GetCities().pipe(
    catchError(error=>{
      alertSvc.Error(error);
      return of([]);
    })
  );
};
