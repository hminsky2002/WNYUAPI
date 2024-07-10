import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { rootRouter } from './routers';
import { getLogger } from './logger';
import { errorHandler } from './middleware';

const logger = getLogger(__filename);

const app = express();
app.use(cors());
app.use(
  pinoHttp({
    logger,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
app.use('/', rootRouter);

export { app };
