import { InvalidArgumentError } from 'matheusicaro-node-framework';

interface EnvironmentType {
  NODE_ENV?: string;
  PORT: number;

  API_HOST_NAME: string;
  API_BASE_PATH: string;
  API_DOCS_PATH: string;
}

const isProduction = process.env.NODE_ENV === 'production';

const getApiBasePath = () => {
  if (!process.env.API_BASE_PATH) {
    throw new InvalidArgumentError('env.API_BASE_PATH should de defined', {
      message: 'Set a value for API_BASE_PATH, for example: "api/v1"',
      logData: {
        isProduction
      }
    });
  }

  return process.env.API_BASE_PATH;
};

const Environment: EnvironmentType = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT || '4000'),

  API_HOST_NAME: process.env.API_HOST_NAME || '',
  API_BASE_PATH: getApiBasePath(),
  API_DOCS_PATH: process.env.API_BASE_PATH?.concat(process.env.API_DOCS_PATH || '') || ''
};

export { Environment, isProduction };
