import type { SpinitronMetadata } from '@wnyu/spinitron-sdk';
import Store from './Store';

const metadataStore = new Store<SpinitronMetadata>({});

export { metadataStore };
