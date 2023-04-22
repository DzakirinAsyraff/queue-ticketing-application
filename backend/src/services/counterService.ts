import { Queue } from "../models/queue.model";
import { Ticket } from "../models/ticket.model";
import { Counter, counters } from "../models/counter.model";

export const createCounters = (size: number): void => {
    for (let i = 0; i < size; i++) {
        const newCounter: Counter = {
          ind: i+1,
          status: "online",
          currentNumber: null,
        };
        counters.push(newCounter);
      }
}

export const toggleCounterStatus = (counter: Counter): Counter => {
    if (counter.status === "online") {
        counter.status = "offline";
      } else {
        counter.status = "online";
      }
    return counter;
}