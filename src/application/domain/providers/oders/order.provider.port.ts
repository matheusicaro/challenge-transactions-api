import { MatchTransactionDTO } from '../../entities/dtos/match-transactions.dto';
import { TransactionsRecordInput } from '../../entities/dtos/transactions-record-Input.dto';

export interface OrdersProviderPort {
  getOrdersMatchedWithTransactions(input: TransactionsRecordInput): MatchTransactionDTO;
}
