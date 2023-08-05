import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.libraryStore.fetchLibrary();
  }, 2000);
};
export const resetLibrary = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
