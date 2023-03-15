import {eventEmitter} from '@/core-utils';
import {stores} from '@/stores';
const startup = async () => {
  setTimeout(() => {
    stores.segmentMappingStore.fetchListSegmentMapping();
  }, 2000);
};

export const resetSegmentMapping = () => {
  eventEmitter.emit('reload', {});
};

export default startup;
