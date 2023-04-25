import { Counter } from "../models/counter.model";
import { Queue } from "../models/queue.model";
import { Ticket } from "../models/ticket.model";

export const counters: Counter[] = [];

export const queue: Queue = {
    id: "q",
    tickets: [],
    front: null,
    rear: null,
  };

export const initTicket: Ticket = {
number: 100
}