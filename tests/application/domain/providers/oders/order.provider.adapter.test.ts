import { InvalidArgumentError, jestStub } from 'matheusicaro-node-framework';

import { getDependencyRegistryInstance } from '../../../../../src/configuration/dependency-registries/dependency-registry';
import { ProviderTokens } from '../../../../../src/configuration/dependency-registries/tokens';
import { TransactionsProviderPort } from '../../../../../src/application/domain/providers/transactions/transaction.provider.port';
import {
  OrderDTOFactoryTypeFactory,
  TransactionsDTOFactory
} from '../../../../factories/transactions-record-input.factory';
import { TransactionFactory } from '../../../../factories/transactions.factory';
import { OrdersProviderAdapter } from '../../../../../src/application/domain/providers/oders/order.provider.adapter';

describe('OrdersProviderAdapter', () => {
  let provider: OrdersProviderAdapter;

  const dependencyRegistry = getDependencyRegistryInstance();

  const stubTransactionsProvider = jestStub<TransactionsProviderPort>();

  beforeEach(async () => {
    dependencyRegistry.container.register(ProviderTokens.OrdersProvider, {
      useValue: stubTransactionsProvider
    });

    provider = new OrdersProviderAdapter(stubTransactionsProvider);
  });

  describe('getOrdersMatchedWithTransactions', () => {
    const customerName = 'matheus';

    const orderDto = OrderDTOFactoryTypeFactory.build({ customerName });
    const transactionDto = TransactionsDTOFactory.build({
      customerName
    });
    const transaction = TransactionFactory.build({
      customerName,
      date: new Date(transactionDto.date)
    });

    beforeEach(() => {
      stubTransactionsProvider.getTransactions.mockReturnValueOnce([transaction]);
      stubTransactionsProvider.getCustomerTransactions.mockReturnValueOnce([
        { customerName, transactions: [transaction] }
      ]);
    });

    it('should return CostumerOrderMatch correctly', async () => {
      const result = provider.getOrdersMatchedWithTransactions({
        orders: [orderDto],
        transactions: [transactionDto]
      });

      expect(result).toEqual([
        {
          customerName: 'matheus',
          orders: [
            {
              date: orderDto.date,
              id: orderDto.orderId,
              type: orderDto.type,
              product: { name: orderDto.product, price: orderDto.price },
              transactions: [
                {
                  amount: transaction.amount,
                  date: transactionDto.date,
                  orderId: transaction.orderId,
                  type: transaction.type
                }
              ]
            }
          ]
        }
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
