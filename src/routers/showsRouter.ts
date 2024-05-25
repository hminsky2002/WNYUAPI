import express from 'express';
import { showsHandlers } from '../handlers/showsHandlers';

const showsRouter = express.Router();

showsRouter.get('/', showsHandlers.getShows);
showsRouter.get('/:id', showsHandlers.getShowById);

export { showsRouter };
