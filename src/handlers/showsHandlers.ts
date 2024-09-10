import { upcomingShowsStore } from '../stores';
import type { NextFunction, Request, Response } from 'express';

// We prefetch all shows to get the schedule, but by default the shows
// endpoint is paginated at 20. If there are ever more than 150 active
// shows in our schedule, we can increase the variable size

const SHOW_LIMIT = '150';

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
    const url = `${process.env.SPINITRON_API_URL}/shows?expand=personas&count=${SHOW_LIMIT}`;

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
