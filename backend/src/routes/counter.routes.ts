import {Router} from "express";
import { getCounters, toggleCounterStatus, callNext, completeCurrent } from "../controllers/counter.controller";

const router = Router();

router.get("/get", getCounters);
router.put("/toggle/:counterId", toggleCounterStatus);
router.put("/call/:counterId", callNext);
router.put("/complete/:counterId", completeCurrent);

export default router;
