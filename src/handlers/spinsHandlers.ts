import type { NextFunction, Request, Response } from 'express';
import { currentPlaylist } from './playlistsHandlers';
import { getLogger } from '../logger';
import { SpinsResponse } from '@wnyu/spinitron-sdk';
const logger = getLogger(__filename);

let currentSpins: SpinsResponse | undefined;

const UPCOMING_CACHE_DURATION = 3 * 60 * 1000;

async function fetchCurrentSpins() {
  try {
    const url = `${process.env.SPINITRON_API_URL}/spins?${`playlist_id=${currentPlaylist?.items[0]?.id}&count=50` ?? ''}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const spinsData = (await response.json()) as SpinsResponse;
    currentSpins = spinsData;
    logger.info(`Spins updated at ${Date.now()}`);
  } catch (error) {
    logger.error(error);
  }
}

setInterval(fetchCurrentSpins, UPCOMING_CACHE_DURATION);

fetchCurrentSpins();

const getCurrentSpins = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(currentSpins);
  } catch (error) {
    next(error);
  }
};

const getSpins = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const baseUrl = `${process.env.SPINITRON_API_URL}/spins`;
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

const getSpinById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await fetch(
      `${process.env.SPINITRON_API_URL}/spins/${req.params.id}`,
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

export const spinsHandlers = {
  getSpins,
  getSpinById,
  getCurrentSpins,
};

export { currentSpins };
