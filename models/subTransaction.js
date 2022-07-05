import mongoose from "mongoose";
const subTransactionSchema = mongoose.Schema({
  transaction: {
    type: mongoose.Schema.ObjectId,
    ref: "Transactions",
    required: [true, "SubTransaction must belong to a transaction"],
  },
  transactionType: String,
  amount: Number,
  weight: Number,
  history: String,
  label: String,
  id: Number,
  unit: String,
  type: String,
  amount: Number,
  worship: Number,
  setting: Number,
});

//DOCUMENT MIDDLEWARE

// QUERY MIDDLEWARE

const SubTransaction = mongoose.model("SubTransaction", subTransactionSchema);

export default SubTransaction;
