"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queue_controller_1 = require("../controllers/queue.controller");
const router = (0, express_1.Router)();
router.get("/get", queue_controller_1.getQueue);
router.get("/enqueue", queue_controller_1.enqueueTicket);
exports.default = router;
