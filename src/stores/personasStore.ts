import { getLogger } from '../logger';
import { Store } from './Store';
import type { Persona, PersonasResponse } from '@wnyu/spinitron-sdk';

const logger = getLogger(__filename);

const personasStore = new Store<Persona[]>([]);

const PERSONAS_CACHE_DURATION = 60 * 60 * 1000;

const fetchAllPersonas = async (
  page = 1,
  accumulatedPersonas: Persona[] = [],
): Promise<Persona[]> => {
  try {
    const searchParams = new URLSearchParams({
      page: page.toString(),
    }).toString();
    const url = `${process.env.SPINITRON_API_URL}/personas?${searchParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const personasData = (await response.json()) as PersonasResponse;

    const newAccumulatedPersonas = [
      ...accumulatedPersonas,
      ...personasData.items,
    ];

    const { currentPage } = personasData._meta;
    const { pageCount } = personasData._meta;

    if (currentPage < pageCount) {
      return await fetchAllPersonas(currentPage + 1, newAccumulatedPersonas);
    }
    return newAccumulatedPersonas;
  } catch (error) {
    logger.error(`Error fetching personas on page ${page}:`, error);
    throw error;
  }
};

const fetchAndStorePersonas = async () => {
  try {
    const allPersonas = await fetchAllPersonas();
    personasStore.setData(allPersonas);
    logger.info(`Personas store updated at ${Date.now()}`);
  } catch (error) {
    logger.error('Failed to update personas store:', error);
  }
};

setInterval(fetchAndStorePersonas, PERSONAS_CACHE_DURATION);

fetchAndStorePersonas().catch((error) =>
  logger.info('Personas Store failed to initialize', error),
);

export { personasStore };
