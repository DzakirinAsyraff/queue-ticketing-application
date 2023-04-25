"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const counter_routes_1 = __importDefault(require("./routes/counter.routes"));
const queue_routes_1 = __importDefault(require("./routes/queue.routes"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://blue-sand-0962c6400.3.azurestaticapps.net",
        "https://queue-ticketing.azurewebsites.net",
    ]
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// app.use(express.urlencoded());
app.use("/api/counter", counter_routes_1.default);
app.use("/api/queue", queue_routes_1.default);
app.use("/", (req, res) => {
    res.send("Server running!");
});
app.use('/test', (req, res) => {
    res.send("Test route");
});
exports.default = app;
