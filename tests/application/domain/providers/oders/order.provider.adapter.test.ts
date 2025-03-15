import { InvalidArgumentError, jestStub } from 'matheusicaro-node-framework';

import { getDependencyRegistryInstance } from '../../../../../src/configuration/dependency-registries/dependency-registry';
import { ProviderTokens } from '../../../../../src/configuration/dependency-registries/tokens';
import { TransactionsProviderPort } from '../../../../../src/application/domain/providers/transactions/transaction.provider.port';
import {
  OrderDTOFactoryTypeFactory,
  TransactionDTOFactory
} from '../../../../factories/transactions-record-input.factory';
import { TransactionFactory } from '../../../../factories/transactions.factory';
import { OrdersProviderAdapter } from '../../../../../src/application/domain/providers/oders/order.provider.adapter';
import { OperationMatcherProviderPort } from '../../../../../src/application/domain/providers/operations-matcher/operation-matcher.port';

describe('OrdersProviderAdapter', () => {
  let provider: OrdersProviderAdapter;

  const dependencyRegistry = getDependencyRegistryInstance();

  const stubTransactionsProvider = jestStub<TransactionsProviderPort>();
  const stubOperationMatcherProvider = jestStub<OperationMatcherProviderPort>();

  beforeEach(async () => {
    dependencyRegistry.container.register(ProviderTokens.OrdersProvider, {
      useValue: stubTransactionsProvider
    });

    provider = new OrdersProviderAdapter(stubTransactionsProvider, stubOperationMatcherProvider);
  });

  describe('getOrdersMatchedWithTransactions', () => {
    const customer = 'matheus';

    const orderDto = OrderDTOFactoryTypeFactory.build({ customer });
    const transactionDto = TransactionDTOFactory.build({
      customer
    });
    const transaction = TransactionFactory.build({
      customer,
      date: new Date(transactionDto.date)
    });

    beforeEach(() => {
      stubTransactionsProvider.getTransactionsFromDTOs.mockReturnValueOnce([transaction]);
      stubOperationMatcherProvider.verifyMatch.mockReturnValueOnce({ match: true, accuracy: 1 });
    });

    it('should return CostumerOrderMatch correctly', async () => {
      const result = provider.getOrdersMatchedWithTransactions({
        orders: [orderDto],
        transactions: [transactionDto]
      });

      expect(result.nonMatches).toEqual({ orders: [], txns: [] });
      expect(result.matches[0].order).toEqual({
        customer: orderDto.customer,
        orderId: orderDto.orderId,
        date: orderDto.date,
        item: orderDto.item,
        price: orderDto.price
      });
      expect(result.matches[0].txns).toEqual([
        expect.objectContaining({
          customer: transaction.customer,
          orderId: transaction.orderId,
          date: transaction.originalDate,
          item: transaction.item,
          txnType: transaction.type,
          txnAmount: transaction.amount,
          match: { accuracy: '100%', orderId: orderDto.orderId }
        })
      ]);
    });

    it('should throw error when order date is invalid', async () => {
      const orderWithInvalidDate = OrderDTOFactoryTypeFactory.build({ date: 'none' });

      const getOrdersMatchedWithTransactions = () =>
        provider.getOrdersMatchedWithTransactions({
          orders: [orderWithInvalidDate],
          transactions: [transactionDto]
        });

      expect(getOrdersMatchedWithTransactions).toThrow(
        new InvalidArgumentError(`Order date is invalid`, {
          userMessage: `Order date is invalid to the oder ${orderWithInvalidDate.orderId}`
        })
      );
    });
  });
});
