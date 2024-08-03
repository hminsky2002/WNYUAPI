import { currentPlaylistStore } from '../stores';
import type { NextFunction, Request, Response } from 'express';

const getCurrentPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(currentPlaylistStore.getData());
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
    const searchParams = new URLSearchParams(
      req.query as unknown as string,
    ).toString();
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
