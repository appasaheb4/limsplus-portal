import { eventEmitter } from '@/core-utils';
import { Stores } from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.testSampleMappingStore.fetchSampleTypeList();
  }, 2000);
};
export const resetTestSampleMapping = () => {
  Stores.testSampleMappingStore.reset();
  eventEmitter.emit('reload', {});
};

export default startup;
