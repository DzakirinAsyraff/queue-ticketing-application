import {Router} from "express";
import { getCounters, toggleCounterStatus, callNext, completeCurrent } from "../controllers/counter.controller";

const router = Router();

// router.get("/create/:size", createCounters);

router.get("/get", getCounters);

router.put("/toggle/:counterId", toggleCounterStatus);

router.put("/call/:counterId", callNext);

router.put("/complete/:counterId", completeCurrent);

// // Create a new counter
// router.post("/:counterId", createCounter);

// // Get a counter by ID
// router.get("/:counterId", getCounter);

// Set the status of a counter (online/offline)
// router.put("/:counterId/status", setCounterStatus);

// Mark the current ticket as complete for a counter
// router.put("/:counterId/complete", completeTicket);

// // Call the next ticket for a counter
// router.post("/:counterId/call-next", callNextTicket);

export default router;
