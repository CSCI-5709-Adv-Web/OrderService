import express from "express";
import {
  createOrderController,
  cancleOrderController,
  orderPaymentController,
  fetchAllOrdersOfUserController,
  fetchAllOrdersOfRiderController
} from "../controllers/order.controller";

const router = express.Router();

// POST route for order creation
router.post("/create", createOrderController);
router.post("/cancle/:order_id", cancleOrderController);
router.post("/payment/:order_id", orderPaymentController);
router.get("/getAllOrders/user/:user_id",fetchAllOrdersOfUserController);
router.get("/getAllOrders/rider/:rider_id", fetchAllOrdersOfRiderController);

export default router;
