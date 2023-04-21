import { Request, Response } from "express";
import { Counter } from "../models/counter.model";
import { Ticket } from "../models/ticket.model";
import { Queue } from "../models/queue.model";
import { dequeueTicket } from "./queue.controller";
import { io } from "../server";



//initialize empty array
const counters: Counter[] = [];
// const ticketQueue: Ticket[] = [];

//Non-API function
// create counters
export const createCountersArr = (size: number): void => {
  // const numCounters: number = parseInt(req.params.size);

  // const counters: Counter[] = [];
  for (let i = 0; i < size; i++) {
    const newCounter: Counter = {
      ind: i+1,
      status: "online",
      currentNumber: null,
    };
    counters.push(newCounter);
  }
  // console.log("counters", counters)
  // return counters;
};

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
  //   io.on("connect", (socket) => {
  //   console.log("Client connected");
  
  //   socket.on("updateStatus", (data: boolean) => {
  //     console.log(`Update status: ${data}`);
  //     socket.broadcast.emit("updateStatus", data);
  //   });
  
  //   socket.on("disconnect", () => {
  //     console.log("Client disconnected");
  //   });
  // });
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
    const ticket: Ticket | null = dequeueTicket();
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


// a function that take in a number which would be the size of array of counters
// export const createCounters = (req: Request, res: Response): void => {
//   const size = Number(req.params.size);

//   if (!size || size < 1) {
//     res.status(400).json({ error: "Invalid size parameter" });
//     return;
//   }

//   // Create the counters array
//   for (let i = 1; i <= size; i++) {
//     const counter: Counter = {
//       ind: i,
//       status: "offline",
//     };
//     counters.push(counter);
//   }

//   res.status(200).json({ message: `Created ${size} counters`, counters });
// };


// export const createCounter = (req: Request, res: Response): void => {
//   const newCounter: Counter = {
//     id: req.params.counterId,
//     status: "offline",
//   };
//   counters.push(newCounter);
//   res.json(newCounter);
// };

// export const getCounter = (req: Request, res: Response): void => {
//     const counter: Counter | undefined = counters.find(
//       (counter) => counter.id === req.params.counterId
//     );
//     if (counter) {
//       res.json(counter);
//     } else {
//       res.status(404).json({ error: "Counter not found" });
//     }
//   };
  
//   export const createTicket = (req: Request, res: Response): void => {
//     const newTicket: Ticket = {
//       id: generateTicketNumber(),
//       created_at: new Date(),
//     };
//     ticketQueue.push(newTicket);
//     res.json(newTicket);
//   };
  
//   export const getNextTicket = (req: Request, res: Response): void => {
//     if (ticketQueue.length > 0) {
//       const nextTicket: Ticket = ticketQueue[0];
//       res.json(nextTicket);
//     } else {
//       res.status(404).json({ error: "No tickets in the waiting queue" });
//     }
//   };
  
//   export const completeCurrentTicket = (req: Request, res: Response): void => {
//     const counterId: string = req.params.counterId;
//     const currentTicket: Ticket | undefined = getCurrentTicket(counterId);
//     if (currentTicket) {
//       currentTicket.completed_at = new Date();
//       res.json(currentTicket);
//     } else {
//       res.status(404).json({ error: "No current ticket for this counter" });
//     }
//   };
  
//   export const callNextTicket = (req: Request, res: Response): void => {
//     if (ticketQueue.length > 0) {
//       const nextTicket: Ticket = ticketQueue.shift()!;
//       const counterId: string = req.params.counterId;
//       const counter: Counter | undefined = counters.find(
//         (counter) => counter.id === counterId
//       );
//       if (counter) {
//         counter.current_ticket_id = nextTicket;
//         counter.status = "serving";
//         res.json(nextTicket);
//       } else {
//         res.status(404).json({ error: "Counter not found" });
//       }
//     } else {
//       res.status(404).json({ error: "No tickets in the waiting queue" });
//     }
//   };
  
//   const getCurrentTicket = (counterId: string): Ticket | undefined => {
//     const counter: Counter | undefined = counters.find(
//       (counter) => counter.id === counterId
//     );
//     if (counter && counter.current_ticket_id) {
//         return counter;
//     } else {
//       return undefined;
//     }
//   };
  
//   const generateTicketNumber = (): string => {
//     // Generate a random integer between 100 and 999
//     const  num : number = Math.floor(Math.random() * 900) + 100;
//     return num.toString();
//   };