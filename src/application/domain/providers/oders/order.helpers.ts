import { getPercentageInString } from '../../../lib/string';
import { MatchTransactionDTO } from '../../entities/dtos/match-transactions.dto';
import { OrderDTO, TransactionDTO } from '../../entities/dtos/transactions-record-Input.dto';
import { Order } from '../../entities/order.entity';
import { Transaction } from '../../entities/transaction.entity';

const buildOrderDTO = (order: Order): OrderDTO => {
  return {
    customer: order.customer,
    date: order.originalDate,
    orderId: order.id,
    price: order.item.price,
    item: order.item.name
  };
};

const buildTransactionDTO = (order: Order, transaction: Transaction): TransactionDTO => {
  return {
    customer: transaction.customer,
    date: transaction.originalDate,
    price: transaction.amount,
    item: transaction.item,
    orderId: transaction.orderId,
    txnType: transaction.type,
    txnAmount: transaction.amount,
    match: {
      orderId: order.id,
      accuracy: getPercentageInString(transaction.accuracy || 0)
    }
  };
};

export const buildMatchTransaction = (input: {
  orders: Order[];
  transactions: TransactionDTO[];
  unlinkedTransactions: Transaction[];
  unlinkedOrders: Order[];
}): MatchTransactionDTO => {
  return {
    matches: input.orders.map((order) => ({
      order: buildOrderDTO(order),
      txns: order.transactions.map((transaction) => buildTransactionDTO(order, transaction))
    })),

    nonMatches: {
      orders: input.unlinkedOrders.map(buildOrderDTO),
      txns: input.transactions.filter((dto) =>
        input.unlinkedTransactions.find(({ orderId }) => dto.orderId === orderId)
      )
    }
  };
};
