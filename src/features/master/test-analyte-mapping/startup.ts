import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.testAnalyteMappingStore.fetchTestAnalyteMapping();
  }, 2000);
};

export const resetTestAnalyteMapping = () => eventEmitter.emit('reload', {});

export default startup;
