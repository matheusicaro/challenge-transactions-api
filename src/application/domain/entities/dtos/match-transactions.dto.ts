import { OrderDTO, TransactionDTO } from './transactions-record-Input.dto';

interface TransactionsDTOOverride extends TransactionDTO {
  // accuracy in percent with reliability of the match between the relationship of a transaction and an order.
  match?: {
    orderId: string;
    accuracy: string;
  };
}

/**
 * Matched is the model described in the challenge:
 *  - issue #6, https://github.com/matheusicaro/challenge-transactions-api/issues/6#issue-2889302144
 */
type Matched = {
  order: OrderDTO;
  txns: TransactionsDTOOverride[];
};

type MatchTransactionDTO = {
  matches: Matched[];
  nonMatches: {
    orders: OrderDTO[];
    txns: TransactionDTO[];
  };
};

export { MatchTransactionDTO };
