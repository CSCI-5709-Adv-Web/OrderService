import express, { NextFunction, Request, Response } from "express";
import { RequestAuthorizer } from "./middleware";
import * as service from "../service/order.service";
import { OrderRepository } from "../repository/order.repository";

const repo = OrderRepository;
const router = express.Router();

router.post(
  "/orders",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const response = await service.CreateOrder(repo);
    // return res.status(200).json(response);
    res.status(200).json(response);
  }
);

export default router;