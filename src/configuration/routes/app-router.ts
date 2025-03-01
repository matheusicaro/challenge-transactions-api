import { Router } from 'express';
import { ServerNextFunction, ServerRequest, ServerResponse } from 'matheusicaro-node-framework';

import { routeControllersMap as controllers } from './app-router-controller-mapper';

export type RouteResolverCallback = (req: ServerRequest, res: ServerResponse, next: ServerNextFunction) => void;

const appRouter = Router();

appRouter.get('/health', controllers.HEALTH);
/**
 * Add your routes here
 *
 * ...n
 */

export { appRouter };
