import { Request, Response, NextFunction } from 'express';
import { Environment } from '../environment';

const healthCheckMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const isRequestToRootPath = request.path === '/';

  if (isRequestToRootPath) {
    return response.redirect(`${Environment.API_BASE_PATH}/health`);
  }

  return next();
};

export { healthCheckMiddleware };
