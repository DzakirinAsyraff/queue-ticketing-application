import { Ticket } from "./ticket.model";

export interface Counter {
    ind: number;
    status: "online" | "serving" | "offline";
    currentNumber: Ticket | null;
  }

  export const counters: Counter[] = [];