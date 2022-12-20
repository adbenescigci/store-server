import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    user: String,
    subTransactions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubTransaction',
      },
    ],
    payment: { cash: Number, card: Number }, // TL
    claim: Number, // gr
    search: Array,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    earn: Number, // TL
    sumAlis: Number, // gr
    sumSatis: Number, // gr
    transactionTime: {
      type: Date,
      default: Date.now(),
    },
    processTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
transactionSchema.index({ search: 'text' });
transactionSchema.index({ description: 'text' });

//DOCUMENT MIDDLEWARE

transactionSchema.pre('save', function (next) {
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
    path: 'subTransactions',
    select: '-id -transaction',
  });
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
