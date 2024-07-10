import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { rootRouter } from './routers';
import { getLogger } from './logger';

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
app.use('/', rootRouter);

export { app };
