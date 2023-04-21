import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Queue } from "../models/queue.model";
import { Ticket } from "../models/ticket.model";

let queue : Queue = {} as Queue;
let start = 100;

// Non-API function
export const createQueue = (): void => {
  const newQueue: Queue = {
    id: "q",
    tickets: [],
    front: null,
    rear: null,
  };
  // set newQueue to queue
  queue = newQueue;
  // console.log("queue", queue)
};

export const dequeueTicket = (): Ticket | null  => {
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

// API Function
export const getQueue = (req: Request, res: Response): void => {
  if(!queue){
    createQueue();
  }
  res.status(200).json(queue);
}

export const enqueueTicket = (req: Request, res: Response): void => {
  if (queue) {
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
    
    res.status(201).json(queue)
  } else {
    res.status(404).send({ message: "Queue not found" });
  }
};





// export const getQueue = (req: Request, res: Response): void => {
//   const queue: Queue | undefined = queues.find(
//     (queue) => queue.id === req.params.queueId
//   );
//   if (queue) {
//     res.json(queue);
//   } else {
//     res.status(404).json({ message: "Queue not found" });
//   }
// };

// export const enqueueTicket = (req: Request, res: Response): void => {
//   const queue: Queue | undefined = queues.find(
//     (queue) => queue.id === req.params.queueId
//   );
//   if (queue) {
//     const newTicket: Ticket = {
//       // id: uuidv4(),
//       number: queue.tickets.length + 1,
//       // created_at: new Date(),
//     };
//     queue.tickets.push(newTicket);
//     res.json(newTicket);
//   } else {
//     res.status(404).json({ message: "Queue not found" });
//   }
// };

// export const dequeueTicket = (req: Request, res: Response): void => {
//   const queue: Queue | undefined = queues.find(
//     (queue) => queue.id === req.params.queueId
//   );
//   if (queue && queue.tickets.length > 0) {
//     const nextTicket: Ticket = queue.tickets[0];
//     queue.tickets = queue.tickets.slice(1);
//     res.json(nextTicket);
//   } else {
//     res.status(404).json({ message: "No tickets in the waiting queue" });
//   }
// };