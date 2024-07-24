import type { SpinitronMetadata } from '../types';
import type { NextFunction, Request, Response } from 'express';

let metadata: SpinitronMetadata = {};

const postMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newMetadata = req.body as SpinitronMetadata;
    metadata = newMetadata;
    res.json(newMetadata);
  } catch (error) {
    next(error);
  }
};

const getMetadata = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(metadata);
  } catch (error) {
    next(error);
  }
};

export const metadataHandlers = {
  postMetadata,
  getMetadata,
};
