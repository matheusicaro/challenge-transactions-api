import { TransactionFactory } from '../../../../factories/transactions.factory';
import { OperationMatcherProviderAdapter } from '../../../../../src/application/domain/providers/operations-matcher/operation-matcher.provider';
import { OrderFactory } from '../../../../factories/order.factory';
import * as MatchModule from '../../../../../src/application/lib/match';
import { faker } from '@faker-js/faker';

describe('OperationMatcherProviderAdapter', () => {
  let provider: OperationMatcherProviderAdapter;

  const stubGetSimilarityFromAlphanumericWords = jest.spyOn(MatchModule, 'getSimilarityFromAlphanumericWords');
  const getSimilarityOfWords = jest.spyOn(MatchModule, 'getSimilarityOfWords');

  const MAX_ACCURACY_VALUE = 1; // 100%
  const MIN_MATCH_ACCURACY = 0.7; // 70%
  const MIN_REASONABLE_MATCH_ACCURACY = 0.4; // 40%

  beforeAll(async () => {
    provider = new OperationMatcherProviderAdapter();
  });

  describe('when order and transaction matches', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
    });

    it('should return a match with max accuracy when the order id are the same', async () => {
      const order = OrderFactory.build();
      const transaction = TransactionFactory.build({ orderId: order.id });

      const result = provider.verifyMatch(order, transaction);

      expect(result).toEqual({ match: true, accuracy: MAX_ACCURACY_VALUE });
    });

    it('should return a match when the order id has similarity at least equal than min required', async () => {
      const order = OrderFactory.build();
      const transaction = TransactionFactory.build({ date: new Date() });

      stubGetSimilarityFromAlphanumericWords.mockReturnValueOnce({ similarity: MIN_MATCH_ACCURACY });

      const result = provider.verifyMatch(order, transaction);

      expect(result).toEqual({ match: true, accuracy: MIN_MATCH_ACCURACY });
      expect(stubGetSimilarityFromAlphanumericWords).toHaveBeenCalledWith(order.id, transaction.orderId);
    });

    it('should return a match when the customer name has similarity at least equal than min required', async () => {
      const order = OrderFactory.build();
      const transaction = TransactionFactory.build({ date: new Date() });

      stubGetSimilarityFromAlphanumericWords.mockReturnValueOnce({ similarity: 0 });
      getSimilarityOfWords.mockReturnValueOnce({ similarity: MIN_MATCH_ACCURACY });

      const result = provider.verifyMatch(order, transaction);

      expect(result).toEqual({ match: true, accuracy: MIN_MATCH_ACCURACY });
      expect(getSimilarityOfWords).toHaveBeenCalledWith(order.customer, transaction.customer);
    });

    describe('when the customer name has reasonable similarity', () => {
      describe('when order date and item price are the same in the transaction', () => {
        it('should return a match and customer name similarity', async () => {
          const order = OrderFactory.build();
          const transaction = TransactionFactory.build({ amount: order.item.price, date: order.date });

          stubGetSimilarityFromAlphanumericWords.mockReturnValueOnce({ similarity: 0 });
          getSimilarityOfWords.mockReturnValueOnce({ similarity: MIN_REASONABLE_MATCH_ACCURACY });

          const result = provider.verifyMatch(order, transaction);

          expect(result).toEqual({ match: true, accuracy: MIN_REASONABLE_MATCH_ACCURACY });
          expect(getSimilarityOfWords).toHaveBeenCalledWith(order.customer, transaction.customer);
        });
      });
    });
  });
  describe('when order and transaction does not matches', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
    });

    it('should not return match when the transactions was created before the order', async () => {
      const order = OrderFactory.build({ date: new Date() });
      const transaction = TransactionFactory.build({ date: faker.date.past() });

      const result = provider.verifyMatch(order, transaction);

      expect(result).toEqual({ match: false, accuracy: MAX_ACCURACY_VALUE });
    });

    describe('when order id and costumer name does not match', () => {
      const order = OrderFactory.build({ id: 'some' });
      const transaction = TransactionFactory.build({ orderId: 'thing' });

      beforeEach(async () => {
        stubGetSimilarityFromAlphanumericWords.mockReturnValue({ similarity: 0 });
        getSimilarityOfWords.mockReturnValue({ similarity: 0 });
      });

      it('should not return match', async () => {
        const result = provider.verifyMatch(order, transaction);

        expect(result).toEqual({ match: false, accuracy: MAX_ACCURACY_VALUE });
      });
    });
  });
});
