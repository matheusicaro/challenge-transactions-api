import { Request, Response } from 'express';
import { RestControllerBase, singleton } from 'matheusicaro-node-framework';
import { CostumerOrderMatch } from '../domain/entities/costumer-order-match.entity';

@singleton()
class TransactionsController extends RestControllerBase {
  public async matchCustomerOrdersTransactions(_req: Request, res: Response): Promise<Response<CostumerOrderMatch>> {
    try {
      // TODO: call provider
      // TODO: return CostumerOrderMatch
      return res.status(200).json({});
    } catch (error) {
      return this.handleErrorThenRespondFailedOnRequest({
        error,
        response: res,
        responseData: {
          message: 'Something went wrong while processing customer orders and transactions'
        }
      });
    }
  }
}

export { TransactionsController };
