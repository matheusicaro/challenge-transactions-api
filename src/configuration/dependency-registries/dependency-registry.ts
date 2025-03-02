import 'reflect-metadata';
import { DependencyRegistry } from 'matheusicaro-node-framework';

import { registerProviders } from './providers-registries';

let dependencyRegistry: DependencyRegistry;

const getDependencyRegistryInstance = (): DependencyRegistry => {
  if (!dependencyRegistry) {
    dependencyRegistry = new DependencyRegistry([registerProviders]);
  }

  return dependencyRegistry;
};

export { getDependencyRegistryInstance, DependencyRegistry };
