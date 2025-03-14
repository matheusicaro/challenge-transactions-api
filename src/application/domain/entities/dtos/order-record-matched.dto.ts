/**
 * Transaction DTO received from API inputs
 */
export type OrderRecordMatchedDTO = {
  order: { customer: string; orderId: string; date: string; item: string; price: number };
  transactions: Array<{
    customer: string;
    orderId: string;
    date: string;
    item: string;
    price: number;
    txnType: string;
    txnAmount: string;

    // define in percentage the accuracy of the transaction to the oder
    accuracy: string;
  }>;
};
