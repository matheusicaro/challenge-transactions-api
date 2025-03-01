import 'reflect-metadata';

import { DependencyInjectionTokens, LoggerPort } from 'matheusicaro-node-framework';
import app from './app';
import { getDependencyRegistryInstance } from './configuration/dependency-registries/dependency-registry';
import { Environment, isProduction } from './configuration/environment';

app.listen(app.get('port'), () => {
  const getMessage = (host: string) => `
    --------
    Server started on..: ${host}
    Api docs..: ${host}${Environment.API_DOCS_PATH}
    Env..: ${app.get('env')}
    --------
  `;

  if (isProduction) {
    const logger = getDependencyRegistryInstance().resolve<LoggerPort>(DependencyInjectionTokens.Logger);

    logger.info(getMessage(app.get('host')));
  } else {
    console.log(getMessage(`http://localhost:${app.get('port')}`));
  }
});
