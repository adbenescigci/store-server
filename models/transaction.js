import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  title: String,
  description: String,
  user: String,
  subTransactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubTransaction",
    },
  ],
  payment: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  aproxProfit: Number,
  transactionTime: {
    type: Date,
    default: Date.now(),
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

// transactionSchema.pre(/^find/, function (next) {
//   this.find({ isDeleted: false });
//   next();
// });

transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subTransactions",
    select: "transactionType amount workmanship goldSetting goldType",
  });
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
