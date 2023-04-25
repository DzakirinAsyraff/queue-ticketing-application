"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const counterService_1 = require("./services/counterService");
// import "dotenv/config";
const socket_io_1 = require("socket.io");
const socket_1 = require("./services/socket");
// const port = process.env.PORT||443;
const port = 80;
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
exports.io.on("connection", socket_1.connection);
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    (0, counterService_1.createCounters)(4);
});
