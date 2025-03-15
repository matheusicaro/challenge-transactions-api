/**
 * Transaction as a domain entity
 */
type Transaction = {
  customer: string;
  date: Date;
  originalDate: string;
  type: string; // it could be enum of TransactionType=[ REFUND, PAYMENT, etc.]
  item: string;
  orderId: string;
  price: number;
  amount: number;
  accuracy?: number;
};

export { Transaction };
