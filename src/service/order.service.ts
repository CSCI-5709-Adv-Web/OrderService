import { CreateOrderProps } from "../types/order.type";
import {
  createOrder,
  cancleOrder,
  fetchOrderById,
  orderPayment,
  fetchAllOrdersOfUser,
  fetchAllOrdersOfRider,
  updateOrderStatus,
  refundOrder,
} from "../repository/order.repository";
import {
  getPricingDetailsFromValuationService,
  ValuationResp,
} from "./valuation.service";

// Service function to create an order with pricing fetched from an external service
export const createOrderService = async (orderData: CreateOrderProps) => {
  const { distance, time, vehicle_type } = orderData;

  try {
    // Fetch pricing details from the Valuation Service
    const valuationResponse: ValuationResp =
      await getPricingDetailsFromValuationService(distance, time, vehicle_type);

    // Combine the pricing details with the order data
    const orderWithPricing = {
      ...orderData,
      pricing_details: valuationResponse.pricing_details,
    };

    // Call the repository to save the orderx
    const savedOrder = await createOrder(orderWithPricing);
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cancleOrderService = async (orderId: string, refundId: string) => {
  try {
    const fetchedOrder = await fetchOrderById(orderId);

    if (fetchedOrder.status === "CANCELLED") {
      throw new Error("Order has already been cancelled");
    }
    if (
      !(
        fetchedOrder.status === "ORDER PLACED" ||
        fetchedOrder.status === "ORDER CONFIRMED"
      )
    ) {
      throw new Error("Payment doesn't made.");
    }

    if (fetchedOrder.paymentId) {
      const refundRes = await refundOrder(orderId, refundId);
      if (refundRes) {
        await cancleOrder(orderId);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const orderPaymentService = async (
  orderId: string,
  paymentId: string
) => {
  const fetchedOrder = await fetchOrderById(orderId);
  if (
    !(
      fetchedOrder.status === "ORDER PLACED" ||
      fetchedOrder.status === "ORDER CONFIRMED"
    )
  ) {
    throw new Error("Pament already ");
  }
  try {
    await orderPayment(orderId, paymentId);
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

export const updateOrderStatusService = async (
  orderId: string,
  status: string
) => {
  try {
    const fetchedOrders = await updateOrderStatus(orderId, status);
    return fetchedOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};
