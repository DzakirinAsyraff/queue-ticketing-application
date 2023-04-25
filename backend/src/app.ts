import express from "express";
import cors from "cors";
import counterRoutes from "./routes/counter.routes";
import queueRoutes from "./routes/queue.routes";

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://blue-sand-0962c6400.3.azurestaticapps.net/",
    ]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/counter", counterRoutes);
app.use("/api/queue", queueRoutes);
app.use("/", (req, res) => {
    res.send("Server running!");
});
app.use('/test', (req, res) => {
    res.send("Test route");
});

export default app;