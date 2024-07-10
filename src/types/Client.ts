import type { Response } from 'express';

export interface Client {
  id: number;
  res: Response<any, Record<string, any>>;
}
