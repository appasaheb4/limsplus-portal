import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.labStore.fetchListLab();
  }, 2000);
};

export const resetLab = () => {
  eventEmitter.emit('reload', {});
};
export default startup;
