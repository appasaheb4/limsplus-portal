import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.sectionStore.fetchSections();
  }, 2000);
};
export const resetSection = () => eventEmitter.emit('reload', {});

export default startup;
