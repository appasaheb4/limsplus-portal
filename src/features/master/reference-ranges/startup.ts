import {Stores} from './stores';
const startup = async () => {
  Stores.referenceRangesStore.fetchListReferenceRanges();
};

export default startup;
