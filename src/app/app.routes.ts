import { Routes } from '@angular/router';
import { SearchTicketsComponent } from './components/search-tickets/search-tickets.component';
import { ticketsResolver } from './core/resolver/tickets.resolver';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { listTicketsResolver } from './core/resolver/list-tickets.resolver';

export const routes: Routes = [
  {
    path: '',
    component: SearchTicketsComponent,
    resolve: { TicketResolve: ticketsResolver }
  },
  {
    path: 'list-tickets',
    loadComponent: () => import('./components/list-tickets/list-tickets.component').then(prom => prom.ListTicketsComponent),
    resolve: { ListTicketResolve: listTicketsResolver }
  }
];
