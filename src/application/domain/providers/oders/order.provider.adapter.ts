import { inject, InvalidArgumentError } from 'matheusicaro-node-framework';

import { OrdersProviderPort } from './order.provider.port';
import { TransactionsProviderPort } from '../transactions/transaction.provider.port';

import { ProviderTokens } from '../../../../configuration/dependency-registries/tokens';
import { parseToDate } from '../../../lib/dates';

import { MatchTransactionDTO } from '../../entities/dtos/match-transactions.dto';
import { OrderDTO, TransactionsRecordInput } from '../../entities/dtos/transactions-record-Input.dto';
import { Order } from '../../entities/order.entity';
import { Transaction } from '../../entities/transaction.entity';
import { OperationMatcherProviderPort } from '../operations-matcher/operation-matcher.port';
import { buildMatchTransaction } from './order.helpers';

class OrdersProviderAdapter implements OrdersProviderPort {
  constructor(
    @inject(ProviderTokens.TransactionsProvider)
    private transactionsProvider: TransactionsProviderPort,
    @inject(ProviderTokens.TransactionsProvider)
    private operationMatcherProvider: OperationMatcherProviderPort
  ) {}

  public getOrdersMatchedWithTransactions(input: TransactionsRecordInput): MatchTransactionDTO {
    const orders = this.getOrdersFromDTOs(input.orders);
    const transactions = this.transactionsProvider.getTransactionsFromDTOs(input.transactions);

    const linkedTransactionsOrderId: string[] = [];
    const unLinkedTransactionsOrderId: string[] = [];

    const unlinkedOrders: Order[] = [];

    for (const order of orders) {
      for (const transaction of transactions) {
        const result = this.operationMatcherProvider.verifyMatch(order, transaction);

        if (result.match) {
          order.transactions.push({ ...transaction, accuracy: result.accuracy });
          linkedTransactionsOrderId.push(transaction.orderId);
        } else {
          unLinkedTransactionsOrderId.push(transaction.orderId);
        }
      }

      if (order.transactions.length === 0) {
        unlinkedOrders.push(order);
      }
    }

    /**
     *
     * TODO: store the orders and unlinked transactions?
     *  - database, or dataflow, .etc
     *
     */

    const matchTransactionResponse = buildMatchTransaction({
      orders,
      transactions: input.transactions,
      unlinkedTransactions: this.getUnlinkedTransactions({
        unLinkedTransactionsOrderId,
        linkedTransactionsOrderId,
        transactions
      }),
      unlinkedOrders
    });

    return matchTransactionResponse;
  }

  private getUnlinkedTransactions(input: {
    unLinkedTransactionsOrderId: string[];
    linkedTransactionsOrderId: string[];
    transactions: Transaction[];
  }): Transaction[] {
    const uniqueLinkedTransactions = input.unLinkedTransactionsOrderId.filter(
      (id) => !input.linkedTransactionsOrderId.includes(id)
    );
    return input.transactions.filter(({ orderId }) => uniqueLinkedTransactions.includes(orderId));
  }

  private getOrdersFromDTOs(oderDtoList: OrderDTO[]): Order[] {
    return oderDtoList.map((dto) => this.buildOrders(dto, []));
  }

  private buildOrders(dto: OrderDTO, transactions: Transaction[]): Order {
    const date = parseToDate(dto.date);

    if (!date) {
      throw new InvalidArgumentError(`Order date is invalid`, {
        userMessage: `Order date is invalid to the oder ${dto.orderId}`
      });
    }

    return {
      id: dto.orderId,
      date,
      originalDate: dto.date,
      customer: dto.customer,
      transactions: transactions,
      item: {
        name: dto.item,
        price: dto.price
      }
    };
  }
}

export { OrdersProviderAdapter };
