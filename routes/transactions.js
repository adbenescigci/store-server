import express from "express";
import {
  getTransactions,
  getTransaction,
  doTransaction,
  updateTransaction,
  deleteTransaction,
  deleteAllTransactions,
} from "../controllers/transactions.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", doTransaction);
router.patch("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);
router.delete("/", deleteAllTransactions);

export default router;
