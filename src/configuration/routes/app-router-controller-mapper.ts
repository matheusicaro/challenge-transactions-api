import { RouteResolverCallback } from './app-router';
import { HealthController } from '../../application/controllers/health.controller';
import { getDependencyRegistryInstance } from '../dependency-registries/dependency-registry';
import { OrdersController } from '../../application/controllers/orders.controller';
import { PATHS } from './app-paths';

const dependencyRegistry = getDependencyRegistryInstance();
const healthController = dependencyRegistry.resolve(HealthController);
const ordersController = dependencyRegistry.resolve(OrdersController);

const routeControllersMap: Record<keyof typeof PATHS, RouteResolverCallback> = {
  HEALTH: (...args) => healthController.getHealth(args[0], args[1]),
  ORDERS_TRANSACTIONS_RECORD: (...args) => ordersController.matchCustomerOrdersTransactions(args[0], args[1])
};

export { routeControllersMap };
