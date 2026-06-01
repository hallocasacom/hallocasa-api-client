export * from './generated';
export { Configuration } from './generated/configuration';
export { createHallocasaClient, type HallocasaClientOptions } from './client';
export {
  fetchGroupChildren,
  linkGroupChild,
  type GroupChild,
  type GroupChildFilterResult,
} from './federation';

// Additional utilities and client configurations can be added here