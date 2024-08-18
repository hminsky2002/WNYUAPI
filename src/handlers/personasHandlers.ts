import { personasStore } from '../stores';
import { InputValidationError, NotFoundError } from '../errors';
import { isId } from '../types';
import type { NextFunction, Request, Response } from 'express';

const getPersonas = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(personasStore.getData());
  } catch (error) {
    next(error);
  }
};

const getPersonaById = async (
  req: Request<{ personaId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const personaId = Number.parseInt(req.params.personaId, 10);

    if (!isId(personaId)) {
      next(new InputValidationError('Invalid Id', isId.errors ?? []));
      return;
    }
    const persona = personasStore.getData().find((p) => p.id === personaId);
    if (persona === undefined) {
      next(new NotFoundError('No Persona Found with given id'));
      return;
    }
    res.send(persona);
  } catch (error) {
    next(error);
  }
};

export const personasHandlers = {
  getPersonas,
  getPersonaById,
};
