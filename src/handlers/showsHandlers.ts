import { upcomingShowsStore } from '../stores';
import type { NextFunction, Request, Response } from 'express';

const getUpcoming = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(upcomingShowsStore.getData());
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
