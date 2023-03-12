import {eventEmitter} from '@/core-utils';
import {Stores} from './stores';
const startup = async () => {
  setTimeout(() => {
    Stores.testPanelMappingStore.fetchTestPanelMapping();
  }, 2000);
};
export const resetTestPanelMapping = () => eventEmitter.emit('reload', {});
export default startup;
