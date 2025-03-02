enum TransactionType {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  REFUND = 'REFUND'
}

/**
 * Transaction as a domain entity
 */
type Transaction = {
  customerName: string;
  date: Date;
  type: TransactionType;
  orderId: string;
  amount: number;
};

export { Transaction, TransactionType };
