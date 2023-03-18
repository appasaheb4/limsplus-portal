import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.roleStore.fetchListRole();
  }, 2000);
};

export const resetRole = () => eventEmitter.emit('reload', {});

export default startup;
