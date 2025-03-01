import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import { Environment } from './configuration/environment';

const options = {
  /**
   * Add a green background to the response which highlight it
   */
  customCss: `.swagger-ui .live-responses-table {
    background: #e9ff006b;
    border: 10px solid #55c7164a;
  }`
};

export const Swagger = {
  path: Environment.API_DOCS_PATH,
  server: swaggerUI.serve,
  middleware: swaggerUI.setup({ ...swaggerDocs, basePath: Environment.API_BASE_PATH }, options)
};
