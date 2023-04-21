import app from "./app";
import http from "http";
import { createCountersArr } from "./controllers/counter.controller";
import { createQueue } from "./controllers/queue.controller";
import "dotenv/config";
import { Server, Socket } from "socket.io";
import { Counter } from "./models/counter.model";
import { Queue } from "./models/queue.model";
import { Ticket } from "./models/ticket.model";



const port = process.env.PORT;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("updateStatus", (data: Counter) => {
    console.log(`Update status: ${data}`);
    socket.broadcast.emit("receiveStatus", data);
  });

  socket.on("callNext", (data: Counter) => {
    console.log(`Call next: ${data}`);
    socket.broadcast.emit("receiveNext", data);
  });

  socket.on("updateQueue", (data: Queue) => {
    console.log(`Update queue: ${data}`);
    socket.broadcast.emit("receiveQueue", data);
  });

  socket.on("updateComplete", (data: Counter) => {
    console.log(`Update complete: ${data}`);
    socket.broadcast.emit("receiveComplete", data);
  });
  
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

});


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    createCountersArr(4);
    createQueue();
    }
);

// io.on("connect", (socket: Socket) => {
//     console.log("Client connected");
  
//     socket.on("message", (data: string) => {
//       console.log(`Received message: ${data}`);
//       socket.broadcast.emit("message", data);
//     });
  
//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });