import express from 'express';
import { personasRouter } from './personasRouter';
import { showsRouter } from './showsRouter';
import { playlistsRouter } from './playlistsRouter';
import { spinsRouter } from './spinsRouter';
import { healthCheckRouter } from './healthCheckRouter';

const rootRouter = express.Router();

rootRouter.use('/personas', personasRouter);
rootRouter.use('/shows', showsRouter);
rootRouter.use('/playlists', playlistsRouter);
rootRouter.use('/spins', spinsRouter);
rootRouter.use('/', healthCheckRouter);
export { rootRouter };
