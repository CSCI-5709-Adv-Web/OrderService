import { Request, Response } from "express";
import {
  createOrderService,
  cancleOrderService,
  orderPaymentService,
  fetchAllOrdersOfUserService,
  fetchAllOrdersOfRiderService,
  updateOrderStatusService,
} from "../service/order.service"; // Import the service
import { createApiResponse } from "../utils/response";
import { logger } from "../utils";
import { AuthenticatedRequest } from "../types";

// Controller to handle order creation
export async function createOrderController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const orderData = req.body;

  try {
    const newOrder = await createOrderService(orderData);

    logger.info("New Order created: " + newOrder._id);
    // Return a successful response
    createApiResponse(res, "Order created successfully.", 201, newOrder);
  } catch (error) {
    createApiResponse(res, "Failed to create order: " + error.message, 500);
  }
}

// Controller to handle order creation
export async function cancleOrderController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const orderId = req.params.order_id;
  try {
    await cancleOrderService(orderId);
    logger.info("Successfully created order: " + orderId);
    createApiResponse(res, "Order canceled successfully.", 200);
  } catch (error) {
    createApiResponse(res, "Failed to cancel order: " + error.message, 500);
  }
}

export async function orderPaymentController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { orderId, paymentId } = req.body;
  try {
    await orderPaymentService(orderId, paymentId);
  } catch (error) {
    createApiResponse(
      res,
      "Failed to update payment in order service: " + error.message,
      500
    );
  }
}

export async function fetchAllOrdersOfUserController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.params.user_id;
  try {
    const fetchedOrders = await fetchAllOrdersOfUserService(userId);
    createApiResponse(res, "Orders fetched successfully.", 200, fetchedOrders);
  } catch (error) {
    createApiResponse(
      res,
      "Faild to fetch orders of user: " + error.message,
      500
    );
  }
}

export async function fetchAllOrdersOfRiderController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const riderId = req.params.rider_id;
  try {
    const fetchedOrders = await fetchAllOrdersOfRiderService(riderId);
    createApiResponse(res, "Orders fetched successfully.", 200, fetchedOrders);
  } catch (error) {
    createApiResponse(
      res,
      "Faild to fetch orders of user: " + error.message,
      500
    );
  }
}

export async function orderUpdateStatusController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { orderId, status } = req.body;
  try {
    await updateOrderStatusService(orderId, status);
    createApiResponse(res, "Order status updated successfully.", 200);
  } catch (error) {
    createApiResponse(res, "Failed to update order: " + error.message, 500);
  }
}
