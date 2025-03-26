import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const VALUATION_SERVICE_URL = process.env.VALUATION_SERVICE;

// Type for pricing details
export interface ValuationResp {
  pricing_details: {
    cost: number;
    rider_commission: number;
    tax: number;
    total_cost: number;
  };
  distance: number;
  time: number;
}

// Fetch pricing from the external Valuation Service
export const getPricingDetailsFromValuationService = async (
  from_address: string,
  to_address: string,
  vehicle_type: string
): Promise<ValuationResp> => {
  try {
    const response = await axios.post(
      //TODO: change this
      VALUATION_SERVICE_URL + "/calculate",
      {
        from_address,
        to_address,
        vehicle_type,
      }
    );
    return response.data as ValuationResp;
  } catch (error) {
    throw new Error("Error fetching pricing details: " + error.message);
  }
};
