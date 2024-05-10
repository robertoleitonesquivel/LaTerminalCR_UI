import { ResolveFn } from '@angular/router';
import { switchMap } from 'rxjs';
import { CitiesService } from '../services/cities.service';
import { inject } from '@angular/core';
import { Cities } from '../interfaces/cities.interface';

export const ticketsResolver: ResolveFn<Cities[]> = (route, state) => {
  const citiesSvc = inject(CitiesService);
  return citiesSvc.GetCities();
};
