import { Socket } from "socket.io";
import { Counter } from "../models/counter.model";
import { Queue } from "../models/queue.model";

export const connection = (socket:Socket) => {
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
}