import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.userStore.loadUser();
  }, 2000);
};

export const resetUser = () => {
  eventEmitter.emit('reload', {});
};
export default startup;
