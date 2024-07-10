import express from 'express';
import type { Request, Response } from 'express';

const healthCheckRouter = express.Router({});

healthCheckRouter.get('/', async (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    res.status(503).send();
  }
});

export { healthCheckRouter };
