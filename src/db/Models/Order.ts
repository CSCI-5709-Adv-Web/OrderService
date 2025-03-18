import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    from_address: {
      type: String,
      required: true,
    },
    to_address: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    rider_id: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    status: {
      type: String,
      enum: [
        "ORDER PLACED",
        "ORDER CONFIRMED",
        "PAYMENT RECEIVED",
        "AWAITING PICKUP",
        "PICKED UP",
        "OUT FOR DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "ORDER PLACED",
    },
    pricing_details: {
      cost: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        required: true,
      },
      total_cost: {
        type: Number,
        required: true,
      },
      rider_commission: {
        type: Number,
        required: true,
      },
    },
    package_weight: {
      type: Number,
      required: true,
    },
    vehicle_type: {
      type: String,
      enum: ["BIKE", "CAR", "TRUCK", "WALK"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
    },
    delivery_instructions: {
      type: String,
      required: false,
    },
    distance: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
