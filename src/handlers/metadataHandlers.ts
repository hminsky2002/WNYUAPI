import { metadataStore } from '../stores';
import type { SpinitronMetadata } from '@wnyu/spinitron-sdk';
import type { NextFunction, Request, Response } from 'express';

const postMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newMetadata = req.body as SpinitronMetadata;
    metadataStore.setData(newMetadata);
    res.json(newMetadata);
  } catch (error) {
    next(error);
  }
};

const getMetadata = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(metadataStore.getData());
  } catch (error) {
    next(error);
  }
};

export const metadataHandlers = {
  postMetadata,
  getMetadata,
};
