import { getSimilarityFromAlphanumericWords, getSimilarityOfWords } from '../../../lib/match';
import { Order } from '../../entities/order.entity';
import { Transaction } from '../../entities/transaction.entity';
import { OperationMatcherProviderPort, VerifyMatchResponse } from './operation-matcher.port';

class OperationMatcherProviderAdapter implements OperationMatcherProviderPort {
  private MAX_ACCURACY_VALUE = 1; // 100%
  private MIN_MATCH_ACCURACY = 0.6; // 60%
  private MIN_REASONABLE_MATCH_ACCURACY = 0.4; // 40%

  /**
   * Function to verify a match between order and transaction
   * @param order
   * @param transaction
   * @returns whether they match and the accuracy of reliability
   */
  public verifyMatch(order: Order, transaction: Transaction): VerifyMatchResponse {
    /**
     * 1. Check if order and transaction has the same order id
     */
    if (order.id === transaction.orderId) {
      return { match: true, accuracy: this.MAX_ACCURACY_VALUE };
    }

    /**
     * 2. Check if transaction was created before the oder.
     *    and return no match when is true.
     *
     * @matheusicaro: A transaction should never be created before an order? I think so
     */
    const isATransactionBeforeToTheOrder = transaction.date.getTime() < order.date.getTime();

    if (isATransactionBeforeToTheOrder) {
      return {
        match: false,
        accuracy: this.MAX_ACCURACY_VALUE
      };
    }

    /**
     * 3. Check if order id has a min value of similarity with the order id in transaction.
     *
     */
    const orderId = getSimilarityFromAlphanumericWords(order.id, transaction.orderId);

    if (orderId.similarity >= this.MIN_MATCH_ACCURACY) {
      return {
        match: true,
        accuracy: orderId.similarity
      };
    }

    /**
     * 4. Check if the customer name in the oder has a min value of similarity with the value in transaction.
     *
     */
    const customer = getSimilarityOfWords(order.customer, transaction.customer);

    if (customer.similarity >= this.MIN_MATCH_ACCURACY) {
      return {
        match: true,
        accuracy: customer.similarity
      };
    }

    /**
     * 5. Check if the customer name has a min of a reasonable value with the value in transaction.
     *    And if the oder data is the same as the transaction (should be reasonably close)
     *    And if the item price is the same in the oder and in the transaction
     */
    if (customer.similarity >= this.MIN_REASONABLE_MATCH_ACCURACY) {
      if (this.isSamePrice(order, transaction)) {
        return {
          match: true,
          accuracy: customer.similarity
        };
      }
    }

    return {
      match: false,
      accuracy: this.MAX_ACCURACY_VALUE
    };
  }

  private isSamePrice(order: Order, transaction: Transaction) {
    return Math.abs(order.item.price) === Math.abs(transaction.amount);
  }
}

export { OperationMatcherProviderAdapter };
