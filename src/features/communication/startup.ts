import {Stores} from './stores';
const startup = async () => {
    Stores.segmentMappingStore.fetchListSegmentMapping();
    Stores.segmentMappingStore.fetchmappingList();
}

export default startup;