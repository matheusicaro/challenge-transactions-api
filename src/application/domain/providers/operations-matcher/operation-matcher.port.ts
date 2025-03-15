import { Transaction } from '../../entities/transaction.entity';
import { Order } from '../../entities/order.entity';

export interface VerifyMatchResponse {
  accuracy: number;
  match: boolean;
}

export interface OperationMatcherProviderPort {
  verifyMatch(order: Order, transaction: Transaction): VerifyMatchResponse;
}
