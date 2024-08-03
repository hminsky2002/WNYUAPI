import { getLogger } from '../logger';
import { Store } from './Store';
import type { Playlist, PlaylistsResponse } from '@wnyu/spinitron-sdk';

const logger = getLogger(__filename);

const currentPlaylistStore = new Store<Playlist[]>([]);

const CURRENT_PLAYLIST_CACHE_DURATION = 5 * 60 * 1000;

const fetchCurrentPlaylist = async () => {
  try {
    const searchParams = new URLSearchParams({
      count: '1',
    }).toString();
    const url = `${process.env.SPINITRON_API_URL}/playlists?${searchParams}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.SPINITRON_API_KEY}` },
    });
    const playlistData = (await response.json()) as PlaylistsResponse;
    currentPlaylistStore.setData(playlistData.items);
    logger.info(`Playlist updated at ${Date.now()}`);
  } catch (error) {
    logger.error(error);
  }
};

setInterval(fetchCurrentPlaylist, CURRENT_PLAYLIST_CACHE_DURATION);

fetchCurrentPlaylist().catch((error) =>
  logger.info('Current Playlist Store failed to initialized', error),
);

export { currentPlaylistStore };
