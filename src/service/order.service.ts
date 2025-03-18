import { CreateOrderProps } from "../types/order.type";
import { createOrder } from "../repository/order.repository";
import {
  getPricingDetailsFromValuationService,
  ValuationResp,
} from "../service/valutaion.service";

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
    throw new Error("Failed to create order: " + error.message);
  }
};
