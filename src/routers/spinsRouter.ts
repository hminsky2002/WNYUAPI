import express from 'express';
import { spinsHandlers } from '../handlers/spinsHandlers';

const spinsRouter = express.Router();

spinsRouter.get('/', spinsHandlers.getSpins);
spinsRouter.get('/:id', spinsHandlers.getSpinById);

export { spinsRouter };
