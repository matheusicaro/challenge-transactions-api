import { TransactionsDTO } from '../../entities/dtos/transactions-record-Input.dto';
import { Transaction } from '../../entities/transaction.entity';

export type CustomerTransactions = Array<{ customerName: string; transactions: Transaction[] }>;

export interface TransactionsProviderPort {
  getTransactions(dto: TransactionsDTO[]): Transaction[];

  getCustomerTransactions(transactions: Transaction[]): CustomerTransactions;
}
