import express from 'express';

const healthCheckRouter = express.Router({});

healthCheckRouter.get('/', async (_req, res, _next) => {
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
