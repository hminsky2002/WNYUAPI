import express from 'express';
import { currentHandlers } from '../handlers';

const currentRouter = express.Router();

currentRouter.get('/', currentHandlers.getCurrent);

export { currentRouter };
