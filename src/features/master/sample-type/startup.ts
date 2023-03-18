import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.sampleTypeStore.fetchSampleTypeList();
  }, 2000);
};
export const resetSampleType = () => eventEmitter.emit('reload', {});

export default startup;
