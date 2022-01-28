import {Stores} from './stores';
const startup = async () => {
    Stores.testPanelMappingStore.fetchTestPanelMapping();
}

export default startup;