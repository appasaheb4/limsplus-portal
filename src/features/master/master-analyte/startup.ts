import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.masterAnalyteStore.fetchAnalyteMaster();
  }, 2000);
};
export const resetMasterAnalyte = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
