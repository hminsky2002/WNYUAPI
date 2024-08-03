import { Store } from './Store';
import type { SpinitronMetadata } from '@wnyu/spinitron-sdk';

const metadataStore = new Store<SpinitronMetadata>({});

export { metadataStore };
