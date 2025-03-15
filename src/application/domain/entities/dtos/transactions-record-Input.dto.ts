/**
 * Order DTO received from API inputs
 */
export type OrderDTO = {
  orderId: string;
  customer: string;
  date: string;
  price: number;
  item: string;
};

/**
 * Transaction DTO received from API inputs
 */
export type TransactionDTO = {
  customer: string;
  date: string;
  orderId: string;
  price: number;
  item: string;
  txnType: string;
  txnAmount: number;
  match?: {
    orderId: string;
    accuracy: string;
  };
};

type TransactionsRecordInput = {
  orders: OrderDTO[];
  transactions: TransactionDTO[];
};

const isValidTransactionsRecordInput = (input: unknown): boolean => {
  const orders = (input as Partial<TransactionsRecordInput>).orders;
  const transactions = (input as Partial<TransactionsRecordInput>).transactions;

  const isValidOrders = orders && Array.isArray(orders);
  const isValidTransactions = transactions && Array.isArray(transactions);

  return !isValidOrders || !isValidTransactions;
};

export { TransactionsRecordInput, isValidTransactionsRecordInput };
