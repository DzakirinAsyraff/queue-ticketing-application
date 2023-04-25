"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const connection = (socket) => {
    socket.on("updateStatus", (data) => {
        socket.broadcast.emit("receiveStatus", data);
    });
    socket.on("callNext", (data) => {
        socket.broadcast.emit("receiveNext", data);
    });
    socket.on("updateQueue", (data) => {
        socket.broadcast.emit("receiveQueue", data);
    });
    socket.on("updateComplete", (data) => {
        socket.broadcast.emit("receiveComplete", data);
    });
};
exports.connection = connection;
