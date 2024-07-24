import express from 'express';
import { metadataHandlers } from '../handlers/metadataHandlers';

const metadataRouter = express.Router({});

metadataRouter.post('/', metadataHandlers.postMetadata);
metadataRouter.get('/', metadataHandlers.getMetadata);
export { metadataRouter };
