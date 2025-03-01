import { Order } from './order.entity';

/**
 * Transaction DTO received from API inputs
 */
type TransactionsDTO = {
  customerName: string;
  date: string;
  orderId: string;
  price: number;
  product: string;
  transactionDate: string;
  transactionType: string;
  transactionAmount: number;
  type: string;
};

enum TransactionType {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  REFUND = 'REFUND'
}

/**
 * Transaction as a domain entity
 */
type Transactions = {
  id: string;
  date: Date;
  type: TransactionType;
  orderId: Order;
  amount: number;
};

export { Transactions, TransactionType, TransactionsDTO };
