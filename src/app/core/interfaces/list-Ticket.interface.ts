import { Cities } from "./cities.interface";
import { TicketFilter } from "./ticketFilter.interface";
import { TicketParam } from "./ticketParam.interface";

export interface ListTicketData {
  tickets: TicketFilter[];
  param: TicketParam;
  cities: Cities[];
}
