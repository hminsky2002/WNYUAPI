import { PlaylistsResponse } from '@wnyu/spinitron-sdk';
import type { NextFunction, Request, Response } from 'express';
import { getLogger } from '../logger';
const logger = getLogger(__filename);

// Cache variable to store the current playlist
let currentPlaylist: PlaylistsResponse | undefined = undefined;

const UPCOMING_CACHE_DURATION = 5 * 60 * 1000;

async function fetchCurrentPlaylist() {
  try {
    const searchParams = new URLSearchParams({
      count: '1',
    }).toString();
    const url = `${process.env.SPINITRON_API_URL}/playlists?${searchParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const playlistData = (await response.json()) as PlaylistsResponse;
    currentPlaylist = playlistData;
    logger.info(`Playlist updated at ${Date.now()}`);
  } catch (error) {
    logger.error(error);
  }
}

setInterval(fetchCurrentPlaylist, UPCOMING_CACHE_DURATION);

fetchCurrentPlaylist();

const getCurrentPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(currentPlaylist);
  } catch (error) {
    next(error);
  }
};

const getPlaylists = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const baseUrl = `${process.env.SPINITRON_API_URL}/playlists`;
    const searchParams = new URLSearchParams(req.query as any).toString();
    const url = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;

    const data = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const output = await data.json();
    res.send(output);
  } catch (error) {
    next(error);
  }
};

const getPlaylistById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await fetch(
      `${process.env.SPINITRON_API_URL}/playlists/${req.params.id}`,
      {
        headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
      },
    );
    const output = await data.json();
    res.send(output);
  } catch (error) {
    next(error);
  }
};

export const playlistsHandlers = {
  getPlaylists,
  getPlaylistById,
  getCurrentPlaylist,
};

export { currentPlaylist };
