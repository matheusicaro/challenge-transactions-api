import { Transactions } from './transactions.entity';

/**
 * Order DTO received from API inputs
 */
type OrderDTO = {
  orderId: string;
  customerName: string;
  date: string;
  price: number;
  product: string;
  type: 'order';
};

/**
 * Order as a domain entity
 */
type Order = {
  id: string;
  date: Date;
  product: {
    // Product could be a new entity, but will leave as a sub entity of Order for now
    name: string;
    price: number;
  };
  transactions: Transactions[];
};

export { Order, OrderDTO };
