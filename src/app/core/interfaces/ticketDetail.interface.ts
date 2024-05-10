export interface TicketDetail {
  seat: string;
  position: Position;
  occupied: boolean;
  type: string;
  select: boolean;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
