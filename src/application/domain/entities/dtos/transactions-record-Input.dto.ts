/**
 * Order DTO received from API inputs
 */
export type OrderDTO = {
  orderId: string;
  customerName: string;
  date: string;
  price: number;
  product: string;
  type: string;
};

/**
 * Transaction DTO received from API inputs
 */
export type TransactionsDTO = {
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

type TransactionsRecordInput = {
  orders: OrderDTO[];
  transactions: TransactionsDTO[];
};

const isValidTransactionsRecordInput = (input: unknown): boolean => {
  const orders = (input as Partial<TransactionsRecordInput>).orders;
  const transactions = (input as Partial<TransactionsRecordInput>).transactions;

  const isValidOrders = orders && Array.isArray(orders);
  const isValidTransactions = transactions && Array.isArray(transactions);

  return !isValidOrders || !isValidTransactions;
};

export { TransactionsRecordInput, isValidTransactionsRecordInput };
