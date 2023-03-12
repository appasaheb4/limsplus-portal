import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.masterPanelStore.fetchPanelMaster();
  }, 2000);
};
export const resetMasterPanel = () => {
  eventEmitter.emit('reload', {});
};
export default startup;
