import { Request, Response } from "express";
import { Counter, counters } from "../models/counter.model";
import { Ticket } from "../models/ticket.model";
import { queue } from "../models/queue.model";
import { dequeueTicket } from "../services/queueService";

//API function
//get all counters
export const getCounters = (req: Request, res: Response): void => {
  res.json(counters);
};

//toggle counter status
export const toggleCounterStatus = (req: Request, res: Response): void => {
  const counterId: number = parseInt(req.params.counterId);
  const counter: Counter | undefined = counters.find(
    (counter) => counter.ind === counterId
  );
  if (counter) {
    if (counter.status === "online") {
      counter.status = "offline";
    } else {
      counter.status = "online";
    }
    res.json(counter);
  } else {
    res.status(404).json({ error: "Counter not found" });
  }
};

// call next
export const callNext = (req: Request, res: Response): void => {
  const counterId: number = parseInt(req.params.counterId);
  const counter: Counter | undefined = counters.find(
    (counter) => counter.ind === counterId
  );
  if(counter){
    const ticket: Ticket | null = dequeueTicket(queue);
    counter.status = "serving";
    counter.currentNumber = ticket;
    res.json(counter);
  } else {
    res.status(404).json({ error: "Counter not found" });
  }
};

// complete current
export const completeCurrent = (req: Request, res: Response): void => {
  const counterId: number = parseInt(req.params.counterId);
  const counter: Counter | undefined = counters.find(
    (counter) => counter.ind === counterId
  );
  if (!counter) {
    res.status(404).send({ message: `Counter ${counterId} not found` });
    return;
  }

  if (!counter.currentNumber) {
    res.status(400).send({ message: `Counter ${counterId} is not serving any ticket` });
    return;
  }

  // remove the currentNumber property from the counter object
  const updatedCounter: Counter = {
    ...counter,
    currentNumber: null,
    status: counter.status === "serving" ? "online" : counter.status,
  };

  

  // update the counters array by finding index
  const index = counters.findIndex((counter) => counter.ind === counterId);
  counters[index] = updatedCounter;

  res.status(200).json(updatedCounter);
};
