import { TransactionsRecordInput } from '../../entities/dtos/transactions-record-Input.dto';
import { CostumerOrderMatch } from '../../entities/costumer-order-match.entity';

export interface OrdersProviderPort {
  getOrdersMatchedWithTransactions(input: TransactionsRecordInput): CostumerOrderMatch[];
}
