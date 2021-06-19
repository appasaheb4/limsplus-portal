import {Stores} from './stores';
const startup = async () => {
    Stores.testSampleMappingStore.fetchSampleTypeList();
}   

export default startup;