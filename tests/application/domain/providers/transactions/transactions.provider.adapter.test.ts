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
import * as OrderHelpers from '../../../../../src/application/domain/providers/oders/order.helpers';
import { MatchTransactionDTOFactory } from '../../../../factories/match-transaction.dto.factory';

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

    const transactionDto = TransactionDTOFactory.build({
      customer
    });

    const transaction = TransactionFactory.build({
      customer,
      date: new Date(transactionDto.date)
    });

    const matchTransactionDTO = MatchTransactionDTOFactory.build();

    beforeEach(() => {
      stubTransactionsProvider.getTransactionsFromDTOs.mockReturnValueOnce([transaction]);
      jest.spyOn(OrderHelpers, 'buildMatchTransaction').mockReturnValue(matchTransactionDTO);
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
