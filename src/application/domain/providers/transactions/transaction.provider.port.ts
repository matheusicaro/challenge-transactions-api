import { TransactionDTO } from '../../entities/dtos/transactions-record-Input.dto';
import { Transaction } from '../../entities/transaction.entity';

export interface TransactionsProviderPort {
  getTransactionsFromDTOs(dto: TransactionDTO[]): Transaction[];
}
