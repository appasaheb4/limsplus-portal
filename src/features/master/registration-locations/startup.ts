import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.registrationLocationsStore.fetchRegistrationLocations();
  }, 2000);
};
export const resetRegistrationLocation = () => eventEmitter.emit('reload', {});

export default startup;
