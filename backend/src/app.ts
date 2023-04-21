import express from "express";
import cors from "cors";
import counterRoutes from "./routes/counter.routes";
import queueRoutes from "./routes/queue.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use("/api/counter", counterRoutes);
app.use("/api/queue", queueRoutes);

app.get("/test", (req, res) => {
    res.status(200).json({first:"heyy",num:25})
    }
);

export default app;