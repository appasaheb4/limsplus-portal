import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.libraryStore.fetchLibrary();
  }, 2000);
};
export const resetLibrary = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
