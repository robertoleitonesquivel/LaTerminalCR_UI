import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketParam } from '../interfaces/ticketParam.interface';
import { TicketFilter } from '../interfaces/ticketFilter.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TicketDetailParam } from '../interfaces/ticketdetailParam.interface';
import { TicketDetail } from '../interfaces/ticketDetail.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private readonly baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  GetTickets(_dataFilter: TicketParam): Observable<TicketFilter[]> {
    return this.http.get<TicketFilter[]>(`${this.baseUrl}api/Tickets/GetTickets?from=${_dataFilter.from}&to=${_dataFilter.to}&affiliateCode=${_dataFilter.affiliateCode}&travelDate=${_dataFilter.travelDate}`);
  }

  GetDetailTickets(_dataFilter: TicketDetailParam): Observable<TicketDetail[]> {
    return this.http.get<TicketDetail[]>(`${this.baseUrl}api/Tickets/GetDetailTicket?travelId=${_dataFilter.travelId}&orientation=horizontal&type=matriz`);
  }
}
