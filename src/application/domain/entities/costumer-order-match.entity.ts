import { Order } from './order.entity';

/**
 * CostumerOrderMatch as a domain entity
 */
type CostumerOrderMatch = {
  customerName: string;
  orders: Order[];
};

export { CostumerOrderMatch };
