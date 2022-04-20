import {Stores} from './stores';
const startup = async () => {
  Stores.sampleTypeStore.fetchSampleTypeList();
};

export default startup;
