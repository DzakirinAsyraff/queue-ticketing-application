"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCounterStatus = exports.createCounters = void 0;
const data_1 = require("../data/data");
const createCounters = (size) => {
    for (let i = 0; i < size; i++) {
        const newCounter = {
            ind: i + 1,
            status: "online",
            currentNumber: null,
        };
        data_1.counters.push(newCounter);
    }
};
exports.createCounters = createCounters;
const toggleCounterStatus = (counter) => {
    if (counter.status === "online") {
        counter.status = "offline";
    }
    else {
        counter.status = "online";
    }
    return counter;
};
exports.toggleCounterStatus = toggleCounterStatus;
