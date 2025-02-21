import express, { NextFunction, Request, Response } from "express";
import { RequestAuthorizer } from "./middleware";
import { OrderRepository } from "../repository/order.repository";
import { MessageBroker } from "../utils";
import { OrderEvent } from "../types";

const repo = OrderRepository;
const router = express.Router();

router.post(
  "/orders",
  // RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const user = req.user;
    // if (!user) {
    //   next(new Error("User not found"));
    //   return;
    // }
    // const response = await service.CreateOrder(repo);
    // return res.status(200).json(response);

    // logic for creating order

    await MessageBroker.publish({
      topic: "OrderEvents",
      headers: { token: req.headers.authorization },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          {
            productId: 1,
            quantity: 1,
          },
        ],
      },
    });
    res.status(200).json({ message: "Create order..." });
  }
);

export default router;
