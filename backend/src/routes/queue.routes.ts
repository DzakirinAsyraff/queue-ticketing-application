import { Router } from "express";
import { getQueue, enqueueTicket } from "../controllers/queue.controller";

const router = Router();

router.get("/get", getQueue);
router.get("/enqueue", enqueueTicket);
// router.get("/dequeue", dequeueTicket);

export default router