import { Socket } from "socket.io";
import { Counter } from "../models/counter.model";
import { Queue } from "../models/queue.model";

export const connection = (socket:Socket) => {

  socket.on("updateStatus", (data: Counter) => {
    socket.broadcast.emit("receiveStatus", data);
  });

  socket.on("callNext", (data: Counter) => {
    socket.broadcast.emit("receiveNext", data);
  });

  socket.on("updateQueue", (data: Queue) => {
    socket.broadcast.emit("receiveQueue", data);
  });

  socket.on("updateComplete", (data: Counter) => {
    socket.broadcast.emit("receiveComplete", data);
  });
  
}