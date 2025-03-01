import { RouteResolverCallback } from './app-router';
import { HealthController } from '../../application/controllers/health.controller';
import { getDependencyRegistryInstance } from '../dependency-registries/dependency-registry';

const dependencyRegistry = getDependencyRegistryInstance();
const healthController = dependencyRegistry.resolve(HealthController);

const routeControllersMap: Record<string, RouteResolverCallback> = {
  HEALTH: (...args) => healthController.getHealth(args[0], args[1])
};

export { routeControllersMap };
