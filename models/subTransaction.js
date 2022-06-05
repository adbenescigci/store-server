import mongoose from "mongoose";

const subTransactionSchema = mongoose.Schema({
  //PARENT ID
  transaction: {
    type: mongoose.Schema.ObjectId,
    ref: "Transactions",
    required: [true, "SubTransaction must belong to a transaction"],
  },
  transactionType: {
    type: String,
    enum: ["alis", "satis"],
  },
  amount: Number,
  workmanship: Number,
  goldSetting: {
    type: Number,
    enum: [24, 22, 18, 14, 8],
    default: 22,
  },
  goldType: String,
});

//DOCUMENT MIDDLEWARE

// QUERY MIDDLEWARE

const SubTransaction = mongoose.model("SubTransaction", subTransactionSchema);

export default SubTransaction;
