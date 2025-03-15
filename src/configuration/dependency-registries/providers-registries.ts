import { RegistryScope } from 'matheusicaro-node-framework';
import { OrdersProviderAdapter } from '../../application/domain/providers/oders/order.provider.adapter';
import { DependencyRegistry } from './dependency-registry';
import { TransactionsProviderAdapter } from '../../application/domain/providers/transactions/transaction.provider.adapter';
import { ProviderTokens } from './tokens';
import { OperationMatcherProviderAdapter } from '../../application/domain/providers/operations-matcher/operation-matcher.provider';

function registerProviders(this: DependencyRegistry): void {
  /**
   *  registering providers
   */
  this.register(
    RegistryScope.TRANSIENT_NON_SINGLETON,
    ProviderTokens.TransactionsProvider,
    new TransactionsProviderAdapter()
  );

  this.register(
    RegistryScope.TRANSIENT_NON_SINGLETON,
    ProviderTokens.OperationMatcherProvider,
    new OperationMatcherProviderAdapter()
  );

  this.register(
    RegistryScope.TRANSIENT_NON_SINGLETON,
    ProviderTokens.OrdersProvider,
    new OrdersProviderAdapter(
      this.resolve(ProviderTokens.TransactionsProvider),
      this.resolve(ProviderTokens.OperationMatcherProvider)
    )
  );
}

export { registerProviders };
