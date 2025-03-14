import { InvalidArgumentError } from 'matheusicaro-node-framework';

import { CustomerTransactions, TransactionsProviderPort } from './transaction.provider.port';
import { Transaction, TransactionType } from '../../entities/transaction.entity';
import { parseToDate } from '../../../lib/dates';
import { TransactionsDTO } from '../../entities/dtos/transactions-record-Input.dto';

class TransactionsProviderAdapter implements TransactionsProviderPort {
  /**
   * Method that returns a list of transactions by costumer name
   *
   * @arg {Transaction}: list of transactions
   * @returns {CustomerTransactions}
   * @example
   * ```
   *  getCustomerTransactions([ transaction_1, transaction_2, ...n ])
   *  returns [
   *      { customerName: x, transactions: [ transaction_1 ] },
   *      { customerName: y, transactions: [ transaction_2, ..n ] } ]
   * ```
   */
  public getCustomerTransactions(transactions: Transaction[]): CustomerTransactions {
    const customersTransactions: CustomerTransactions = [];

    for (const transaction of transactions) {
      const foundCustomer = customersTransactions.find((item) => item.customerName === transaction.customerName);

      if (foundCustomer) {
        foundCustomer.transactions.push(transaction);
      } else {
        customersTransactions.push({
          customerName: transaction.customerName,
          transactions: [transaction]
        });
      }
    }

    return customersTransactions;
  }

  /**
   * Method that parse the TransactionsDTO to Transaction domain
   *
   * @arg {TransactionsDTO[]}:
   * @returns {Transaction[]}
   * @example
   */
  public getTransactionsFromDTOs(transactionsDto: TransactionsDTO[]): Transaction[] {
    const transactions: Transaction[] = [];

    for (const dto of transactionsDto) {
      const transactionDate = parseToDate(dto.transactionDate);

      if (!transactionDate) {
        throw new InvalidArgumentError(`Transaction date is invalid`, {
          userMessage: `Transaction date is invalid to the oder id ${dto.orderId} and transaction amount ${dto.transactionAmount}`
        });
      }

      const type = this.parseTransactionType(dto.transactionType);

      if (!type) {
        throw new InvalidArgumentError(`Transaction type is invalid`, {
          userMessage: `Transaction type received should contains payment or refund: ${dto.transactionType}`
        });
      }

      transactions.push({
        customerName: dto.customerName,
        amount: dto.transactionAmount,
        orderId: dto.orderId,
        date: transactionDate,
        type
      });
    }

    return transactions;
  }

  private parseTransactionType(type: string): TransactionType | undefined {
    if (type.includes('payment')) {
      return TransactionType.PAYMENT_RECEIVED;
    }

    if (type.includes('refund')) {
      return TransactionType.REFUND;
    }
  }
}

export { TransactionsProviderAdapter };
