import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  title: {
    type: "String",
    required: [true, "A transaction must have title"],
  },
  description: String,
  user: String,
  subTransactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubTransaction",
    },
  ],
  payment: [String],
  paymentType: {
    type: String,
    enum: ["cash", "card"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

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
transactionSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});
transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subTransactions",
    select: "transactionType amount workmanship goldSetting goldType",
  });
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
