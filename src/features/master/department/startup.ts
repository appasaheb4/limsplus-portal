import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.departmentStore.fetchListDepartment();
  }, 2000);
};
export const resetDepartment = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
