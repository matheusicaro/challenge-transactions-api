import { Request, Response } from 'express';
import { RestControllerBase, singleton } from 'matheusicaro-node-framework';

import { HealthResponse } from '../domain/entities/health.entity';

@singleton()
class HealthController extends RestControllerBase {

  public async getHealth(_req: Request, res: Response): Promise<Response<HealthResponse>> {
    try {
      return res.status(200).json(this.buildHealthResponse('ONLINE'));
    } catch (error) {
      return this.handleErrorThenRespondFailedOnRequest({
        error,
        response: res,
        responseData: this.buildHealthResponse('FAILED')
      });
    }
  }

  private buildHealthResponse(status: 'FAILED' | 'ONLINE') {
    return {
      status,
      time: new Date().toISOString()
    };
  }
}

export { HealthController };
