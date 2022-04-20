import {Stores} from './stores';
const startup = async () => {
  Stores.sampleContainerStore.fetchListSampleContainer();
};

export default startup;
