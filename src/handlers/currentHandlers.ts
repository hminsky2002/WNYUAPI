import {
  currentPlaylistStore,
  currentSpinsStore,
  metadataStore,
} from '../stores';
import type { NextFunction, Request, Response } from 'express';

const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send({
      playlist: currentPlaylistStore.getData()[0],
      spins: currentSpinsStore.getData(),
      metadata: metadataStore.getData(),
    });
  } catch (error) {
    next(error);
  }
};

export const currentHandlers = {
  getCurrent,
};
