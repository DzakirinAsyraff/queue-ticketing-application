import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Ticket } from "../models/ticket.model";

const tickets: Ticket[] = [];

export const createTicket = (req: Request, res: Response): void => {
  const newTicket: Ticket = {
    id: uuidv4(),
    number: tickets.length + 1,
    created_at: new Date(),
  };
  tickets.push(newTicket);
  res.json(newTicket);
};

export const getCurrentTicket = (req: Request, res: Response): void => {
  const currentTicket: Ticket | undefined = tickets.find(
    (ticket) => ticket.id === req.params.ticketId
  );
  if (currentTicket) {
    res.json(currentTicket);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
};