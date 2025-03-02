import { Transaction } from './transaction.entity';

/**
 * Order as a domain entity
 */
type Order = {
  id: string;
  type: string;
  customerName: string;
  date: Date;
  product: {
    // Product could be a new entity, but will leave as a sub entity of Order for now
    name: string;
    price: number;
  };
  transactions: Transaction[];
};

export { Order };
