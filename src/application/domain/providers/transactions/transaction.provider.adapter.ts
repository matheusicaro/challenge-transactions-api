import { InvalidArgumentError } from 'matheusicaro-node-framework';

import { TransactionsProviderPort } from './transaction.provider.port';
import { Transaction } from '../../entities/transaction.entity';
import { parseToDate } from '../../../lib/dates';
import { TransactionDTO } from '../../entities/dtos/transactions-record-Input.dto';

class TransactionsProviderAdapter implements TransactionsProviderPort {
  /**
   * Method that parse the TransactionsDTO to Transaction domain
   *
   * @arg {TransactionsDTO[]}:
   * @returns {Transaction[]}
   * @example
   */
  public getTransactionsFromDTOs(transactionsDto: TransactionDTO[]): Transaction[] {
    const transactions: Transaction[] = [];

    for (const dto of transactionsDto) {
      const transactionDate = parseToDate(dto.date);

      if (!transactionDate) {
        throw new InvalidArgumentError(`Transaction date is invalid`, {
          userMessage: `Transaction date is invalid to the oder id ${dto.orderId} and transaction amount ${dto.txnAmount}`
        });
      }

      transactions.push({
        item: dto.item,
        price: dto.price,
        customer: dto.customer,
        amount: dto.txnAmount,
        orderId: dto.orderId,
        date: transactionDate,
        originalDate: dto.date,
        type: dto.txnType
      });
    }

    return transactions;
  }
}

export { TransactionsProviderAdapter };
