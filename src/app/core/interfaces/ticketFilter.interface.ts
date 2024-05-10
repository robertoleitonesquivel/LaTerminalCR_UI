export interface TicketFilter {
  id: string;
  company: Company;
  from: From;
  to: To;
  availableSeats: number;
  withBPE: boolean;
  departure: Departure;
  arrival: Arrival;
  travelDuration: number;
  travelDistance: string;
  seatClass: string;
  price: Price;
  insurance: number;
  allowCanceling: boolean;
  travelCancellationLimitDate: string;
  travelCancellationFee: number;
  manualConfirmation: boolean;
}

export interface To {
  id: string;
  name: string;
}

export interface Arrival {
  date: string;
  time: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Departure {
  date: string;
  time: string;
}

export interface From {
  id: string;
  name: string;
}

export interface Price {
  seatPrice: number;
  taxPrice: number;
  price: number;
}
