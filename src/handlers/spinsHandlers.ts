import { currentSpinsStore } from '../stores';
import type { NextFunction, Request, Response } from 'express';

const getCurrentSpins = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(currentSpinsStore.getData());
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
