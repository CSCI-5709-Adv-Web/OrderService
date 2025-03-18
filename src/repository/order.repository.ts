import mongoose from "mongoose";
import { Order } from "../db/Models/Order";
import { CreateOrderProps } from "../types/order.type"; // Assuming this is defined

// Function to save a new order in the database
export const createOrder = async (orderData: CreateOrderProps) => {
  const newOrder = new Order({
    from_address: orderData.from_address,
    to_address: orderData.to_address,
    user_id: orderData.user_id,
    package_weight: orderData.package_weight,
    vehicle_type: orderData.vehicle_type,
    delivery_instructions: orderData.delivery_instructions,
    pricing_details: orderData.pricing_details,
    distance: orderData.distance,
    time: orderData.time,
  });

  try {
    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new Error("Error saving the order: " + error.message);
  }
};
