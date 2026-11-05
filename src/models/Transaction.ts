import {Schema, model, models} from 'mongoose';

const TransactionSchema = new Schema(
    {
    userId:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    type: {type: String, enum: ['income', 'expense'], required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    },
    {timestamps: true}
);

const Transaction = models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;