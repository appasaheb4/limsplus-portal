import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.doctorsStore.fetchDoctors();
  }, 2000);
};

export const resetDoctor = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
