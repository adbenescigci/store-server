import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  title: {
    type: "String",
    required: [true, "A transaction must have title"],
  },
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
  amount: Number,
  currency: {
    type: String,
    enum: ["TL", "USD", "Euro", "gram"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  transactionTime: {
    type: Date,
  },
  processTime: {
    type: Date,
    default: Date.now(),
  },
});

//DOCUMENT MIDDLEWARE
transactionSchema.pre("save", function (next) {
  this.processTime = Date.now();
  next();
});

// QUERY MIDDLEWARE
transactionSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
