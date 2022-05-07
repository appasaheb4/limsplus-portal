import {stores} from '@/stores';
const startup = async () => {
  stores.lookupStore.fetchListLookup();
};

export default startup;
