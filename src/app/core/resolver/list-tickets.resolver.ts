import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { TicketParam } from '../interfaces/ticketParam.interface';
import { TicketFilter } from '../interfaces/ticketFilter.interface';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ListTicketData } from '../interfaces/list-Ticket.interface';
import { CitiesService } from '../services/cities.service';
import { AlertsService } from '../services/alerts.service';
import { ErrorMessage } from '../interfaces/errorMessage.interface';

export const listTicketsResolver: ResolveFn<ListTicketData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const ticketsSvc = inject(TicketsService);
  const citiesSvc = inject(CitiesService);
  const alertSvc = inject(AlertsService);
  const ticketparam = { ...route.queryParams } as TicketParam;

  return forkJoin({
    Cities: citiesSvc.GetCities()
      .pipe(
        catchError((error: ErrorMessage) => {
          alertSvc.ShowMessage(error);
          return of([])
        })),
    Tickets: ticketsSvc.GetTickets(ticketparam).pipe(
      catchError((error: ErrorMessage) => {
        alertSvc.ShowMessage(error);
        return of([])
      })),
  }).pipe(map(response => {
    return {
      tickets: response?.Tickets,
      param: ticketparam,
      cities: response?.Cities
    } as ListTicketData
  }));



};
