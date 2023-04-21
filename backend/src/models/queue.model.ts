import { Ticket } from "./ticket.model";

export interface Queue {
    id: string;
    tickets: Ticket[];
    front: Ticket | null;
    rear: Ticket | null;
  }