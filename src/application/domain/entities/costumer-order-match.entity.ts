import { Order } from './order.entity';
import { Transaction } from './transaction.entity';

type TransactionOverride = Omit<Transaction, 'date' | 'customerName'> & {
  date: string;
};

type OrderOverride = Omit<Order, 'date' | 'customerName' | 'transactions'> & {
  date: string;
  transactions: TransactionOverride[];
};

/**
 * CostumerOrderMatch as a domain entity
 */
type CostumerOrderMatch = {
  customerName: string;
  orders: OrderOverride[];
};

export { CostumerOrderMatch };
