import app from "./app";
import http from "http";
import { createCounters } from "./services/counterService";
// import "dotenv/config";
import { Server } from "socket.io";
import { connection } from "./services/socket";

// const port = process.env.PORT||443;
const port = 443;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", connection);


server.listen(443, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    createCounters(4);
    }
);
