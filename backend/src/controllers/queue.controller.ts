import { Request, Response } from "express";
import { initTicket, queue } from "../data/data";

// API Function
export const getQueue = (req: Request, res: Response): void => {  
  res.status(200).json(queue);
}

export const enqueueTicket = (req: Request, res: Response): void => {
  if (queue) {
    const newTicket = {
      number: initTicket.number + 1,
    };
    initTicket.number = initTicket.number + 1
    queue.tickets.push(newTicket);

    // set rear as newTicket if queue was empty
    if (!queue.rear) {
      queue.front = newTicket;
      queue.rear = newTicket;
    } else {
      // set rear as newTicket and update the previous ticket's next pointer
      queue.rear = newTicket;
    }
    
    res.status(201).json(queue)
  } else {
    res.status(404).send({ message: "Queue not found" });
  }
};
