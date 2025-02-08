import { getLogger } from '../logger';
import { Store } from './Store';
import type { Show, ShowsResponse } from '@wnyu/spinitron-sdk';

const logger = getLogger(__filename);

const upcomingShowsStore = new Store<Show[]>([]);

const UPCOMING_SHOWS_CACHE_DURATION = 5 * 60 * 1000;

async function fetchUpcoming(): Promise<void> {
  try {
    const start = new Date().toISOString();
    const end = new Date(
      new Date().setDate(new Date().getDate() + 1),
    ).toISOString();
    const searchParams = new URLSearchParams({
      start,
      end,
      expand: 'personas',
    }).toString();
    const url = `${process.env.SPINITRON_API_URL}/shows?${searchParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const showData = (await response.json()) as ShowsResponse;
    upcomingShowsStore.setData(showData.items);
    logger.info(`Upcoming shows updated at ${start}`);
  } catch (error) {
    logger.error(error);
  }
}

setInterval(fetchUpcoming, UPCOMING_SHOWS_CACHE_DURATION);

fetchUpcoming().catch((error) =>
  logger.info('Upcoming Shows Store failed to initialized', error),
);

export { upcomingShowsStore };
