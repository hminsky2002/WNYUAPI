import { getLogger } from '../logger';
import type { SpinitronMetadata, Client } from '../types';
import type { NextFunction, Request, Response } from 'express';

const logger = getLogger(__filename);

let metadata: SpinitronMetadata = {};
let clients: Client[] = [];

function sendEventsToAll(newMetadata: SpinitronMetadata) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newMetadata)}\n\n`),
  );
}

const postMetadata = async (req: Request, res: Response,  next: NextFunction) => {
  try {
    const newMetadata = req.body as SpinitronMetadata;
    metadata = newMetadata;
    res.json(newMetadata);
    return sendEventsToAll(newMetadata);
  } catch (error) {
    next(error)
  }
};

const streamMetadata = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(req);
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(metadata)}\n\n`;
    res.write(data);
    logger.info(data);
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res,
    };

    clients.push(newClient);

    req.on('close', () => {
      clients = clients.filter((client) => client.id !== clientId);
    });
  } catch (error) {
    next(error)
  }
};

export const metadataHandlers = {
  postMetadata,
  streamMetadata,
};
