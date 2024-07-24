import type { NextFunction, Request, Response } from 'express';
import type { Show, ShowsResponse } from '@wnyu/spinitron-sdk';
import { getLogger } from '../logger';

const logger = getLogger(__filename);

// Cache variable to store the upcoming shows for the next day
let upcoming: ShowsResponse | undefined = undefined;

const UPCOMING_CACHE_DURATION = 30*60*1000; 

async function fetchUpcoming() {
  try {
    const start = new Date().toISOString();
    const end = new Date(
      new Date().setDate(new Date().getDate() + 1),
    ).toISOString();
    const searchParams = new URLSearchParams({
      start,
      end,
    }).toString();
    const url = `${process.env.SPINITRON_API_URL}/shows?${searchParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const showData = (await response.json()) as ShowsResponse;
    upcoming = showData;
    logger.info(`Schedule updated at ${start}`);
  } catch (error) {
    logger.error(error);
  }
}

setInterval(fetchUpcoming, UPCOMING_CACHE_DURATION);

fetchUpcoming();

const getUpcoming = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(upcoming);
  } catch (error) {
    next(error);
  }
};

const getShows = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const baseUrl = `${process.env.SPINITRON_API_URL}/shows`;
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

const getShowById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await fetch(
      `${process.env.SPINITRON_API_URL}/shows/${req.params.id}`,
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

export const showsHandlers = {
  getShows,
  getShowById,
  getUpcoming,
};
