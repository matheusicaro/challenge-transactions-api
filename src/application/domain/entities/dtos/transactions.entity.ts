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

export { TransactionsDTO };
