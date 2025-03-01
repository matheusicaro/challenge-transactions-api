// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { Environment } from './configuration/environment';
import { appRouter } from './configuration/routes/app-router';
import { Swagger } from './swagger.config';
import { middlewares } from './configuration/middlewares';

const corsOptions: cors.CorsOptions = {
  allowedHeaders: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: '*'
};

const app = express();

app.set('env', Environment.NODE_ENV);
app.set('port', Environment.PORT);

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('common'));

middlewares.forEach((middleware) => app.use(middleware));

app.use(Swagger.path, Swagger.server, Swagger.middleware);
app.use(Environment.API_BASE_PATH, appRouter);

export default app;
