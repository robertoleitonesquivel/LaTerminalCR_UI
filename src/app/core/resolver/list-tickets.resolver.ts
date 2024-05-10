import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { TicketParam } from '../interfaces/ticketParam.interface';
import { TicketFilter } from '../interfaces/ticketFilter.interface';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ListTicketData } from '../interfaces/list-Ticket.interface';
import { CitiesService } from '../services/cities.service';
import { AlertsService } from '../services/alerts.service';

export const listTicketsResolver: ResolveFn<ListTicketData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const ticketsSvc = inject(TicketsService);
  const citiesSvc = inject(CitiesService);
  const alertSvc = inject(AlertsService);
  const ticketparam = { ...route.queryParams } as TicketParam;

  return forkJoin({
    Cities: citiesSvc.GetCities(),
    Tickets: ticketsSvc.GetTickets(ticketparam)
  }).pipe(map(response => {
    return {
      tickets: response.Tickets,
      param: ticketparam,
      cities: response.Cities
    } as ListTicketData
  }),
    catchError(error => {
      alertSvc.Error(error);
      return of({
        tickets: [],
        param: ticketparam,
        cities: []
      } as ListTicketData);
    }));



};
