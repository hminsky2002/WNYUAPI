import { app } from './app';
import { getLogger } from './logger';

const logger = getLogger(__filename);

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? 'localhost';

app.listen(port, host, () => {
  logger.info(`Server running on http://${host}:${port}`);
});
