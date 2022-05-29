import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  title: String,
  description: String,
  user: String,
  transactionType: {
    type: String,
    enum: ["alis", "satis"],
  },
  weight: {
    type: Number,
  },
  work: Number,
  goldSetting: {
    type: Number,
    enum: [22, 18, 14, 24, 8],
    default: 22,
  },
  goldType: String,
  transactionTime: {
    type: Date,
    default: new Date(),
  },
  amount: Number,
  currency: {
    type: String,
    enum: ["TL", "USD", "Euro", "gram"],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
