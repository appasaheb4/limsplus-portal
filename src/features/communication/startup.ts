import {Stores} from './stores';
const startup = async () => {
    Stores.segmentMappingStore.segmentMappingService.listSegmentMapping();
}

export default startup;