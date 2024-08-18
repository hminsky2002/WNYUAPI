import express from 'express';
import { personasHandlers } from '../handlers/personasHandlers';

const personasRouter = express.Router();

personasRouter.get('/', personasHandlers.getPersonas);
personasRouter.get('/:id', personasHandlers.getPersonaById);

export { personasRouter };
