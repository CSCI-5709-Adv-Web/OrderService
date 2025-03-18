import express from "express";
import { createOrderController } from "../controllers/order.controller";

const router = express.Router();

// POST route for order creation
router.post("/create", createOrderController);

export default router;