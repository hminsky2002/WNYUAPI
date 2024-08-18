import { ajv } from '../ajv';
import type { JSONSchemaType } from 'ajv';

export type Id = number;

export const idSchema: JSONSchemaType<Id> = {
  type: 'integer',
};

export const isId = ajv.compile(idSchema);
