import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.masterPackageStore.fetchPackageMaster();
  }, 2000);
};
export const resetMasterPackage = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
