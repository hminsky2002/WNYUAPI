import { getLogger } from '../logger';
import type { NextFunction, Request, Response } from 'express';

const logger = getLogger(__filename);

const getNameForError = (error: unknown): string => {
  if (error instanceof Error && error.name !== 'Error') {
    return error.name;
  }
  return 'UnknownError';
};

// Credits to @slifty and his work in the pdc-service repository!
//
// Express requires us to have four parameters or else it doesn't know this is
// intended to be an error handler; this is why we must include `next` even though
// it isn't actually used.
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
): void => {
  logger.trace(req.body);
  logger.error({ err });
  logger.debug({ err });
  res
    .status(500)
    .contentType('application/json')
    .send({
      name: getNameForError(err),
      err,
    });
};
