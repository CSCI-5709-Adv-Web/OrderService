import { CreateOrderProps } from "../types/order.type";
import {
  createOrder,
  cancleOrder,
  fetchOrderById,
  orderPayment,
  fetchAllOrdersOfUser,
  fetchAllOrdersOfRider,
} from "../repository/order.repository";
import {
  getPricingDetailsFromValuationService,
  ValuationResp,
} from "./valuation.service";
import { logger } from "../utils";

// Service function to create an order with pricing fetched from an external service
export const createOrderService = async (orderData: CreateOrderProps) => {
  const { from_address, to_address, vehicle_type } = orderData;

  try {
    // Fetch pricing details from the Valuation Service
    const valuationResponse: ValuationResp =
      await getPricingDetailsFromValuationService(
        from_address,
        to_address,
        vehicle_type
      );

    // Combine the pricing details with the order data
    const orderWithPricing = {
      ...orderData,
      pricing_details: valuationResponse.pricing_details,
      distance: valuationResponse.distance,
      time: valuationResponse.time,
    };

    // Call the repository to save the orderx
    const savedOrder = await createOrder(orderWithPricing);
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cancleOrderService = async (orderId: string) => {
  try {
    const { paymentAt, payment_status } = await fetchOrderById(orderId);

    if (paymentAt) {
      const currentTime = new Date();

      const oneMinuteAfterPayment = new Date(paymentAt.getTime() + 60 * 1000);

      if (currentTime <= oneMinuteAfterPayment && payment_status === "PAID") {
        // TODO: refund full amount
        logger.info(
          "Full amount is transfer to customer for order: " + orderId
        );
      } else {
        // TODO: refund hald amout and send appropriate amount to rider
        logger.info(
          "Half amount is transfer to rider and remaining amount is transfered to customer for order: " +
            orderId
        );
      }
    }

    await cancleOrder(orderId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const orderPaymentService = async (orderId: string) => {
  const fetchedOrder = await fetchOrderById(orderId);
  if (
    fetchedOrder.payment_status === "PAID" ||
    fetchedOrder.status === "CANCELLED"
  ) {
    return;
  }
  try {
    await orderPayment(orderId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchAllOrdersOfUserService = async (userId: string) => {
  try {
    const fetchedOrders = await fetchAllOrdersOfUser(userId);
    return fetchedOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchAllOrdersOfRiderService = async (riderId: string) => {
  try {
    const fetchedOrders = await fetchAllOrdersOfRider(riderId);
    return fetchedOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};
