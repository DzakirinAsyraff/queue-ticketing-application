import { Queue, queue } from "../models/queue.model";
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
        // res.status(200).json({ removedTicket });
      } else {
        return null;
        // res.status(404).send({ message: "No tickets to dequeue" });
      }
    } else {
      return null;
      // res.status(404).send({ message: "Queue not found" });
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
        // set rear as newTicket and update the previous ticket's next pointer
        // queue.rear.next = newTicket;
        queue.rear = newTicket;
      }
  }