import express from 'express';
import { playlistsHandlers } from '../handlers/playlistsHandlers';

const playlistsRouter = express.Router();

playlistsRouter.get('/', playlistsHandlers.getPlaylists);
playlistsRouter.get('/:id', playlistsHandlers.getPlaylistById);

export { playlistsRouter };
