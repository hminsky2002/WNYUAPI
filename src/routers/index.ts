import express from 'express';
import { personasRouter } from './personasRouter';

const rootRouter = express.Router();

rootRouter.use('/personas', personasRouter);

export { rootRouter };
