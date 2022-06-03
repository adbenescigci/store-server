import Transaction from "../models/transaction.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = JSON.parse(queryStr);
  try {
    let time = Date.now();
    const transactions = await Transaction.find(query);
    res.status(200).json({ transactions, time });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const doTransaction = async (req, res) => {
  const transaction = req.body;
  const newTransaction = new Transaction(transaction);
  try {
    await newTransaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const transaction = { ...req.body, processTime: Date.now() };
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    _id,
    transaction,
    {
      new: true,
    }
  );
  res.json(updatedTransaction);
};

export const deleteTransaction = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  await Transaction.findByIdAndRemove(_id);
  res.json({ message: "transaction deleted succesfully" });
};
