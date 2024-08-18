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
    const url = `${process.env.SPINITRON_API_URL}/shows?expand=personas`;

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
      `${process.env.SPINITRON_API_URL}/shows/${req.params.id}?expand=personas`,
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
