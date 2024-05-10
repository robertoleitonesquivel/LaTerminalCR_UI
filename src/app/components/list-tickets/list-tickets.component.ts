import { Component, OnInit, OnDestroy, inject, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


import { TicketFilter } from '../../core/interfaces/ticketFilter.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTicketData } from '../../core/interfaces/list-Ticket.interface';
import { TicketsService } from '../../core/services/tickets.service';
import { TicketDetailParam } from '../../core/interfaces/ticketdetailParam.interface';
import { TicketParam } from '../../core/interfaces/ticketParam.interface';
import { TicketDetail } from '../../core/interfaces/ticketDetail.interface';
import { SearchTicketsComponent } from '../search-tickets/search-tickets.component';
import { Cities } from '../../core/interfaces/cities.interface';


@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule, MatDividerModule, SearchTicketsComponent],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent implements OnInit, OnDestroy {


  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  private activateRoute = inject(ActivatedRoute);
  private ticketSvc = inject(TicketsService);
  private route = inject(Router);


  origen: string = '';
  destino: string = '';
  listTicketsFilter: TicketFilter[] = [];
  listCities: Cities[] = [];
  asientos: TicketDetail[] = [];
  asientosSelected: TicketDetail[] = [];
  paramTicketFilter!: TicketParam;
  ticketDetail!: TicketFilter;


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.origen = localStorage.getItem('origen') as string;
    this.destino = localStorage.getItem('destino') as string;
    const data = this.activateRoute.snapshot.data['ListTicketResolve'] as ListTicketData;
    this.listTicketsFilter = data.tickets;
    this.paramTicketFilter = data.param;
    this.listCities = data.cities ?? [];
  }

  getEmptySeats(count: number): any[] {
    return new Array(Math.max(0, count));
  }

  getSeatsForRow(rowNumber: number): any[] {
    return this.asientos.filter(seat => seat.position.y === rowNumber);
  }

  public convertHour(_seconds: number): string {

    if (_seconds) {
      const horas = Math.floor(_seconds / 3600);
      const minutos = Math.floor((_seconds % 3600) / 60);

      return `${horas}h ${minutos}m de viaje`;
    }

    return '';


  }

  public detail(_ticket: TicketFilter): void {
    this.ticketDetail = _ticket;
    let param = {
      travelId: _ticket.id
    } as TicketDetailParam;

    this.ticketSvc.GetDetailTickets(param).subscribe({
      next: (data) => {
        this.matTabGroup.selectedIndex = 1;
        this.asientos = data;
        this.asientosSelected = [];
      },
      error: (error) => {

      }
    })
  }

  public Select(_asiento: TicketDetail): void {
    _asiento.select = !_asiento.select;
    if (_asiento.select) {
      this.asientosSelected.push(_asiento);
    } else {
      let index = this.asientosSelected.findIndex(x => x.seat === _asiento.seat);
      if (index >= 0) {
        this.asientosSelected.splice(index, 1);
      }
    }
  }

  public color(_asiento: TicketDetail): string {
    if (_asiento.occupied) {
      return 'color-ocupado';
    } else if (_asiento.select) {
      return 'color-seleccionado';
    } else {
      return '';
    }
  }

  public next(): void {
    this.route.navigate(['/']);
  }

  public search(_ticketFilter: TicketParam): void {
    this.ticketSvc.GetTickets(_ticketFilter).subscribe({
      next: (data) => {
        this.listTicketsFilter = data;
      },
      error: () => {

      }
    })
  }


}
