import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.testMasterStore.fetchTestMaster();
  }, 2000);
};

export const resetTestMaster = () => eventEmitter.emit('reload', {});

export default startup;
