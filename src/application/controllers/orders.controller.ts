import { Request, Response } from 'express';
import { inject, RestControllerBase, singleton, InvalidRequestError } from 'matheusicaro-node-framework';

import { CostumerOrderMatch } from '../domain/entities/costumer-order-match.entity';
import { ProviderTokens } from '../../configuration/dependency-registries/tokens';
import { OrdersProviderPort } from '../domain/providers/oders/order.provider.port';
import {
  isValidTransactionsRecordInput,
  TransactionsRecordInput
} from '../domain/entities/dtos/transactions-record-Input.dto';

@singleton()
class OrdersController extends RestControllerBase {
  constructor(
    @inject(ProviderTokens.OrdersProvider)
    private ordersProvider: OrdersProviderPort
  ) {
    super();
  }

  public async matchCustomerOrdersTransactions(req: Request, res: Response): Promise<Response<CostumerOrderMatch>> {
    try {
      const input = req.body as TransactionsRecordInput;

      if (isValidTransactionsRecordInput(input)) {
        throw new InvalidRequestError('The input is not valid', {
          userMessage: 'Please confirm if the orders and transactions fields are valid',
          logData: { input }
        });
      }

      const result = this.ordersProvider.getOrdersMatchedWithTransactions(input);

      return res.status(200).json(result);
    } catch (error) {
      return this.handleErrorThenRespondFailedOnRequest({
        error,
        response: res,
        setStatusCodeByErrorType: true
      });
    }
  }
}

export { OrdersController };
