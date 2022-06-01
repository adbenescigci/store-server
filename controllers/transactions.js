import Transaction from "../models/transaction.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getNewTransactions = async (req, res) => {
  const { referenceTime } = req.params;
  try {
    const transactions = await Transaction.find({
      processTime: { $gt: referenceTime },
    });
    res.status(200).json(transactions);
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
  const transaction = { ...req.body, processTime: Date.now() };
  console.log(transaction);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

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
