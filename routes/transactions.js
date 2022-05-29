import express from "express";
import { getTransactions, doTransaction } from "../controllers/transactions.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", doTransaction);

export default router;
