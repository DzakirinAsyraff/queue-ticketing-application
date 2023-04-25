"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeCurrent = exports.callNext = exports.toggleCounterStatus = exports.getCounters = void 0;
const data_1 = require("../data/data");
const queueService_1 = require("../services/queueService");
//API function
//get all counters
const getCounters = (req, res) => {
    res.json(data_1.counters);
};
exports.getCounters = getCounters;
//toggle counter status
const toggleCounterStatus = (req, res) => {
    const counterId = parseInt(req.params.counterId);
    const counter = data_1.counters.find((counter) => counter.ind === counterId);
    if (counter) {
        if (counter.status === "online") {
            counter.status = "offline";
        }
        else {
            counter.status = "online";
        }
        res.json(counter);
    }
    else {
        res.status(404).json({ error: "Counter not found" });
    }
};
exports.toggleCounterStatus = toggleCounterStatus;
// call next
const callNext = (req, res) => {
    const counterId = parseInt(req.params.counterId);
    const counter = data_1.counters.find((counter) => counter.ind === counterId);
    if (counter) {
        const ticket = (0, queueService_1.dequeueTicket)(data_1.queue);
        counter.status = "serving";
        counter.currentNumber = ticket;
        res.json(counter);
    }
    else {
        res.status(404).json({ error: "Counter not found" });
    }
};
exports.callNext = callNext;
// complete current
const completeCurrent = (req, res) => {
    const counterId = parseInt(req.params.counterId);
    const counter = data_1.counters.find((counter) => counter.ind === counterId);
    if (!counter) {
        res.status(404).send({ message: `Counter ${counterId} not found` });
        return;
    }
    if (!counter.currentNumber) {
        res.status(400).send({ message: `Counter ${counterId} is not serving any ticket` });
        return;
    }
    // remove the currentNumber property from the counter object
    const updatedCounter = Object.assign(Object.assign({}, counter), { currentNumber: null, status: counter.status === "serving" ? "online" : counter.status });
    // update the counters array by finding index
    const index = data_1.counters.findIndex((counter) => counter.ind === counterId);
    data_1.counters[index] = updatedCounter;
    res.status(200).json(updatedCounter);
};
exports.completeCurrent = completeCurrent;
