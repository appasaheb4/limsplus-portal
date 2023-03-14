import {stores} from '@/stores';
import {eventEmitter} from '@/core-utils';
const startup = async () => {
  setTimeout(() => {
    stores.interfaceManagerStore.interfaceManagerService.listInterfaceManager();
  }, 2000);
};

export const resetInterfaceManager = () => eventEmitter.emit('reload', {});

export default startup;
