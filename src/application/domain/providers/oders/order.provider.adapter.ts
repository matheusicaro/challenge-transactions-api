import { inject, InvalidArgumentError } from 'matheusicaro-node-framework';

import { OrdersProviderPort } from './order.provider.port';
import { TransactionsProviderPort } from '../transactions/transaction.provider.port';

import { ProviderTokens } from '../../../../configuration/dependency-registries/tokens';
import { getDataFormatted, parseToDate } from '../../../lib/dates';

import { CostumerOrderMatch } from '../../entities/costumer-order-match.entity';
import { OrderDTO, TransactionsRecordInput } from '../../entities/dtos/transactions-record-Input.dto';
import { Order } from '../../entities/order.entity';
import { Transaction } from '../../entities/transaction.entity';

class OrdersProviderAdapter implements OrdersProviderPort {
  constructor(
    @inject(ProviderTokens.TransactionsProvider)
    private transactionsProvider: TransactionsProviderPort,
    @inject(ProviderTokens.TransactionsProvider)
    private transactionsProvider: TransactionsProviderPort
  ) {}

  public getOrdersMatchedWithTransactions(input: TransactionsRecordInput): CostumerOrderMatch[] {
    const orders = this.getOrdersFromDTOs(input.orders);
    const transactions = this.transactionsProvider.getTransactionsFromDTOs(input.transactions);
    const customerTransactions = this.transactionsProvider.getCustomerTransactions(transactions);

    const costumerOrderMatchList: CostumerOrderMatch[] = [];

    for (const order of orders) {

      
      const oderTransactions = customerTransactions.find((item) => item.customerName === orderDto.customerName);

      const order = this.buildOrder(orderDto, oderTransactions?.transactions || []);

      const costumerOrder = {
        id: order.id,
        type: order.type,
        date: getDataFormatted(order.date),
        product: order.product,
        transactions: order.transactions.map(({ amount, date, orderId, type }) => ({
          amount,
          date: getDataFormatted(date),
          orderId,
          type
        }))
      };

      const foundCostumerOrderMatch = costumerOrderMatchList.find((item) => item.customerName === order.customerName);

      if (foundCostumerOrderMatch) {
        foundCostumerOrderMatch.orders.push(costumerOrder);
      } else {
        costumerOrderMatchList.push({ customerName: order.customerName, orders: [costumerOrder] });
      }
    }

    return costumerOrderMatchList;
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
      type: dto.type,
      date,
      customerName: dto.customerName,
      transactions: transactions,
      product: {
        name: dto.product,
        price: dto.price
      }
    };
  }
}

export { OrdersProviderAdapter };
