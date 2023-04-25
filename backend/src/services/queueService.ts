import { Queue } from "../models/queue.model";
import { Ticket } from "../models/ticket.model";

  export const dequeueTicket = (queue:Queue): Ticket | null  => {
    if (queue) {
      const removedTicket = queue.front;
      if (removedTicket) {
        // remove front ticket and update front pointer
        queue.tickets.shift();
        queue.front = queue.tickets[0] ?? null;
  
        // update rear pointer if queue is now empty
        if (!queue.tickets.length) {
          queue.rear = null;
        }
        return removedTicket;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  export const enqueueTicket = (queue:Queue, start:number):void =>{
    const newTicket = {
        number: start + 1,
      };
      start = start + 1
      queue.tickets.push(newTicket);
  
      // set rear as newTicket if queue was empty
      if (!queue.rear) {
        queue.front = newTicket;
        queue.rear = newTicket;
      } else {
        queue.rear = newTicket;
      }
  }