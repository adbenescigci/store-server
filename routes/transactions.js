import express from "express";
import {
  getTransactions,
  getNewTransactions,
  doTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/refresh/:referenceTime", getNewTransactions);
router.post("/", doTransaction);
router.patch("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
