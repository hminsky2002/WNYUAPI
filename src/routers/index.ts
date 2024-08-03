import express from 'express';
import { personasRouter } from './personasRouter';
import { showsRouter } from './showsRouter';
import { playlistsRouter } from './playlistsRouter';
import { spinsRouter } from './spinsRouter';
import { metadataRouter } from './metadataRouter';
import { healthCheckRouter } from './healthCheckRouter';
import { currentRouter } from './currentRouter';

const rootRouter = express.Router();

rootRouter.use('/personas', personasRouter);
rootRouter.use('/shows', showsRouter);
rootRouter.use('/playlists', playlistsRouter);
rootRouter.use('/spins', spinsRouter);
rootRouter.use('/metadata', metadataRouter);
rootRouter.use('/current', currentRouter);
rootRouter.use('/', healthCheckRouter);

export { rootRouter };
