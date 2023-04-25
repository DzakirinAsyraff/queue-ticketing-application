"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTicket = exports.queue = exports.counters = void 0;
exports.counters = [];
exports.queue = {
    id: "q",
    tickets: [],
    front: null,
    rear: null,
};
exports.initTicket = {
    number: 100
};
