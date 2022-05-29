import Transaction from "../models/transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    console.log(transactions);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const doTransaction = async (req, res) => {
  const body = req.body;
  console.log(body);
  const transaction = new Transaction(body);

  console.log(transaction);
  try {
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
