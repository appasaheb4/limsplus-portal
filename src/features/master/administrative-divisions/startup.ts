import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.administrativeDivStore.fetchAdministrativeDiv();
  }, 2000);
};
export const resetAdminstrativeDiv = () => {
  Stores.administrativeDivStore.reset();
  eventEmitter.emit('reload', {});
};
export default startup;
