import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { TicketParam } from '../interfaces/ticketParam.interface';
import { TicketFilter } from '../interfaces/ticketFilter.interface';
import { map } from 'rxjs';
import { ListTicketData } from '../interfaces/list-Ticket.interface';

export const listTicketsResolver: ResolveFn<ListTicketData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const ticketsSvc = inject(TicketsService);
  const ticketparam = { ...route.queryParams } as TicketParam;
  return ticketsSvc.GetTickets(ticketparam).pipe(map(response => {
    return {
      tickets: response,
      param: ticketparam
    } as ListTicketData
  }));
};
