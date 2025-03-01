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
  type: 'txn';
};

type TransactionsRecordInput = {
  orders: OrderDTO[];
  transactions: TransactionsDTO;
};

export { TransactionsRecordInput };
