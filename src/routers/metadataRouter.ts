import express from 'express';
import { metadataHandlers } from '../handlers/metadataHandlers';

const metadataRouter = express.Router({});

metadataRouter.post('/push', metadataHandlers.postMetadata);
metadataRouter.post('/', metadataHandlers.streamMetadata);
export { metadataRouter };
