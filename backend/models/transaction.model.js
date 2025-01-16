
import {model, Schema} from 'mongoose';

const transactionSchema = new Schema({
    id:Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    sold: Boolean,
    dateOfSale: Date,
    image :String
  });
  
  const Transaction = new model('transaction', transactionSchema);
  
export default Transaction;