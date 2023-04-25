import app from "./app";
import http from "http";
import { createCounters } from "./services/counterService";
// import "dotenv/config";
import { Server } from "socket.io";
import { connection } from "./services/socket";

const port = process.env.PORT||5000;
// const port = 80;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", connection);


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    createCounters(4);
    }
);
