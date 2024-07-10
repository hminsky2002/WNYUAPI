import type { SpinitronMetadata, Client } from '../types';
import type { Request, Response } from 'express';

let metadata: SpinitronMetadata = {};
let clients: Client[] = [];

function sendEventsToAll(newMetadata: SpinitronMetadata) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newMetadata)}\n\n`),
  );
}

const postMetadata = async (req: Request, res: Response) => {
  try {
    const newMetadata = req.body as SpinitronMetadata;
    metadata = newMetadata;
    res.json(newMetadata);
    return sendEventsToAll(newMetadata);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching data.' });
  }
};

const streamMetadata = (req: Request, res: Response) => {
  try {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(metadata)}\n\n`;
    res.write(data);
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
    res.status(500).send({ error: 'An error occurred while sending data' });
  }
};

export const metadataHandlers = {
  postMetadata,
  streamMetadata,
};
