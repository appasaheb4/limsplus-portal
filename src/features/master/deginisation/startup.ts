import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.deginisationStore.fetchListDeginisation();
  }, 2000);
};

export const resetDesignation = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
