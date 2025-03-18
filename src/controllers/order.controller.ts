import { Request, Response } from "express";
import { createOrderService } from "../service/order.service"; // Import the service
import { createApiResponse } from "../utils/response";
import { logger } from "../utils";

// Controller to handle order creation
export async function createOrderController(
  req: Request,
  res: Response
): Promise<void> {
  const orderData = req.body;

  try {
    const newOrder = await createOrderService(orderData);

    logger.info("New Order created: " + newOrder._id);
    // Return a successful response
    createApiResponse(res, "Order created successfully.", 201, newOrder);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order: " + error.message,
    });
  }
}
