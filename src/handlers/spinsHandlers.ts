import type { Request, Response } from 'express';

const getSpins = async (req: Request, res: Response): Promise<void> => {
  try {
    const baseUrl = `${process.env.SPINITRON_API_URL}/spins`;
    const searchParams = new URLSearchParams(req.query as any).toString();
    const url = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;

    const data = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const output = await data.json();
    res.send(output);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching data.' });
  }
};

const getSpinById = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).send({ error: 'An error occurred while fetching data.' });
  }
};


export const spinsHandlers = {
  getSpins,
  getSpinById,
};
