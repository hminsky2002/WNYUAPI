import express from 'express';
import { personasHandlers } from '../handlers/personasHandlers';

const personasRouter = express.Router();

personasRouter.use('/', personasHandlers.getPersonas);
personasRouter.get('/:id', personasHandlers.getPersonaById);

export { personasRouter };
