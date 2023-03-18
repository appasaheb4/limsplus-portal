import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.environmentStore.fetchEnvironment({
      documentType: 'environmentVariable',
    });
  }, 2000);
  setTimeout(() => {
    stores.environmentStore.fetchEnvironment({
      documentType: 'environmentSettings',
    });
  }, 2000);
};

export const resetEnvironmentVariable = () => eventEmitter.emit('reload', {});
export const resetEnvironmentSettings = () => eventEmitter.emit('reload', {});
export default startup;
