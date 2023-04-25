"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueTicket = exports.dequeueTicket = void 0;
const dequeueTicket = (queue) => {
    var _a;
    if (queue) {
        const removedTicket = queue.front;
        if (removedTicket) {
            // remove front ticket and update front pointer
            queue.tickets.shift();
            queue.front = (_a = queue.tickets[0]) !== null && _a !== void 0 ? _a : null;
            // update rear pointer if queue is now empty
            if (!queue.tickets.length) {
                queue.rear = null;
            }
            return removedTicket;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.dequeueTicket = dequeueTicket;
const enqueueTicket = (queue, start) => {
    const newTicket = {
        number: start + 1,
    };
    start = start + 1;
    queue.tickets.push(newTicket);
    // set rear as newTicket if queue was empty
    if (!queue.rear) {
        queue.front = newTicket;
        queue.rear = newTicket;
    }
    else {
        queue.rear = newTicket;
    }
};
exports.enqueueTicket = enqueueTicket;
