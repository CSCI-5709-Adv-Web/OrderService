import express from "express";
import {
  createOrderController,
  cancleOrderController,
  orderPaymentController,
  fetchAllOrdersOfUserController,
  fetchAllOrdersOfRiderController,
  orderUpdateStatusController,
} from "../controllers/order.controller";
import {
  validateOrderCreationRequest,
  validateOrderCancellationRequest,
  validateOrderPaymentRequest,
  validateFetchOrdersOfUserRequest,
  validateFetchOrdersOfRiderRequest,
  validateOrderUpdateRequest,
} from "../middlewares/validateReq.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// POST route for order creation
router.post(
  "/create",
  AuthMiddleware,
  validateOrderCreationRequest,
  createOrderController
);
router.post(
  "/cancle/:order_id",
  AuthMiddleware,
  validateOrderCancellationRequest,
  cancleOrderController
);
router.post(
  "/payment",
  AuthMiddleware,
  validateOrderPaymentRequest,
  orderPaymentController
);
router.get(
  "/getAllOrders/user/:user_id",
  AuthMiddleware,
  validateFetchOrdersOfUserRequest,
  fetchAllOrdersOfUserController
);
router.get(
  "/getAllOrders/rider/:rider_id",
  AuthMiddleware,
  validateFetchOrdersOfRiderRequest,
  fetchAllOrdersOfRiderController
);
router.put(
  "/updateStatus",
  AuthMiddleware,
  validateOrderUpdateRequest,
  orderUpdateStatusController
);

export default router;
