import Transaction from "../models/transaction.js";
import SubTransaction from "../models/subTransaction.js";
import mongoose from "mongoose";
import { getAll, getChildIds } from "../utils/query.js";

// For error detection from getAll function
// we look whether the result error or not, if error =>  it should have message property,
// if later there will be a more logical way to do this operation
// we can refactor this part ***

export const getTransactions = async (req, res) => {
  let time = Date.now();
  const transactions = await getAll(Transaction, req.query);
  if (!transactions.message) res.status(200).json({ transactions, time });
  else
    res.status(400).json({
      message: transactions.message,
    });
};
export const refreshTransactions = async (req, res) => {
  let time = Date.now();
  let deletedItemsIds = [];
  const transactions = await getAll(Transaction, req.query);

  //DETERMINE DELETED ITEMS IDs TO SEND FRONT END TO REMOVE FROM STATE
  req.query.isDeleted = "true";
  const deleted = await getAll(Transaction, req.query);
  if (deleted.length > 0) {
    deleted.forEach((el) => {
      deletedItemsIds.push(el.id);
    });
  }

  if (!transactions.message)
    res.status(200).json({ transactions, deletedItemsIds, time });
  else
    res.status(400).json({
      message: transactions.message,
    });
};

export const getTransaction = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    const transaction = await Transaction.findById(_id);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const doTransaction = async (req, res) => {
  const transaction = req.body;
  const newTransaction = new Transaction(transaction);

  newTransaction.subTransactions = getChildIds(
    transaction.subTransactions,
    newTransaction._id,
    SubTransaction
  );

  try {
    await newTransaction.save();
    res.status(201).json(newTransaction);
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

export const deleteAllTransactions = async (req, res) => {
  await Transaction.remove({});
  await SubTransaction.remove({});
  res.json({ message: "transactions deleted succesfully" });
};
