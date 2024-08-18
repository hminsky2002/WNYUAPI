import { InputValidationError, NotFoundError } from '../errors';
import { getLogger } from '../logger';
import type { NextFunction, Request, Response } from 'express';

const logger = getLogger(__filename);

const getNameForError = (error: unknown): string => {
  if (error instanceof Error && error.name !== 'Error') {
    return error.name;
  }
  return 'UnknownError';
};

const getHttpStatusCodeForError = (error: unknown): number => {
  if (error instanceof InputValidationError) {
    return 400;
  }
  if (error instanceof NotFoundError) {
    return 404;
  }
  // In the `jwks-rsa` library, when a rate limit is exceeded a string error gets thrown.
  if (
    typeof error === 'string' &&
    error.includes('exceeds maximum tokens per interval')
  ) {
    return 503;
  }
  return 500;
};

const getMessageForError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error.';
};

const getDetailsForError = (error: unknown): unknown[] => {
  if (error instanceof InputValidationError) {
    return error.errors;
  }
  return [error];
};

// Credits to @slifty and his work in the pdc-service repository!
//
// Express requires us to have four parameters or else it doesn't know this is
// intended to be an error handler; this is why we must include `next` even though
// it isn't actually used.
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
  const statusCode = getHttpStatusCodeForError(err);
  if (statusCode >= 500) {
    logger.error({ err, statusCode });
  } else {
    logger.debug({ err, statusCode });
  }
  res
    .status(statusCode)
    .contentType('application/json')
    .send({
      name: getNameForError(err),
      message: getMessageForError(err),
      details: getDetailsForError(err),
    });
};
