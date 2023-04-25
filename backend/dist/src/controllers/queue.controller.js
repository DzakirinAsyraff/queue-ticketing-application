"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueTicket = exports.getQueue = void 0;
const data_1 = require("../data/data");
// API Function
const getQueue = (req, res) => {
    res.status(200).json(data_1.queue);
};
exports.getQueue = getQueue;
const enqueueTicket = (req, res) => {
    if (data_1.queue) {
        const newTicket = {
            number: data_1.initTicket.number + 1,
        };
        data_1.initTicket.number = data_1.initTicket.number + 1;
        data_1.queue.tickets.push(newTicket);
        // set rear as newTicket if queue was empty
        if (!data_1.queue.rear) {
            data_1.queue.front = newTicket;
            data_1.queue.rear = newTicket;
        }
        else {
            // set rear as newTicket and update the previous ticket's next pointer
            data_1.queue.rear = newTicket;
        }
        res.status(201).json(data_1.queue);
    }
    else {
        res.status(404).send({ message: "Queue not found" });
    }
};
exports.enqueueTicket = enqueueTicket;
