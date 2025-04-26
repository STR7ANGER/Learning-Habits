import express from "express";
import { createPurchase } from "../controllers/purchase.controller";

const purchaserouter = express.Router();

purchaserouter.post("/create", createPurchase as express.RequestHandler);

export default purchaserouter;