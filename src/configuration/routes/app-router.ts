import { Router } from 'express';
import { ServerNextFunction, ServerRequest, ServerResponse } from 'matheusicaro-node-framework';

import { routeControllersMap as controllers } from './app-router-controller-mapper';
import { PATHS } from './app-paths';

export type RouteResolverCallback = (req: ServerRequest, res: ServerResponse, next: ServerNextFunction) => void;

const appRouter = Router();

appRouter.get(PATHS.HEALTH, controllers.HEALTH);
appRouter.post(PATHS.ORDERS_TRANSACTIONS_RECORD, controllers.ORDERS_TRANSACTIONS_RECORD);
/**
 * Add your routes here
 *
 * ...n
 */

export { appRouter };
