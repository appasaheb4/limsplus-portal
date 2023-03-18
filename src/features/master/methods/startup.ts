import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.methodsStore.fetchMethods();
  }, 2000);
};
export const resetMethod = () => eventEmitter.emit('reload', {});

export default startup;
