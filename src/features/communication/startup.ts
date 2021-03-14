import {Stores} from './stores';
const startup = async () => {
    Stores.segmentMappingStore.fetchListSegmentMapping();
}

export default startup;