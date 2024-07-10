import type { NextFunction, Request, Response } from 'express';

const getPersonas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const baseUrl = `${process.env.SPINITRON_API_URL}/personas`;
    const searchParams = new URLSearchParams(req.query as any).toString();
    const url = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;
    const data = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const output = await data.json();
    res.send(output);
  } catch (error) {
    next(error)
  }
};

const getPersonaById = async (req: Request, res: Response,  next: NextFunction): Promise<void> => {
  try {
    const data = await fetch(
      `${process.env.SPINITRON_API_URL}/personas/${req.params.id}`,
      {
        headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
      },
    );
    const output = await data.json();
    res.send(output);
  } catch (error) {
    next(error)
  }
};

export const personasHandlers = {
  getPersonas,
  getPersonaById,
};
