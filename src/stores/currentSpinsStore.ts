import type { Spin, SpinsResponse } from '@wnyu/spinitron-sdk';
import { getLogger } from '../logger';
import Store from './Store';
import { currentPlaylistStore } from './currentPlaylistStore';

const logger = getLogger(__filename);

const currentSpinsStore = new Store<Spin[]>([]);

const CURRENT_SPINS_CACHE_DURATION = 3 * 60 * 1000;

async function fetchCurrentSpins() {
  try {
    const url = `${process.env.SPINITRON_API_URL}/spins?${`playlist_id=${currentPlaylistStore.getData()[0]?.id}&count=50` ?? ''}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const spinsData = (await response.json()) as SpinsResponse;
    currentSpinsStore.setData(spinsData.items);
    logger.info(`Spins updated at ${Date.now()}`);
  } catch (error) {
    logger.error(error);
  }
}

setInterval(fetchCurrentSpins, CURRENT_SPINS_CACHE_DURATION);

fetchCurrentSpins();

export { currentSpinsStore };
